var postsApiUrl = "http://twitterclone.azurewebsites.net/api/";
var lodashModule = angular.module("lodash",[])
    .factory("_",function(){
        return window._;
    });
var twitterClone = angular.module("twitterClone",["lodash","ngRoute"]);
twitterClone.config(["$routeProvider",function($routeProvider){
    $routeProvider
        .when("/",{
            templateUrl : "app/posts/allposts.html",
            controller : "postsController"
        })
        .when("/newpost",{
            templateUrl : "app/posts/newpost.html",
            controller : "newpostController"
        });
}]);

twitterClone.directive("navigation", function () {
    return {
        restrict : "E",
        templateUrl : "app/shared/navigation.html"
    };
});