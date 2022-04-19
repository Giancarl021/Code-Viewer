const express = require('express');
const cors = require('cors');
const locate = require('@giancarl021/locate');

const routes = require('./routes');

module.exports = function (path) {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use('/assets', express.static(locate('src/web/assets')));
    app.use(routes(path));

    return app;
}