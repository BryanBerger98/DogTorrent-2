let io;

module.exports = {
    init: (httpServer, options) => {
        io = require('socket.io')(httpServer, options);
        return io;
    },
    getIo: () => {
        if (!io) {
            throw new Error('Socket IO is not initialized');
        }
        return io;
    }
};