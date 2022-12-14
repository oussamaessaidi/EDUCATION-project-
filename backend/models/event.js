const mongoose = require('mongoose');
const eventSchema = mongoose.Schema({
    eventName: String,
    duration: String,
    professor: String,
});

const event = mongoose.model('Event', eventSchema);
module.exports = event;