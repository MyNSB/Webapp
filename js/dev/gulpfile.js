const gulp = require("gulp");
const gutil = require("gulp-util");
const webpack = require("webpack-stream");
    
gulp.task("update", () => {
    return gulp.src("./src/*.js")
        .pipe(webpack(require(gutil.env.prod ? "./webpack.prod.js" : "./webpack.config.js")))
        .pipe(gulp.dest("./"));
});

gulp.task("watch", () => {
    gulp.watch("./src/*.js", ["update"]);
});
