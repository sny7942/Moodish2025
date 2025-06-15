import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MoodSelectionScreen = () => {
    const navigation = useNavigation();

    const emotions = [
        { id: 1, label: '기쁨', image: require('./assets/happy.png') },
        { id: 2, label: '심심', image: require('./assets/bored.png') },
        { id: 3, label: '피로감', image: require('./assets/tired.png') },
        { id: 4, label: '분노/스트레스', image: require('./assets/angry.png') },
        { id: 5, label: '슬픔', image: require('./assets/sad.png') },
    ];

    const handleSelect = (emotions) => {
        navigation.navigate('DesiredCookingTime', { emotionId:  emotions }); // 감정을 선택하면 다음 화면으로 이동
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>다음 중 현재 자신의 감정을{'\n'} 선택하세요.</Text>
            <View style={styles.emotionsContainer}>
                {emotions.map(emotion => (
                    <TouchableOpacity
                        key={emotion.id}
                        style={styles.emotionButton}
                        onPress={() => handleSelect(emotion.label)}
                    >
                        <Image source={emotion.image} style={styles.emotionImage} />
                        <Text style={styles.emotionText}>{emotion.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* 하단 네비게이션 바 */}
            <View style={styles.navBar}>
                <TouchableOpacity onPress={() => navigation.navigate('Webcam')}>
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
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    emotionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 20,
    },
    emotionButton: {
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 15,
        margin: 10,
        alignItems: 'center',
        width: 150,
    },
    emotionImage: {
        width: 150,
        height: 100,
        marginBottom: 5,
        resizeMode: 'contain',
    },
    emotionText: {
        fontSize: 16,
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        position: 'absolute',
        bottom: 50,
        left: 0,
        right: 0,
        paddingVertical: 10
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
        marginTop: 5
    },
});

export default MoodSelectionScreen;
