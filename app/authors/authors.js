twitterClone.controller("authorsController",["$scope","$http","_","PostsAPIUrl",function($scope,$http,_,postsApiUrl){
    var getAuthors = function(){
        $http.get(postsApiUrl + "posts")
            .success(function(data,status){
                var posts = angular.fromJson(data);
                posts = _.map(posts, function(i){
                    i.author = i.author.toLowerCase();
                    return i;
                });
                posts = _.uniq(posts,"author");
                $scope.authors = _.map(posts,"author");
            })
            .error(function(data,status){

            });
    },
    getPosts = function(author){
        if(!author){
            return;
        }
        $scope.isLoading = true;

        $http.get(postsApiUrl + "posts/" + author)
            .success(function(data,status){
                $scope.postsOfAuthor = data;
            })
            .error(function(data,status){
            })
            .finally(function(){
                $scope.isLoading = false;
            });
    };

    $scope.authors = getAuthors();
    $scope.getPosts = getPosts;
    $scope.postsOfAuthor = [];
    $scope.isLoading = false;
}]);