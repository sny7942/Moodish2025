import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const RMRecognition = ({ navigation }) => {
    const [selectedOption, setSelectedOption] = useState(null); // selectedOption 상태 추가

    const items = [
        { id: 1, label: '수기', image: require('./assets/hand.png') },
        { id: 2, label: '웹캠', image: require('./assets/webcam.png') },
        { id: 3, label: '영수증', image: require('./assets/receipt.png') },
    ];

    const handleSelect = (option) => {
        setSelectedOption(option);
    };

    const handleNext = () => {
        if (selectedOption) {
            navigation.navigate('Profile'); // 'Profile'로 이동
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>냉장고 재료 인식 3가지 방법 중{'\n'} 원하는 한 가지를 선택하세요.</Text>
            <View style={styles.optionsContainer}>
                {items.map((item, index) => (
                    <TouchableOpacity
                        key={item.id}
                        style={[
                            styles.option,
                            selectedOption === item.label && styles.selectedOption,
                            index !== 0 && styles.optionMargin, // '수기' 외의 항목들에 간격 추가
                        ]}
                        onPress={() => handleSelect(item.label)}
                    >
                        <Image source={item.image} style={styles.optionImage} />
                        <Text style={styles.optionText}>{item.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <TouchableOpacity
                style={[styles.button, !selectedOption && styles.buttonDisabled]}
                disabled={!selectedOption}
                onPress={handleNext}
            >
                <Text style={styles.buttonText}>다음</Text>
            </TouchableOpacity>
            
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
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 40,
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
        flexWrap: 'wrap', // 항목들이 자동으로 줄바꿈 되도록
        justifyContent: 'center', 
    },
    option: {
        width: '50%',
        backgroundColor: '#f0f0f0',
        borderRadius: 50,
        padding: 20,
        marginHorizontal: 5,
        alignItems: 'center',
        borderWidth: 2, // 테두리 두께 설정
        borderColor: '#f0f0f0', // 선택되지 않았을 때 기본 색상
    },
    selectedOption: {
        borderColor: '#ff6b6b', // 선택된 옵션의 가장자리 색상
    },
    optionMargin: {
        marginTop: 20, // '웹캠'과 '영수증'에 간격 추가
    },
    optionImage: {
        width: 50, // 이미지 너비
        height: 50, // 이미지 높이
        marginBottom: 10, // 이미지와 텍스트 간격
        resizeMode: 'contain',
        
    },
    optionText: {
        fontSize: 16,
    },
    button: {
        backgroundColor: '#FF6B6B',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 70,
        marginTop: 10,
        width: 200,
        alignItems: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#ddd', // 비활성화 시 색상
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

export default RMRecognition;
