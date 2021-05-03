const express = require('express')
const mongoose = require('mongoose')
const conf = require('config')
const cors = require('cors')

const app = express()

app.use(cors());
app.use(express.json({ extended: true }))

const PORT = process.env.PORT || 5000;

// registration, login
app.use('/api/auth', require('./routes/auth.routes'));
// dialogs
app.use('/api/dialog', require('./routes/dialog.routes'));
// user
app.use('/api/user', require('./routes/user.routes'));
// message
app.use('/api/message', require('./routes/message.routes'));

//**************************
//  REACT APP
//**************************

const path = require('path');
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

//**************************

async function startApp() {
    try {
        // mongoDB connection
        await mongoose.connect(conf.get('mongoUrl'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        const server = app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))

        //*******************
        //      SOCKETS
        //*******************

        const socketIO = require('socket.io');
        const io = socketIO(server, {
            cors: {
                origin: '*',
            }
        });

        io.on('connection', (socket) => {
            require('./sockets/onlineStatus.socket')(socket, io)
            require('./sockets/messages.socket')(socket, io)
            require('./sockets/dialogs.socket')(socket, io)
        });

        //*******************
        //   END SOCKETS
        //*******************

    } catch (e) {
        console.log(e)
    }
}

startApp()