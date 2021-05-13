const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    writer :{
        type: mongoose.SchemaTypes.ObjectId,
        ref:'User'
    },
    title: {
        type: String,
        maxlength: 50
    },
    date:{
        type: String,
        default : 0 
    },
    position: {
        type : String
    },
    purpose: {
        type: String
    },
    description: {
        type : String
    },
    area: {
        type: Number,
        default: 1
    },
    onOff: {
        type: Boolean,
    },
    skill: {
        type: Array,
        default: []
    },
    phoneNumber: {
        type: String,
    },
    email : {
        type : String
    }

}, { timestamps : true })



const StudyPost = mongoose.model('StudyPost', postSchema)

module.exports = { StudyPost }