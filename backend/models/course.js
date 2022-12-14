const mongoose = require('mongoose');
const courseSchema = mongoose.Schema({
    courseName: String,
    price: Number,
    professor: String,
    duration: String,
});

const course = mongoose.model('Course', courseSchema);
module.exports = course;