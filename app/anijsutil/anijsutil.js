twitterClone.directive("applyAnijs",["$rootScope","$location","AniJS",function($rootScope,$location,AniJS){
    return {
        restrict : "E",
        link : function(){
            $rootScope.$watch(function(){return $location.path();},
                function(){
                    AniJS.run();
                });
        }
    };
}]);
