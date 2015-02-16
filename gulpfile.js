var gulp = require("gulp");

//plugins
var jshint = require("gulp-jshint"),
    sass = require("gulp-sass"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename"),
    processHtml = require("gulp-processhtml"),
    plumber = require("gulp-plumber");

//options objects
var processOptions = {},
    uglifyOptions = {mangle:true};

//paths
var jsPath = "js/*.js";
var bowerPath = "bower_components/";
var fromBower = ["angular/angular.js",
                    "lodash/lodash.js"
                ];

gulp.task("lint",function(){
   return gulp.src("js/*.js")
       .pipe(jshint())
       .pipe(jshint.reporter("default"));
});

gulp.task("sass",function(){
    return gulp.src("scss/*.scss")
        .pipe(plumber())
        .pipe(sass({errLogToConsole: true}))
        .pipe(gulp.dest("./css"));
});

gulp.task("css",function(){
    var csses = ["./*.css",bowerPath + "bootstrap/dist/css/bootstrap.min.css"];
    return gulp.src(csses)
        .pipe(gulp.dest("dist/css"));
});

gulp.task("scripts",function(){
    var scripts = [];
    for(var i=0;i<fromBower.length;i++){
        scripts.push(bowerPath + fromBower[i]);
    }
    scripts.push(jsPath);

    return gulp.src(scripts)
        .pipe(concat("ng-twitter.js"))
        .pipe(gulp.dest("dist/js"))
        .pipe(rename("ng-twitter.min.js"))
        .pipe(uglify(uglifyOptions))
        .pipe(gulp.dest("dist/js"));
});

gulp.task("html",function(){
    return gulp.src("./*.html")
        .pipe(processHtml(processOptions))
        .pipe(gulp.dest("dist"));
});

//watcher
gulp.task("watch",function(){
    gulp.watch("js/*.js",["lint","scripts"]);
    gulp.watch("./*.html",["html"]);
    gulp.watch("scss/*.scss",["sass"]);
});

//default task (run when "gulp" cmd is used)
gulp.task("default",["lint","sass","watch"]);

gulp.task("release",["lint","sass","scripts","css","html"]);
