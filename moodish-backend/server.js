require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" })); // 모든 도메인 허용

// MongoDB 연결
mongoose
  .connect(process.env.MONGO_URI, { useUnifiedTopology: true })
  .then(() => console.log("MongoDB 연결 성공"))
  .catch((err) => console.error("MongoDB 연결 실패:", err));

// Mongoose 스키마 및 모델 정의
const userSchema = new mongoose.Schema({
  name: String,
  username: { type: String, unique: true },
  password: String,
  RatingHappy: String,
  RatingBored: String,
  RatingTired: String,
  RatingStress: String,
  RatingSad: String,
});
const User = mongoose.model("User", userSchema);

// 회원가입 API
app.post("/register", async (req, res) => {
  const { name, username, password } = req.body;

  if (!name || !username || !password) {
    return res.status(400).json({ error: "모든 필드를 입력해주세요." });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: "이미 사용 중인 아이디입니다." });
    }

    const newUser = new User({ name, username, password });
    await newUser.save(); // MongoDB에 사용자 정보 저장
    res.status(201).json({ message: "회원가입이 성공적으로 완료되었습니다!!" });
  } catch (err) {
    console.error("사용자 저장 중 오류 발생:", err);
    res.status(500).json({ error: "서버 오류가 발생했습니다." });
  }
});

// 로그인 API
app.post("/login", async (req, res) => {
  console.log("Received login request:", req.body); 
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "아이디와 비밀번호를 입력해주세요." });
  }

  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: "아이디나 비밀번호가 일치하지 않습니다." });
    }
    console.log("로그인 성공! 반환할 사용자 데이터:", { name: user.name, username: user.username });
    res.status(200).json({ 
      message: "로그인에 성공하였습니다!", 
      name: user.name,
      username: user.username
    }); 
  } catch (err) {
    console.error("로그인 중 오류 발생:", err);
    res.status(500).json({ error: "서버 오류가 발생했습니다." });
  }
});


// 서버 실행
const PORT = process.env.PORT || 5050;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`서버 실행 중: http://0.0.0.0:${PORT}`);
});
