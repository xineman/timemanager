module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        [
            'module-resolver',
            {
                root: ['./src'],
                alias: {
                    services: './src/services',
                    styles: './src/styles',
                    modules: './src/modules',
                    screens: './src/screens',
                    components: './src/components',
                    assets: './src/assets',
                },
            },
        ],
    ],
};
