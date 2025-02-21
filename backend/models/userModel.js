
import mongoose from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    cartData: {
        type: Array,
        default: [],
    }

}, { minimize: false })

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;