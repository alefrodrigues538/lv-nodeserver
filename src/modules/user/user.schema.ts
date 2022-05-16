import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    uuid: String,
    username:  String,
    email: String,
    password:   String,
});

const UserModel = mongoose.model('Users', userSchema);

export default UserModel;