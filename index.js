#!/usr/bin/env node
require('dotenv/config');
const cliCore = require('@giancarl021/cli-core');
const commands = require('./src/commands');
const createKill = require('./src/util/kill');

const help = require('./src/util/help.json');

const context = {};

const runner = cliCore('code-viewer', { commands, context, help });
const kill = createKill(context);

process.on('SIGINT', kill);

runner.run();