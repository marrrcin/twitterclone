var postsApiUrl = "http://twitterclone.azurewebsites.net/api/";
var lodashModule = angular.module("lodash",[])
    .factory("_",function(){
        return window._;
    });
var twitterClone = angular.module("twitterClone",["lodash"]);
