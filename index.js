const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');

const server = new WebSocket.Server({
        port: 8080
    },
    () => {
        console.log('Server started on port 8080');
    }
);

const users = new Set();
const rooms = {}

server.on('connection', (ws) => {
    // const uuid = uuidv4()

    // const leave = room => {
    //     if (! rooms[room][uuid]) return

    //     if (Object.keys(rooms[room]).length == 1) delete rooms[room]
    //     else delete rooms[room][uuid]
    // }

    // ws.on('message', data => {
    //     const { message, meta, room } = data
    //     if(meta === "join") {
    //         if(! rooms[room]) rooms[room] = {}; // create the room
    //         if(! rooms[room][uuid]) rooms[room][uuid] = ws; // join the room
    //     }
    //     else if(meta === "leave") {
    //         leave(room);
    //     }
    //     else if(! meta) {
    //         // send the message to all in the room
    //         Object.entries(rooms[room]).forEach(([, sock]) => sock.send({ message }));
    //     }
    // })
    
    // ws.on('close', () => {
    //     Object.keys(rooms).forEach(room => leave(room));
    // })
    const userRef = {
        ws,
    };
    users.add(userRef);

    ws.on('message', (message) => {
        console.log(message);
        try {

            // Parsing the message
            const data = JSON.parse(message);

            // Checking if the message is a valid one

            if (
                typeof data.sender !== 'string' ||
                typeof data.body !== 'string'
            ) {
                console.error('Invalid message');
                return;
            }

            // Sending the message

            const messageToSend = {
                sender: data.sender,
                body: data.body,
                sentAt: Date.now()
            }

            sendMessage(messageToSend);

        } catch (e) {
            console.error('Error passing message!', e)
        }
    });

    ws.on('close', (code, reason) => {
        users.delete(userRef);
        console.log(`Connection closed: ${code} ${reason}!`);
    });
});

const sendMessage = (message) => {
    users.forEach((user) => {
        user.ws.send(JSON.stringify(message));
    });
}