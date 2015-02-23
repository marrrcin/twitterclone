twitterClone.controller("singlepostController",["$scope","$http","$routeParams","PostsAPIUrl",function($scope,$http,$routeParams,postsApiUrl){
    var postId = parseInt($routeParams.id);
    $scope.isError = !angular.isNumber(postId) || isNaN(postId);

    if(!$scope.isError){
        $http.get(postsApiUrl + "post/" + postId)
            .success(function(data,status){
                if(data === null){
                    $scope.noPost = true;
                }
                else {
                    $scope.author = data.author.toLowerCase();
                    $scope.text = data.text;
                }
            })
            .error(function(){
                $scope.isFail = true;
            });
    }

}]);