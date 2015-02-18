twitterClone.controller("newpostController",["$scope","$http",function($scope,$http){
    var sendPost = function(){
        console.log("submitted!");
    };

    $scope.sendPost = sendPost;
}]);