var postsApiUrl = "http://twitterclone.azurewebsites.net/api/";
var twitterClone = angular.module("twitterClone",[]);
twitterClone.controller("postsController",["$scope","$http",function($scope,$http){
    var posts = [],
        getPosts = function(){
            $http.get(postsApiUrl+"posts")
                .success(function(data,status,headers,config){
                    posts = angular.fromJson(data);
                    $scope.posts1 = posts.slice(0,posts.length/2);
                    $scope.posts2 = posts.slice(posts.length/2);
                })
                .error(function(data,status,headers,config){
                    //dunno wat 2 do
                });
        },

        search = function(item){
            return $scope.searchText === ""
                || item.text.toLowerCase().indexOf($scope.searchText)!==-1
                || item.author.toLowerCase().indexOf($scope.searchText)!==-1;
        },
        countFiltered = function(){
            return _.filter(posts,search).length;
        },
        onSearchTextChange = function(){
            $scope.searchCount = countFiltered();
        };

    $scope.searchText = "";
    $scope.searchTextChange = onSearchTextChange;
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
        templateUrl : "templates/posts.html"
    };

    return options;

});