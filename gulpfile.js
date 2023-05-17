var istanbul = require('gulp-istanbul');
var mocha = require("gulp-mocha");
var gulp = require("gulp");


gulp.task("test", function() {
  return gulp.src([
      "./test/01Login.js",
      "./test/02Events.js",
      "./test/03Communtiylogin.js",
      "./test/04People.js",
      "./test/05Speaker.js"
    ])
    .pipe(mocha({recursive: true
    }))
    .pipe(istanbul.writeReports({
        dir: './reports',
        reporters: ['html', 'text']
      }))

});