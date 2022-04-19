const locate = require('@giancarl021/locate');
const staticPage = locate('src/web/index.html');

module.exports = function () {
    return (_, response) => response.sendFile(staticPage);
}