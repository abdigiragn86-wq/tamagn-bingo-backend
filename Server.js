const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" }
});

// ለሙከራ የመነሻ መስመር
app.get('/', (req, res) => {
    res.send('የታማኝ ቢንጎ የጀርባ ሲስተም በተሳካ ሁኔታ እየሰራ ነው!');
});

// የቢንጎ ጨዋታ ሩም ሎጂክ (ምሳሌ)
io.on('connection', (socket) => {
    console.log('ተጫዋች ተገናኝቷል:', socket.id);
    
    socket.on('joinRoom', (data) => {
        socket.join(data.room);
        console.log(`ተጫዋች ${socket.id} ሩም ${data.room} ገብቷል`);
        socket.emit('roomStatus', { message: "ወደ ጨዋታው እንኳን ደህና መጡ!" });
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`සර්ቨሩ በፖርት ${PORT} ላይ ተነስቷል`);
});
