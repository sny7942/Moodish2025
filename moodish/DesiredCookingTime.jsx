import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DesiredCookingTime = ({ navigation, route}) => {
    const [selectedItem, setSelectedItem] = useState(null); // 단일 선택을 위한 상태
    const [inputName, setInputName] = useState('');
    const [apiResult, setApiResult] = useState(null); // API 결과를 저장할 상태
    const [inputText, setinputText] = useState('양파'); //임시
    const [inputText_time, setInputText_time] = useState(''); //시간만 선택
    const [inputText_diffi] = useState('아무나'); //임시
    const [isLoading, setIsLoading] = useState(false);

    const { emotionId } = route.params;
    const items = [
        { id: 1, label: ' 10분 이내',value: '10'},
        { id: 2, label: ' 30분' ,value: '30'},
        { id: 3, label: ' 1시간' ,value: '60'},
        { id: 4, label: ' 상관 없음' ,value: '120'},
    ];

    const toggleItem = (label) => {
        const selectedItemData = items.find((item) => item.label === label); // label로 item 찾기
    
        if (selectedItemData) {
            setInputText_time(selectedItem === selectedItemData.id ? null : selectedItemData.value); // value 저장
            setSelectedItem(selectedItem === label ? null : label); // 선택 토글
        }
    };

const callApi_ingre = async () => {
    console.log(emotionId);
    setIsLoading(true);
    try {
      const response = await fetch('http://172.30.1.8:5000/ingreFromDB', { //위치에 따라 ip변경 필요
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userInputname:inputName,
        }),
      });
      const result = await response.json();
      setinputText(result.result); // Flask 서버에서 반환한 'result' 값을 상태에 저장
      

    } catch (error) {
      console.error('Error calling API:', error);
    } finally {
    setIsLoading(false); // API 호출 끝난 후 로딩 종료
  }
  };

    useEffect(() => {
  const loadUsername = async () => {
    try {
      const name = await AsyncStorage.getItem('username');
      if (name !== null) {
        setInputName(name); // 상태에 저장
      }
    } catch (e) {
      console.error("AsyncStorage에서 username 가져오기 실패", e);
    }
    };

  loadUsername(); // 함수 호출
}, []);

useEffect(() => {
  if (inputName) {
    callApi_ingre();
  }
}, [inputName]);

const callApi_rec = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://172.30.1.8:5000/recommend', { //위치에 따라 ip변경 필요
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username:inputName,
            userInput: inputText,
            userInput_time: inputText_time,
            userInput_diffi: inputText_diffi,
            userInput_emotion: "기쁨",
        }),
      });
      const result = await response.json();
      setApiResult(result.result); // Flask 서버에서 반환한 'result' 값을 상태에 저장


    } catch (error) {
      console.error('Error calling API:', error);
    } finally {
    setIsLoading(false); // API 호출 끝난 후 로딩 종료
  }
  };

  useEffect(() => {
    if (apiResult !== null) {
      handleNext();
    }
  }, [apiResult]);


    const handleNext = () => {
        if (selectedItem) {
            console.log(apiResult);
            navigation.navigate('RecipeRecommendation', { result_name:  apiResult }); // 'Profile' 화면으로 이동
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>원하는 조리 시간은?</Text>
            <ScrollView>
                {items.map((item) => (
                    <TouchableOpacity
                        key={item.id.toString()}
                        style={styles.item}
                        onPress={() => toggleItem(item.label)}
                    >
                        <View style={styles.box}>
                            <Text style={styles.itemText}>{item.label}</Text>
                            {selectedItem === item.label && <Text style={styles.checkMark}>✔</Text>}
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, (!selectedItem || isLoading) && styles.buttonDisabled]}
                    disabled={!selectedItem}
                    onPress={callApi_rec}
                >
                    <Text style={styles.buttonText}>다음</Text>
                </TouchableOpacity>
            </View>

            {/* 하단 네비게이션 바 */}
            <View style={styles.navBar}>
                <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                    <Image source={require('./assets/reading glasses.png')} style={styles.navIcon1} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Image source={require('./assets/home.png')} style={styles.navIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Save')}>
                    <Image source={require('./assets/refrigerator.png')} style={styles.navIcon1} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('MyPage')}>
                    <Image source={require('./assets/userIcon.png')} style={styles.navIcon} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 40,
        textAlign: 'center',
        marginBottom: 90,
    },
    item: {
        marginBottom: 10, // 아이템 간 간격 추가
    },
    box: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 8,
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    itemText: {
        fontSize: 16,
    },
    checkMark: {
        fontSize: 16,
        color: 'green',
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 20,
        width: '100%',
    },
    button: {
        backgroundColor: '#FF6B6B',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 70,
        marginTop: -20,
        width: 200,
    },
    buttonDisabled: {
        backgroundColor: '#ddd',
    },
    buttonText: {
        color: '#000',
        fontSize: 18,
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    navIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    navIcon1: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        marginTop: 5,
    },
});

export default DesiredCookingTime;
