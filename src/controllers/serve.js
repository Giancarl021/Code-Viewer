const fs = require('fs');
const locate = require('@giancarl021/locate');
const serve = require('serve-handler');

module.exports = function (path) {
    return async (request, response) => {
        const relativePath = request.path.replace(/^\/_/, '');
        const dest = locate(`${path}${relativePath}`);

        if (fs.lstatSync(dest).isDirectory()) {
            await serve(request, response, {
                public: path,
                rewrites: [
                    {
                        source: '/_/:path+',
                        destination: '/:path'
                    },
                    {
                        source: '/_',
                        destination: '/'
                    }
                ]
            });
        } else {
            return response.redirect(`/view?f=${encodeURIComponent(relativePath)}`);
        }
    };
}