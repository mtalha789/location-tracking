const http = require('http');
const socketio = require('socket.io');

const httpServer = http.createServer();

const io = socketio(httpServer, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    },
});
const users = {};

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('new_user', (data) => {
        users[socket.id] = data;
    })



    // Acquiring client id
    socket.on('join_room', (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    socket.on('send_message', (data) => {
        console.log(data);
        let socketid
        for (let index in users) {
            if (users[index].username == data.username) {
                socketid = index
            }
        }

        io.to(socketid).emit('receive_message', data.message);
    })

    //location sending event
    socket.on('send_location', (data) => {
        let socketid
        for (let index in users) {
            if (users[index].username == data.username) {
                socketid = index
            }
        }
        io.to(socketid).emit('receive_location', data.location);
    })


    socket.on('disconnect', () => {
        users[socket.id] = undefined;
        console.log('user disconnected');
    });
});

httpServer.listen(3001, () => {
    console.log('listening on *:3001');
})