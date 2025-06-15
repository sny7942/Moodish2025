import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RefrigeratorReceipt = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [apiResult, setApiResult] = useState(null); // API 결과 저장
    const [ingred,seting] = useState(null);
ingred
    const pickImage = async () => {
        console.log('pickImage 함수 호출됨');

        // 권한 요청 및 확인
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('권한 필요', '이미지 선택을 위해 갤러리 접근 권한이 필요합니다.');
            return;
        }
        console.log('갤러리 접근 권한 승인됨');

        // 이미지 선택
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            console.log('ImagePicker 결과:', result);

            if (!result.canceled && result.assets && result.assets.length > 0) {
                const selectedUri = result.assets[0].uri;
                console.log('선택된 이미지 URI:', selectedUri);
                setSelectedImage(selectedUri);
                uploadImage(selectedUri); // 이미지 업로드 함수 호출
            } else {
                console.log('이미지 선택 취소됨');
            }
        } catch (error) {
            console.error('이미지 선택 중 오류 발생:', error);
        }
    };

    const uploadImage = async (imageUri) => {
        try {
        const username = await AsyncStorage.getItem('username') || 'guest';
        console.log('🔐 AsyncStorage에서 불러온 username:', username);

        const formData = new FormData();
        formData.append('image', {
            uri: imageUri,
            name: 'photo.jpg',
            type: 'image/jpeg',
        });
        formData.append('username', username);  // 실제 유저 ID

        console.log('🚀 서버로 보낼 FormData 준비 완료:', formData);

        const response = await axios.post('http://172.30.1.8:5000/mainReceipt', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        console.log('✅ API 응답 도착:', response.data);

        if (response.data) {
            setApiResult(response.data);
        } else {
            Alert.alert('오류', '서버에서 유효한 응답을 받지 못했습니다.');
        }
    } catch (error) {
        console.error('❌ 이미지 업로드 중 오류:', error.message);
        Alert.alert('업로드 실패', `에러: ${error.message}`);
    }
};

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Image Picker Example</Text>
            <TouchableOpacity style={styles.button} onPress={pickImage}>
                <Text style={styles.buttonText}>갤러리에서 이미지 선택</Text>
            </TouchableOpacity>

            {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}

            {apiResult && (
                <View style={styles.resultContainer}>
                    <Text style={styles.resultTitle}>재료:</Text>
                    
                    <Text style={styles.resultText}>{JSON.stringify(apiResult.rec_res)}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: 'cover',
        marginTop: 20,
    },
    resultContainer: {
        marginTop: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
    },
    resultTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    resultText: {
        fontSize: 14,
    },
});

export default RefrigeratorReceipt;
