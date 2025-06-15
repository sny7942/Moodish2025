import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const UserSetupScreen = ({ navigation }) => {
  const [selectedUtensils, setSelectedUtensils] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedRecognition, setSelectedRecognition] = useState('');

  const utensils = [
    { id: 1, label: '믹서기' },
    { id: 2, label: '오븐' },
    { id: 3, label: '전자레인지' },
    { id: 4, label: '에어프라이어' },
    { id: 5, label: '가스레인지' },
  ];

  const difficulties = [
    { id: 1, label: '입문용' },
    { id: 2, label: '초급' },
    { id: 3, label: '중급' },
    { id: 4, label: '상급' },
  ];

  const recognitions = [
    { id: 1, label: '수기', image: require('./assets/hand.png') },
    { id: 2, label: '웹캠', image: require('./assets/webcam.png') },
    { id: 3, label: '영수증', image: require('./assets/receipt.png') },
  ];

  const toggleUtensil = (label) => {
    if (selectedUtensils.includes(label)) {
      setSelectedUtensils(selectedUtensils.filter(item => item !== label));
    } else {
      setSelectedUtensils([...selectedUtensils, label]);
    }
  };

  const onSubmit = () => {
    if (selectedUtensils.length === 0) {
      alert('조리기구를 한 개 이상 선택해주세요.');
      return;
    }
    if (selectedDifficulty === '') {
      alert('요리 난이도를 선택해주세요.');
      return;
    }
    if (selectedRecognition === '') {
      alert('냉장고 재료 인식 방식을 선택해주세요.');
      return;
    }
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100, flexGrow: 1 }}>
        <Text style={styles.introText}>맞춤 레시피 추천을 위해 선택해주세요!😊</Text>
        <Text style={styles.sectionTitle}>Q1. 보유하고 있는 조리기구는?</Text>
        <View style={styles.cardContainer}>
          {utensils.map(item => {
            const selected = selectedUtensils.includes(item.label);
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.card, selected && styles.cardSelected]}
                onPress={() => toggleUtensil(item.label)}
                activeOpacity={0.8}
              >
                <Text style={[styles.cardText, selected && styles.cardTextSelected]}>{item.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Q2. 원하는 요리 난이도는?</Text>
        <View style={styles.cardContainer}>
          {difficulties.map(item => {
            const selected = selectedDifficulty === item.label;
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.card, selected && styles.cardSelected]}
                onPress={() => setSelectedDifficulty(item.label)}
                activeOpacity={0.8}
              >
                <Text style={[styles.cardText, selected && styles.cardTextSelected]}>{item.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Q3. 냉장고 재료 인식 방법들 중 원하는 1가지를 선택하세요.</Text>
        <View style={styles.optionsContainer}>
          {recognitions.map((item, idx) => {
            const selected = selectedRecognition === item.label;
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.option, selected && styles.optionSelected, idx !== 0 && { marginLeft: 12 }]}
                onPress={() => setSelectedRecognition(item.label)}
                activeOpacity={0.8}
              >
                <Image source={item.image} style={styles.optionImage} />
                <Text style={[styles.optionText, selected && styles.optionTextSelected]}>{item.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{ marginTop: 10, alignItems: 'center' }}>
          <TouchableOpacity style={styles.button} onPress={onSubmit} activeOpacity={0.9}>
            <Text style={styles.buttonText}>완료 ✅</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

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
  container: { flex: 1, backgroundColor: '#FAFAFA', paddingHorizontal: 20, paddingTop: 24 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#FFF',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
    marginRight: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#DDD',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  cardSelected: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF4C4C',
    shadowOpacity: 0.15,
  },
  cardText: {
    fontSize: 15,
    color: '#555',
    fontWeight: '600',
  },
  cardTextSelected: {
    color: '#FFF',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  option: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#EEE',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 6,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  optionSelected: {
    borderColor: '#FF6B6B',
    backgroundColor: '#FFE6E6',
    shadowOpacity: 0.15,
    elevation: 6,
  },
  optionImage: {
    width: 44,
    height: 44,
    marginBottom: 8,
    resizeMode: 'contain',
  },
  optionText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#777',
  },
  optionTextSelected: {
    color: '#FF4C4C',
  },
  introText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    backgroundColor: '#E6F7FF', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
    color: '#000',
 },
  button: {
    backgroundColor: '#6C95F0',
    paddingVertical: 13,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: '#6C95F0',
    shadowOpacity: 0.6,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    bottom: 10,
    elevation: 6,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    position: 'absolute',
    bottom: 55,
    left: 0,
    right: 0,
    paddingVertical: 10
  },
  navIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  navIcon1: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginTop: 4,
  },
});

export default UserSetupScreen;
