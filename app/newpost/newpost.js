twitterClone.controller("newpostController",["$scope","$http","PostsAPIUrl",function($scope,$http,postsApiUrl){
    var sendPost = function(){
        $scope.firstTry = false;
        $scope.errorMessage = "";
        if(!$scope.author || !$scope.newMessage){
            return;
        }
        var toSend = { author : $scope.author,
                        text : $scope.newMessage
        };

        $scope.isSending = true;
        $http.post(postsApiUrl + "posts",toSend)
            .success(function(data,status,headers,config){
                $scope.author = "";
                $scope.newMessage = "";
                $scope.firstTry = true;
            })
            .error(function(data,status,headers,config){
                $scope.firstTry = false;
                $scope.errorMessage = "Server returned " + status;
            });
        $scope.isSending = false;
    };

    $scope.sendPost = sendPost;
    $scope.firstTry = true;
}]);