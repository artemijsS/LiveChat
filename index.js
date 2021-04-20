const express = require('express')
const mongoose = require('mongoose')
const conf = require('config')

const app = express()

app.use(express.json({ extended: true }))

const PORT = conf.get('port') || 5000

// registration, login
app.use('/api/auth', require('./routes/auth.routes'));


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

    }
}

start()