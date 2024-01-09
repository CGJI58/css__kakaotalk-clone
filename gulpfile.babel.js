import gulp from "gulp";
import { deleteAsync } from "del";
import ws from "gulp-webserver";
import gimage from "gulp-imagemin";

const routes = {
  html: {
    src: "./src/*.html",
    dest: "build",
  },
  img: {
    src: "./src/imgs/*",
    dest: "build/imgs",
  },
  css: {
    base: "./src/css/*.css",
    components: "./src/css/components/*.css",
    screens: "./src/css/screens/*.css",
    dest: "build/css",
  },
};

const html = () => gulp.src(routes.html.src).pipe(gulp.dest(routes.html.dest));

const clean = async () => await deleteAsync(["build/"]);

const webserver = () =>
  gulp.src("build").pipe(ws({ livereload: true, open: true }));

const img = () =>
  gulp.src(routes.img.src).pipe(gimage()).pipe(gulp.dest(routes.img.dest));

const styles = () =>
  gulp
    .src(routes.css.base)
    .pipe(gulp.src(routes.css.components))
    .pipe(gulp.src(routes.css.screens))
    .pipe(gulp.dest(routes.css.dest));

const prepare = gulp.series([clean, img]);

const assets = gulp.series([html, styles]);

const postDev = gulp.series([webserver]);

export const dev = gulp.series([prepare, assets, postDev]);
