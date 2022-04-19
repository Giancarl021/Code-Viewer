module.exports = async function () {
    if (this.context.tunnel) {
        await this.context.tunnel.close();
        delete this.context.tunnel;
    }

    return `Gracefully stopped`;
}