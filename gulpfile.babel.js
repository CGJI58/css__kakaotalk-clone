import gulp from "gulp";
import { deleteAsync } from "del";
import ws from "gulp-webserver";

const routes = {
  html: {
    src: "./src/*.html",
    dest: "build",
  },
};

const html = () => gulp.src(routes.html.src).pipe(gulp.dest(routes.html.dest));

const clean = async () => await deleteAsync(["build/"]);

const webserver = () =>
  gulp.src("build").pipe(ws({ livereload: true, open: true }));

const prepare = gulp.series([clean]);

const assets = gulp.series([html]);

const postDev = gulp.series([webserver]);

export const dev = gulp.series([prepare, assets, postDev]);
