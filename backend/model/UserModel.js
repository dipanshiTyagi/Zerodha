const {model} = require("mongoose");

const {userSchema} = require('../schemas/UsersSchema');

const UserModel = new model("users", userSchema);

module.exports =  UserModel ;