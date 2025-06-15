import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ImagePickerComponent = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('권한 필요', '이미지 선택을 위해 갤러리 접근 권한이 필요합니다.');
            return;
        }

        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                const selectedUri = result.assets[0].uri;
                setSelectedImage(selectedUri);
            } else {
                console.log('이미지 선택 취소됨');
            }
        } catch (error) {
            console.error('이미지 선택 중 오류 발생:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Image Picker Example</Text>
            <TouchableOpacity style={styles.button} onPress={pickImage}>
                <Text style={styles.buttonText}>갤러리에서 이미지 선택</Text>
            </TouchableOpacity>

            {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}
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
});

export default ImagePickerComponent;
