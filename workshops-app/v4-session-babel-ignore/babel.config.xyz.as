// babel.config.js
module.exports = {
    plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-transform-modules-commonjs'
    ],
    presets: [
        [ '@babel/preset-env', { targets: { node: 'current' } } ]
    ]
};