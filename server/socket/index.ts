
import * as SocketIO from 'socket.io';

export const socketListener = (server) => {
    const socket = SocketIO();
    socket.listen(server);
    socket.on('connection', (io) => {
        io.on('message', (data) => {
            console.log(data, io.id);
        });
        io.emit('message', 'success message');
    });
    socket.on('error', console.log);
}