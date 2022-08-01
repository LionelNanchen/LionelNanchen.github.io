module.exports = {
    publicPath: '/lionelnanchen.github.io/',
    outputDir: "dist",
    pages: {
        hieroglyphs: {
            entry: 'src/main.js',
            template: 'public/hieroglyphs/index.html',
            filename: '/hieroglyphs/index.html',
            title: 'Hieroglyphs',
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        doubleMemories: {
            entry: 'src/main.js',
            template: 'public/index.html',
            filename: 'index.html',
            title: 'Double memories',
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        worldMap: {
            entry: 'src/main.js',
            template: 'public/index.html',
            filename: 'index.html',
            title: 'World map',
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        axe: {
            entry: 'src/main.js',
            template: 'public/index.html',
            filename: 'index.html',
            title: 'Axe',
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        souvenir: {
            entry: 'src/main.js',
            template: 'public/index.html',
            filename: 'index.html',
            title: 'Souvenir',
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
    },
}