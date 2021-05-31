var mongoose = require('mongoose');
const { DateTime } = require('luxon');

var AuthorSchema = new mongoose.Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

// Virtual for author's full name
AuthorSchema.virtual('name').get(function () {
  return this.family_name + ', ' + this.first_name;
});

// Virtual for author's lifespan
AuthorSchema.virtual('lifespan').get(function () {
  return (
    this.date_of_death.getYear() - this.date_of_birth.getYear()
  ).toString();
});

// Virtual for dates living
AuthorSchema.virtual('dates_living').get(function () {
  const dob = DateTime.fromJSDate(this.date_of_birth).toLocaleString(
    DateTime.DATE_MED
  );
  const dod = DateTime.fromJSDate(this.date_of_death).toLocaleString(
    DateTime.DATE_MED
  );
  if (this.date_of_birth && this.date_of_death) {
    return `${dob} - ${dod}`;
  } else if (this.date_of_birth) {
    return `${dob} - Present`;
  } else if (this.date_of_death) {
    return `??? - ${dod}`;
  } else {
    return '???';
  }
});

// Virtual for date of birth for form
AuthorSchema.virtual('dob_form').get(function () {
  return DateTime.fromJSDate(this.date_of_birth).toFormat('yyyy-LL-dd');
});

// Virtual for date of death for form
AuthorSchema.virtual('dod_form').get(function () {
  return DateTime.fromJSDate(this.date_of_death).toFormat('yyyy-LL-dd');
});

// Virtual for author's URL
AuthorSchema.virtual('url').get(function () {
  return '/catalog/author/' + this._id;
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);
