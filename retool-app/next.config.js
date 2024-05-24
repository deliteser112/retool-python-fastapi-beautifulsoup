module.exports = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.module.rules.push({
                test: /\.test\.js$/,
                loader: 'ignore-loader'
            });
        }
        return config;
    },
};