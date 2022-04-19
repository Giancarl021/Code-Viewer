const locate = require('@giancarl021/locate');

module.exports = function (path) {
    return async (request, response) => {
        const dest = locate(`${path}${request.path.replace(/^\/api\/file/, '')}`);

        return response.sendFile(dest, {
            dotfiles: 'allow'
        });
    };
}