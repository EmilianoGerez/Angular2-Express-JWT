module.exports = {
    tsFiles: ['./client/src/**/*.ts', './client/typings/**/*.d.ts', '!./client/typings/main/**/*.d.ts', '!./client/typings/main.d.ts'],
    tsLintFiles: './client/src/**/*.ts',
    outputDir: './client/app',
    sassFiles: './client/assets/sass/**.scss',
    sassInput: './client/assets/sass/styles.scss',
    outputCss: './client/assets/dist',
    jsCleanFiles: ['./client/app/**/*.js', './client/app/**/*.js.map', './client/src/**/*.js', './client/src/**/*.js.map'],
    jsServerFiles: ['./server/**/*.js']
};
