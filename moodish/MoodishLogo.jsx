import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MoodishLogo = ({ navigation }) => {
  const fullText = "Moodishss";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText((prev) => prev + fullText[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 300);

    const timeout = setTimeout(() => {
      navigation.navigate("Login"); // 2초 후 로그인 화면으로 전환
    }, 300 * fullText.length + 2000); // 애니메이션 시간 + 추가 지연 시간

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{displayedText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default MoodishLogo;
