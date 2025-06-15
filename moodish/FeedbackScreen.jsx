import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';

const categories = [
  { label: '🎨 UI', value: 'UI' },
  { label: '🤖 추천 시스템', value: 'Recommendation' },
  { label: '🧊 냉장고 인식', value: 'Fridge' },
  { label: '📷 얼굴 인식', value: 'Face' },
  { label: '💬 기타', value: 'Other' },
];

export default function FeedbackScreen() {
  const [selectedCategory, setSelectedCategory] = useState('UI');
  const [feedbackText, setFeedbackText] = useState('');

  const handleSubmit = () => {
    console.log('카테고리:', selectedCategory);
    console.log('내용:', feedbackText);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.header}>사용자 피드백</Text>

        <View style={styles.categoryContainer}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.value}
              style={[
                styles.categoryItem,
                selectedCategory === cat.value && styles.selectedCategory,
              ]}
              onPress={() => setSelectedCategory(cat.value)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === cat.value && styles.selectedCategoryText,
                ]}
              >
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.inputTitle}>피드백 내용을 입력하세요.</Text>
        <Text style={styles.inputSub}>자유롭게 작성해주세요 :)</Text>

        <TextInput
          style={styles.input}
          multiline
          numberOfLines={8}
          placeholder="예: 추천 결과가 제 감정과 잘 안 맞는 것 같아요!"
          value={feedbackText}
          onChangeText={setFeedbackText}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>제출하기</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scroll: {
    padding: 20,
    paddingTop: 80,
    alignItems: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 30,
    gap: 10,
  },
  categoryItem: {
    backgroundColor: '#EDEDED',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  selectedCategory: {
    backgroundColor: '#FD7D7D',
  },
  categoryText: {
    fontSize: 14,
    color: '#555',
  },
  selectedCategoryText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  inputTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
    marginTop: 10,
  },
  inputSub: {
    fontSize: 13,
    color: '#777',
    textAlign: 'center',
    marginBottom: 12,
  },
  input: {
    width: '100%',
    height: 180,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 30,
    backgroundColor: '#FFF',
    textAlignVertical: 'top',
    fontSize: 15,
  },
  submitButton: {
    backgroundColor: '#6C95F0',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  submitButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
