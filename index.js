require('dotenv/config');
const cliCore = require('@giancarl021/cli-core');
const commands = require('./src/commands');

const context = {};

const runner = cliCore('code-viewer', { commands, context });
const kill = runner.command.get('exit').bind({ context });

process.on('SIGINT', async () => {
    console.log(await kill());
    process.exit(0);
});

runner.run();