'use strict';

const { readFromEnv } = require('../common/libs/config');

module.exports.MICRO_SERVER_PORT = readFromEnv('MICRO_SERVER_PORT', { defaultValue: 4000 });