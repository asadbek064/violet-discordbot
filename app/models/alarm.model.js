const mongoose = require('mongoose');

const AlarmSchema = mongoose.Schema({
    TaggedUsername: String,
    AlarmDue: Date,
    Body: String, 
    Completed: Boolean
});

/* !alarm @person hh:mm am/pm mm/dd*/ 

module.exports = mongoose.model('Alarm', AlarmSchema);