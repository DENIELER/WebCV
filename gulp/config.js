'use strict';

var gulp = require('gulp');
var yaml = require('js-yaml');
var fs   = require('fs');
var replace = require('gulp-replace-task');
 
module.exports = function(options) { 
	 gulp.task('config', function () {

	 	var filePath = 'config/cv_text.yml';

	 	try {
			var cv_text = yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));
			console.log(cv_text);
	 	} catch (e) {
			console.log(e);
		}

		var patterns = [
			{match: 'meet_text', replacement: cv_text.default.meet},
			{match: 'skills_text', replacement: cv_text.default.skills},
		];

		// Replace each placeholder with the correct value for the variable.
		gulp.src(options.tmp + '/serve/app/index.js')
		.pipe(replace({
			patterns: patterns,
			prefix: '___'
		}))
		.pipe(gulp.dest(options.tmp + '/serve/app'));
	});
};