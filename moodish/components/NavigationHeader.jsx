import React from "react";
import { View, Image, Text, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

function NavigationHeader() {
  return (
    <View style={styles.header}>
      <Image
        resizeMode="contain"
        source={{
          uri: "https://cdn.builder.io/api/v1/image/assets/87643f6b95e24685aa12fdac7d93c13d/58750e77895a6202930b9eae32797857163b988bdc7f5ea2cc6ff02cfc16fd0e?apiKey=87643f6b95e24685aa12fdac7d93c13d&",
        }}
        style={styles.backIcon}
        accessibilityLabel="Back button"
      />
      <View>
        <Text style={styles.title}>                     회원가입</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    maxWidth: width, 
    justifyContent: "space-between", 
    padding: 10, 
  },
  backIcon: {
    width: width * 0.1, 
    height: undefined, 
    aspectRatio: 1.36, 
  },
  title: {
    fontFamily: "Judson, sans-serif",
    color: "rgba(0, 0, 0, 1)",
    fontWeight: "700",
    fontSize: width * 0.05, 
    display: "flex",
    width: "1000%", 
    maxWidth: width, 
    flexDirection: "row",
    alignItems: "center", 
    justifyContent: "space-between", 
    padding: 10, 
  },
});

export default NavigationHeader;
