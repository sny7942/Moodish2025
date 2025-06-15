const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// 회원가입 API
router.post('/register', async (req, res) => {
    try {
        const { name, username, password } = req.body;

        // 아이디 중복 확인
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ message: "이미 사용 중인 아이디입니다." });

        // 비밀번호 암호화
        const hashedPassword = await bcrypt.hash(password, 10);

        // 새 사용자 저장
        const newUser = new User({ name, username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "회원가입 성공!" });
    } catch (error) {
        res.status(500).json({ message: "서버 오류 발생!" });
    }
});

// 로그인 API
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) return res.status(400).json({ message: "아이디 또는 비밀번호가 잘못되었습니다." });

        // 비밀번호 검증
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "아이디 또는 비밀번호가 잘못되었습니다." });

        // JWT 토큰 생성
        const token = jwt.sign({ id: user._id }, "SECRET_KEY", { expiresIn: "1h" });

        res.json({ message: "로그인 성공!", token });
    } catch (error) {
        res.status(500).json({ message: "서버 오류 발생!" });
    }
});

module.exports = router;
