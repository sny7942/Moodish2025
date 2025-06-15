const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true }, // 사용자 이름
    username: { type: String, required: true, unique: true }, // 사용자 아이디
    password: { type: String, required: true } // 비밀번호
});

module.exports = mongoose.model('User', userSchema);
