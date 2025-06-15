import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const LoginForm = ({ navigation }) => { 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch("http://172.30.1.8:5050/login", {  
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password }),
      });

      let resultText = await response.text();
      let result;

      try {
        result = JSON.parse(resultText); // ✅ JSON으로 변환 시도
      } catch (jsonError) {
        console.error("JSON 파싱 오류:", resultText); 
        console.log("서버 원본 응답:", resultText);
        throw new Error("서버 응답이 JSON 형식이 아닙니다.");
      }

  
      if (response.ok) {
        console.log("로그인 성공:", result); 
        await AsyncStorage.setItem('username', result.name);
        Alert.alert("로그인 성공", JSON.stringify(result.message));
        navigation.navigate("Profile");
        if (!result.name) {
          throw new Error("서버 응답에 'name' 값이 없습니다.");
        }
      } else {
        console.error("서버 오류 응답:", JSON.stringify(result));
        Alert.alert("로그인 실패", result.error || "알 수 없는 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("로그인 요청 오류:", error.message);
      Alert.alert("오류", "서버에 연결할 수 없습니다.\n" + error.message);
    }
  };
  

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="아이디"
        value={username}
        onChangeText={setUsername}
        accessibilityLabel="Username input field"
        accessibilityHint="Enter your username"
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        accessibilityLabel="Password input field"
        accessibilityHint="Enter your password"
      />
      <TouchableOpacity 
        style={styles.loginButton}
        accessibilityRole="button"
        accessibilityLabel="Login button"
        onPress={handleLogin}  // 로그인 처리 함수 호출
      >
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.signupButton}
        accessibilityRole="button"
        accessibilityLabel="Sign up button"
        onPress={() => navigation.navigate('Signup')} 
      >
        <Text style={styles.buttonText}>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    paddingHorizontal: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(224, 224, 224, 1)',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    color: 'rgba(130, 130, 130, 1)',
  },
  loginButton: {
    backgroundColor: '#6C95F0',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  signupButton: {
    backgroundColor: '#FD7D7D',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '500',
  },
});

export default LoginForm;
