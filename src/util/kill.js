module.exports = function (context) {
    return async () => {
        console.log('Gracefully stopping...');
        if (context.tunnel) {
            await context.tunnel.close();
            delete context.tunnel;
        }

        console.log('Gracefully stopped');
        process.exit(0);
    };
}