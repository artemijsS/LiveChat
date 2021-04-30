const express = require('express')
const mongoose = require('mongoose')
const conf = require('config')
const cors = require('cors')

const app = express()

//*******************
//      SOCKETS
//*******************

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});

const socketsPort = 8000;

io.on('connection', (socket) => {
    require('./sockets/main.socket')(socket, io)
});

server.listen(socketsPort, () => {
    console.log('Sockets are on port ', socketsPort)
})

//*******************
//   END SOCKETS
//*******************

app.use(cors());
app.use(express.json({ extended: true }))

const PORT = conf.get('port') || 5000

// registration, login
app.use('/api/auth', require('./routes/auth.routes'));
// dialogs
app.use('/api/dialog', require('./routes/dialog.routes'));
// user
app.use('/api/user', require('./routes/user.routes'));
// message
app.use('/api/message', require('./routes/message.routes'));

async function startApp() {
    try {
        // mongoDB connection
        await mongoose.connect(conf.get('mongoUrl'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch (e) {
        console.log(e)
    }
}

startApp()