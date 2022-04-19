const localtunnel = require('localtunnel');
const locate = require('@giancarl021/locate');
const app = require('../app');

const defaultPort = process.env.PORT || 3000;

module.exports = async function([directory = process.cwd()]) {
    const port = this.helpers.valueOrDefault(this.helpers.getFlag('port', 'p'), defaultPort);
    const useTunnel = this.helpers.hasFlag('tunnel', 't');
    const path = locate(directory);

    await new Promise(resolve => app(path).listen(port, resolve));

    if (useTunnel) {
        this.context.tunnel = await localtunnel(port);
    }

    return `Serving files from ${path} ${useTunnel ? `locally on port ${port} and globally with ${this.context.tunnel.url}` : `on port ${port}`}`;
}