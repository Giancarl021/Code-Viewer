const express = require('express');

const serveController = require('./controllers/serve');
const fileController = require('./controllers/file');
const viewController = require('./controllers/view');

module.exports = function (path) {
    const routes = express.Router();

    routes.get('/_/view', viewController());
    routes.get('/_/api/file*', fileController(path));
    routes.get('*', serveController(path));

    return routes;
}