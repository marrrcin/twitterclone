var postsApiUrl = "http://twitterclone.azurewebsites.net/api/";
var lodashModule = angular.module("lodash",[])
    .factory("_",function(){
        return window._;
    });

var anijsModule = angular.module("anijs",[])
    .factory("AniJS",function(){
        return window.AniJS;
    });

var twitterClone = angular.module("twitterClone",["lodash","ngRoute","anijs"]);
twitterClone.config(["$routeProvider",function($routeProvider){
    $routeProvider
        .when("/",{
            templateUrl : "app/posts/allposts.html",
            controller : "postsController"
        })
        .when("/newpost",{
            templateUrl : "app/newpost/newpost.html",
            controller : "newpostController"
        })
        .when("/search",{
            templateUrl : "app/search/search.html",
            controller : "searchController"
        });
}]);

