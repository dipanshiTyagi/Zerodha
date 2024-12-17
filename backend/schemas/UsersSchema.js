const {Schema} = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Your email address is required"],
        unique: true,
    },
    username: {
        type: String,
        required: [true, "Your username is required"],
    },
    password: {
        type: String,
        required: [true, "Your password is required"],
    },
    
}, {timestamps: true });

// userSchema.pre("save", async function () {
//     this.password = await bcrypt.hash(this.password, 10);
// });

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = {userSchema};