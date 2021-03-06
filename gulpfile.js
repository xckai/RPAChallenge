'use strict';
const gulp = require('gulp');
const clean = require('gulp-clean');
const path = require('path');
gulp.task('clean', () => {
  return gulp.src(path.resolve(__dirname, './release/**/*.*'), { read: false }).pipe(clean({ force: true }));
});
gulp.task('copy:main', () => {
  return gulp.src(path.resolve(__dirname, './src/main/build/**/*.*')).pipe(gulp.dest('./release/apps/main'));
});
gulp.task('copy:server', () => {
  return gulp.src(path.resolve(__dirname, './src/server/**/*.*')).pipe(gulp.dest('./release/server'));
});
gulp.task('copy:apps', () => {
  return gulp.src(path.resolve(__dirname, './apps/**/*.*')).pipe(gulp.dest('./release/apps'));
});
gulp.task('copy:script', () => {
  return gulp.src(path.resolve(__dirname, './src/*.cmd')).pipe(gulp.dest('./release'));
});
gulp.task('build', gulp.series('clean', 'copy:server', 'copy:apps', 'copy:main', 'copy:script'));
Date.prototype.Format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
  return fmt;
};
