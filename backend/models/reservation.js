//creation d un shema ou modele via mongoose
const mongoose = require("mongoose");
///creation des attribut
///je peux ajouter des validateurs
const reservationSchema = mongoose.Schema({
    idCourse: { type: mongoose.Schema.Types.ObjectId, },
    userId: { type: mongoose.Schema.Types.ObjectId, },
    teacherName: { type: mongoose.Schema.Types.String, },

});
////créer le modele
const reservation = mongoose.model('Reservation', reservationSchema);
module.exports = reservation;