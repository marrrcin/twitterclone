var postsApiUrl = "http://twitterclone.azurewebsites.net/api/";
var lodashModule = angular.module("lodash",[])
    .factory("_",function(){
        return window._;
    });

var anijsModule = angular.module("anijs",[])
    .factory("AniJS",function(){
        return window.AniJS;
    });

var postsProvider = angular.module("postsProvider",[])
    .factory("prostsProvider",["$http",function($http){
        return {
            getAll : function(){

            }
        }
    }]);

var twitterClone = angular.module("twitterClone",["lodash","ngRoute","anijs"]);
twitterClone.constant("PostsAPIUrl",postsApiUrl);

twitterClone.directive("back",["$window",function($window){
    return {
        restrict : "A",
        link : function(scope,element,attributes){
            element.bind("click",function(){
                $window.history.back();
            })
        }
    };
}]);

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
        .when("/authors",{
            templateUrl : "app/authors/authors.html",
            controller : "authorsController"
        })
        .when("/post/:id",{
            templateUrl : "app/singlepost/singlepost.html",
            controller : "singlepostController"
        });
}]);

