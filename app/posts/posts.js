twitterClone.controller("postsController",["$scope","$http","_","PostsAPIUrl",function($scope,$http,_,postsApiUrl){
    var posts = [],
        getPosts = function(){
            $scope.loaded = false;
            $http.get(postsApiUrl+"posts")
                .success(function(data,status,headers,config){
                    posts = angular.fromJson(data);
                    $scope.posts1 = posts.slice(0,posts.length/2);
                    $scope.posts2 = posts.slice(posts.length/2);
                    $scope.loaded = true;
                })
                .error(function(data,status,headers,config){
                    //dunno wat 2 do
                });
        },

        search = function(item){
            return $scope.searchText === "" || item.text.toLowerCase().indexOf($scope.searchText)!==-1 || item.author.toLowerCase().indexOf($scope.searchText)!==-1;
        },
        countFiltered = function(){
            return _.filter(posts,search).length;
        },
        onSearchTextChange = function(){
            $scope.searchCount = countFiltered();
        };

    $scope.searchText = "";
    $scope.searchTextChange = onSearchTextChange;
    $scope.loaded = false;
    $scope.searchCount = countFiltered();
    $scope.search = search;


    getPosts();
}]);

twitterClone.directive("posts",function(){
    var options = {
        restrict : "E",
        scope : {
            posts : "=",
            filter: "="
        },
        templateUrl : "app/posts/posts.html"
    };

    return options;

});