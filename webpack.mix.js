const mix = require("laravel-mix");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react("resources/js/admin/app.js", "public/js/admin")
    .sass("resources/sass/admin/app.scss", "public/css/admin")
    .react("resources/js/website/app.js", "public/js/website")
    .sass("resources/sass/website/app.scss", "public/css/website")
    .browserSync("the-cricket-digest.com");

if (mix.inProduction()) {
    mix.version();
}
