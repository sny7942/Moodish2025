import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import LoginForm from './components/LoginForm';
import Divider from './components/Divider';

SplashScreen.preventAutoHideAsync(); // 앱 시작 시 스플래시 자동 숨김 방지

const fetchFonts = () => {
  return Font.loadAsync({
    'JustMeAgainDownHere': require('./assets/fonts/JustMeAgainDownHere.ttf'),
  });
};

const LoginScreen = ({ navigation }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await fetchFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setFontsLoaded(true);
        await SplashScreen.hideAsync(); // 폰트 로드 완료 후 스플래시 숨기기
      }
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return null; // 폰트가 준비되기 전까지 빈 화면 유지
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={{
              uri: 'https://cdn.builder.io/api/v1/image/assets/87643f6b95e24685aa12fdac7d93c13d/7f300f2ff888018d4b9c3924086a86c0cddaa9cbba8df7dd9dc8aa38ea2282ad?apiKey=87643f6b95e24685aa12fdac7d93c13d&',
            }}
            style={styles.logoImage}
            accessibilityLabel="Logo image 1"
          />
          <Image
            source={{
              uri: 'https://cdn.builder.io/api/v1/image/assets/87643f6b95e24685aa12fdac7d93c13d/d0c8fba8c328977898662d5464f47b25a67cd84f15b63893c185a91e861695b6?apiKey=87643f6b95e24685aa12fdac7d93c13d&',
            }}
            style={styles.brandImage}
            accessibilityLabel="Logo image 2"
          />
        </View>

        <Text style={styles.title}>Moodish</Text>

        <LoginForm navigation={navigation} />
        <Divider />

        <Text style={styles.termsText}>
          로그인을 클릭하면 당사 서비스 약관 및 개인정보 보호정책에 동의하는 것입니다.
        </Text>

        <View style={styles.bottomIndicator} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  container: {
    flex: 100,
    alignItems: 'center',
    paddingVertical: 10,
    width: '100%',
  },
  logoContainer: {
    width: '100%',
    maxWidth: 10000000,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  logoImage: {
    width: '20%',
    aspectRatio: 2.57,
    borderRadius: 32,
  },
  brandImage: {
    width: '20%',
    aspectRatio: 5.49,
  },
  title: {
    fontSize: 60,
    fontFamily: 'JustMeAgainDownHere',
    marginTop: 30,
    marginBottom: 20,
    letterSpacing: -0.64,
    color: '#000',
  },
  termsText: {
    fontSize: 12,
    color: 'rgba(130, 130, 130, 1)',
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 24,
  },
  signupButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 40,
    backgroundColor: '#0066cc',
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default LoginScreen;
