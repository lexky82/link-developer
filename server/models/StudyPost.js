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
        type: Date,
        default : 0 
    },
    headcount: {
        type: Number
    },
    purpose: {
        type: String
    },
    description: {
        type : String
    },
    area: {
        type: String,
        minlength: 5
    },
    onOff: {
        type: Boolean,
    },
    skill: {
        type: Array,
        default: []
    },
    contact: {
        type: String,
    }
}, { timestamps : true })



const Post = mongoose.model('StudyPost', postSchema)

module.exports = { Post }