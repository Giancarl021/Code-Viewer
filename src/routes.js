const express = require('express');

const serveController = require('./controllers/serve');
const fileController = require('./controllers/file');
const redirectController = require('./controllers/redirect');
const viewController = require('./controllers/view');

module.exports = function (path) {
    const routes = express.Router();

    routes.get('/', redirectController());
    routes.get('/_*', serveController(path));
    routes.get('/view', viewController());
    routes.get('/api/file*', fileController(path));

    return routes;
}