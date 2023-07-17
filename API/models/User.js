const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
          nickname: String,
          email: String,
		      password: String
    }
);

module.exports = mongoose.model('User', UserSchema);

/*
{
   "nickname" : "vaguetti",
   "email": "jogosifb@gmail.com",
   "password" : "jogosifb2023"
}




*/