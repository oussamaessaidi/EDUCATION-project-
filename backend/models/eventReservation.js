//creation d un shema ou modele via mongoose
const mongoose = require("mongoose");
///creation des attribut
///je peux ajouter des validateurs
const eventReservationSchema = mongoose.Schema({
    idEvent: { type: mongoose.Schema.Types.ObjectId, },
    userId: { type: mongoose.Schema.Types.ObjectId, },
    teacherName: { type: mongoose.Schema.Types.String, },

});
////créer le modele
const EventReservation = mongoose.model('EventReservation', eventReservationSchema);
module.exports = EventReservation;