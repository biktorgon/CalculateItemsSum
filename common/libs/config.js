'use strict';

const dotenv = require('dotenv');

const envVars = {};

const dotenvFile = process.env.DOTENV_FILE;
if (dotenvFile) {
    const dotenvVars = dotenv.config({ path: dotenvFile });
    Object.assign(envVars, dotenvVars);
}

Object.assign(envVars, process.env);

function readFromEnv(key, { defaultValue, required = true} = {}) {
    if (!(key in envVars)) {
        if (required && (defaultValue === undefined)) {
            throw new Error(`Enviroment variable ${key} must be specified`);
        }

        return defaultValue;
    }

    return envVars[key];
}

module.exports = {
    readFromEnv
};