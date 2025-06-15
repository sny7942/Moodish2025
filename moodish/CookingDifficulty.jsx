import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const CookingDifficulty = ({navigation}) => {
    const [selectedItems, setSelectedItems] = useState([]);

    const items = [
        { id: 1, label: '1. 입문용' },
        { id: 2, label: '2. 초급' },
        { id: 3, label: '3. 중급' },
        { id: 4, label: '4. 상급' },
    ];

    const toggleItem = (label) => {
        if (selectedItems.includes(label)) {
            setSelectedItems(selectedItems.filter(item => item !== label));
        } else {
            setSelectedItems([...selectedItems, label]);
        }
    };

    const handleNext = () => {
        if (selectedItems.length > 0) {
            navigation.navigate('RMRecognition'); // 'NextScreen'으로 이동
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>원하는 요리 난이도는?</Text>
            <ScrollView>
                {items.map((item) => (
                    <TouchableOpacity
                        key={item.id.toString()}
                        style={styles.item}
                        onPress={() => toggleItem(item.label)}
                    >
                        <View style={styles.box}>
                            <Text style={styles.itemText}>{item.label}</Text>
                            {selectedItems.includes(item.label) && <Text style={styles.checkMark}>✔</Text>}
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, selectedItems.length === 0 && styles.buttonDisabled]}
                    disabled={selectedItems.length === 0}
                    onPress={handleNext}
                >
                    <Text style={styles.buttonText}>다음</Text>
                </TouchableOpacity>
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
    },
    title: {
        fontSize: 20,
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
        alignItems: 'center',
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

export default CookingDifficulty;
