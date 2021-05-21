const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    participant1_id: {type: Types.ObjectId, ref: 'User'},
    participant2_id: {type: Types.ObjectId, ref: 'User'},
    ex_id: {type: Types.ObjectId, ref: 'User'},
    last_message: {type: String},
    last_message_time: {type: String},
    last_message_created_at: {type: Date},
    last_message_owner: {type: Types.ObjectId, ref: 'User'},
    last_message_status: {type: Boolean},
    messages: [{type: Types.ObjectId, ref: 'Message'}]
})

module.exports = model('Dialog', schema)