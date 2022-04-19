const fs = require('fs');
const locate = require('@giancarl021/locate');
const serve = require('serve-handler');

module.exports = function (path) {
    return async (request, response) => {
        const relativePath = decodeURIComponent(request.path);
        const dest = locate(`${path}${relativePath}`);

        if (!fs.existsSync(dest) || fs.lstatSync(dest).isDirectory()) {
            await serve(request, response, {
                public: path,
                cleanUrls: false
            });
        } else {
            return response.redirect(`/_/view?f=${encodeURIComponent(relativePath)}`);
        }
    };
}