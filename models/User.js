const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    telephone: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    description: {type: String},
    status: {type: Boolean},
    last_time_seen: {type: String},
    photo: {type: String},
    dialogs: [{type: Types.ObjectId, ref: 'Dialog'}],
    friends: [{type: Types.ObjectId, ref: 'User'}],
    role: {type: String}
})

module.exports = model('User', schema)