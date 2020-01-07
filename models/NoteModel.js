const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    id: {
        type: String,
        required: [true, 'Id is required']
    },
    creator: {
        type: String,
        required: [true, 'Note creator is required']
    },
    created: {
        type: Date,
        required: [true, 'Created date is required']
    },
    private: {
        type: Boolean,
        default: true
    },
    name: {
        type: String,
        required: [true, 'Note name is required']
    },
    content: {
        type: String,
        required: [true, 'Note content is required']
    },
    tags: {
        type: [String]
    }

});

const Note = mongoose.model("Note", NoteSchema);
module.exports = Note;