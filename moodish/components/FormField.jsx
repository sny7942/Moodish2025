import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

function FormField({ id, label, marginTop, value, onChange }) {
  return (
    <>
      <View style={[styles.labelContainer, { marginTop }]}>
        <Text style={styles.label} nativeID={`${id}Label`}>
          {label}
        </Text>
      </View>
      <TextInput
        style={styles.input}
        value={value || ""}
        onChangeText={(text) => onChange(id, text)} // 입력값을 상위로 전달
        accessibilityLabel={label}
        accessibilityLabelledBy={`${id}Label`} // label ID와 연결
        secureTextEntry={id ? id.toLowerCase().includes("password") : false}
      />
      <View style={styles.separator} />
    </>
  );
}

const styles = StyleSheet.create({
  labelContainer: {
    marginLeft: 31,
  },
  label: {
    color: "rgba(135, 125, 125, 1)",
  },
  input: {
    marginTop: 1,
    marginLeft: 16,
    width: 279,
    maxWidth: "100%",
    borderBottomColor: "rgba(135, 125, 125, 1)",
  },
  separator: {
    borderColor: "rgba(137, 122, 122, 1)",
    borderStyle: "dashed",
    borderWidth: 0.5,
    marginTop: 1,
    marginLeft: 16,
    width: 279,
  },
});

export default FormField;
