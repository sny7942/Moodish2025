import React from "react";
import { TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

function SubmitButton({ formData }) {
  const navigation = useNavigation();

  const handleSubmit = async () => {
    const { name, username, password, confirmPassword } = formData;
    console.log("FormData on submit:", formData);

    if (!name || !username || !password || !confirmPassword) {
      Alert.alert("오류", "모든 필드를 입력해주세요.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("오류", "비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await fetch("http://172.25.82.138:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, password }),
      });

      const contentType = response.headers.get("content-type");
      let result;

      if (contentType && contentType.includes("application/json")) {
        result = await response.json();
      } else {
        const text = await response.text();
        throw new Error("서버가 JSON이 아닌 응답을 보냈습니다: " + text);
      }

      if (response.ok) {
        Alert.alert("회원가입 성공", "회원가입이 완료되었습니다!");
        navigation.navigate("SigninSuccess");
      } else {
        console.error("서버 오류 응답:", result);
        Alert.alert("회원가입 실패", result.error || "알 수 없는 오류가 발생했습니다.");
      }

    } catch (error) {
      console.error("회원가입 요청 중 오류 발생:", error.message);
      Alert.alert("오류", "서버에 연결할 수 없습니다.\n" + error.message);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
      <Text style={styles.buttonText}>다음</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 11,
    alignSelf: "center",
    marginTop: 100,
    paddingLeft: 130,
    paddingRight: 130,
    paddingTop: 17,
    paddingBottom: 17,
    backgroundColor: "#FD7D7D",
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
  },
});

export default SubmitButton;
