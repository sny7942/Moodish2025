import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Linking } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync(); // 앱 시작 시 스플래시 자동 숨김 막기

function SigninSuccess({ navigation }) {
  const [fontsLoaded] = useFonts({
    JustMeAgainDownHere: require('./assets/fonts/JustMeAgainDownHere.ttf'),
  });

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    if (fontsLoaded) {
      setAppIsReady(true);
      SplashScreen.hideAsync(); // 폰트 로드 완료 시 스플래시 화면 숨기기
    }
  }, [fontsLoaded]);

  if (!appIsReady) {
    return null; // 로딩 안 끝나면 화면 렌더링 안 함
  }

  const handleStart = () => {
    navigation.navigate('UserSetup');
  };

  const handleWatchVideo = () => {
    Linking.openURL('https://m.youtube.com/shorts/NNEFsveLuiQ');
  };

  return (
    <View style={styles.container}>
      <View style={styles.overlayContainer}>
        <Image source={require('./assets/party.png')} style={styles.partyImage} />
        <Text style={styles.overlayText}>
          <Text style={styles.title}>Moodish</Text>
          <Text style={styles.subtitle}> 에 오신 것을 환영합니다</Text>
        </Text>
      </View>

      <Image source={require('./assets/bee.png')} style={styles.image} />

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.videoButton} onPress={handleWatchVideo}>
          <Text style={styles.buttonText}>👀{'\n'}앱 사용법 영상 보기</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.startButton} onPress={handleStart}>
          <Text style={styles.buttonText}>🖐️{'\n'}바로 시작하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  overlayContainer: {
    width: '100%',
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 20,
  },
  partyImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  overlayText: {
    position: 'absolute',
    color: '#000',
    fontSize: 18,
    textAlign: 'center',
  },
  title: {
    fontSize: 75,
    fontFamily: 'JustMeAgainDownHere',
    color: '#000',
  },
  subtitle: {
    fontSize: 17,
    fontWeight: '350',
    color: '#000',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 60,
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  videoButton: {
    backgroundColor: '#6C95F0',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 10,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 10,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SigninSuccess;
