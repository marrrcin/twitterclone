twitterClone.controller("navigationController",["$scope","$location",function($scope,$location){
    $scope.isActive = function(currentLocation){
        return currentLocation === $location.path();
    };
}]);

twitterClone.directive("navigation", function(){
    return {
        restrict : "E",
        templateUrl : "app/navigation/navigation.html",
        controller : "navigationController"
    };
});