const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    text: {type: String, required: true},
    owner: {type: Types.ObjectId, ref: 'User', required: true},
    recipient: {type: Types.ObjectId, ref: 'User', required: true},
    time: {type: String, required: true},
    status: {type: Boolean, required: true},
    dialogId: {type: Types.ObjectId, ref: 'Dialog', required: true}
}, { timestamps: { createdAt: 'created_at' } })

module.exports = model('Message', schema)