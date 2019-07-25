var gulp        = require('gulp'),
    watch       = require('gulp-watch'),
    prefixer    = require('gulp-autoprefixer'),
    uglify      = require('gulp-uglify'),
    sass        = require('gulp-sass'),
    sourcemaps  = require('gulp-sourcemaps'),
    rigger      = require('gulp-rigger'),
    cssmin      = require('gulp-clean-css'),
    imagemin    = require('gulp-imagemin'),
    pngquant    = require('imagemin-pngquant'),
    rimraf      = require('rimraf'),
    replace     = require('gulp-replace'),
    browserSync = require("browser-sync"),
    header      = require('gulp-header'),
    reload      = browserSync.reload;

var path = {
    //папка куда складываются готовые файлы
    build: { 
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/images/',
        fonts: 'build/fonts/'
    },
    //папка откуда брать файлы
    src: { 
        html: 'src/[^_]*.html', 
        js: 'src/js/**/*.js', 
        style: 'src/scss/**/*.scss', 
        img: 'src/images/**/*.{jpg,jpeg,png}', 
        fonts: 'src/fonts/**/*.*'
    },
    //указываем после измененя каких файлов нужно действовать
    watch: { 
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/scss/**/*.{scss,css}',
        img: 'src/images/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};

// настройками сервера

var config = {
    server: {
        baseDir: "./build" //из какой папки показывать
    },
    tunnel: true,
    host: 'localhost', 
    port: 3000,
    logPrefix: "2u4u"
};

// сборка html

gulp.task('html:build', function () {
    gulp.src(path.src.html) 
        .pipe(rigger()) //проходим через rigger
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true})); //перезагружаем сервер
});

// сборка js

gulp.task('js:build', function () {
    gulp.src(path.src.js) 
        .pipe(rigger()) 
        .pipe(sourcemaps.init()) //инициализация source-map
        .pipe(uglify()) //минификация JS файла
        //.pipe(sourcemaps.write()) //запись source-map
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

// сборка styles

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass()) //компиляция sass файла 
        .pipe(prefixer({ 
            browsers: ['last 4 versions'] //добавление префиксов для 4-ех последних версия браузеров
        })) 
        .pipe(cssmin()) //минификация css файла
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

// сборка images

gulp.task('image:build', function () {
    gulp.src(path.src.img)
        .pipe(imagemin({ //сжатие картинок
            progressive: true,
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});

// сборка fonts

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts)) //шрифты просто копируем
});

// основной таск сборки

gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build',
    // 'copycss'
]);

// основной таск слежения за файлами

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});

// таск запуска сервера

gulp.task('webserver', function () {
    browserSync(config);
});

// nаск для очистки папки проекта

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

// дефолтный запуск Gulp

gulp.task('default', ['build', 'webserver', 'watch']);