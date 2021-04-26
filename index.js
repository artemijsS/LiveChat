const express = require('express')
const mongoose = require('mongoose')
const conf = require('config')
const cors = require('cors')

const app = express()

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

async function start() {
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

start()