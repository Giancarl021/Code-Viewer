const locate = require('@giancarl021/locate');

module.exports = function (path) {
    return async (request, response) => {
        const dest = locate(`${path}${decodeURIComponent(request.path.replace(/^\/_\/api\/file/, ''))}`);

        return response.sendFile(dest, {
            dotfiles: 'allow'
        });
    };
}