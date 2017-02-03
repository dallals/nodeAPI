var mongoose = require('mongoose');

var User = mongoose.model('User', {
	name: {
		type: String,
		required: true,
		minLength: 2,
		trim: true
	},
	email: {
		type: String,
		required: true,
		minlength: 2,
		trim: true
	}
});

module.exports = {User};