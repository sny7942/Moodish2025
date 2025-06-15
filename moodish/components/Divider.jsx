import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Divider = () => {
  return (
    <View style={styles.dividerContainer}>
      <View style={styles.line} />
      <Text style={styles.dividerText}>or</Text>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(224, 224, 224, 1)',
  },
  dividerText: {
    marginHorizontal: 8,
    color: 'rgba(130, 130, 130, 1)',
  },
});

export default Divider;