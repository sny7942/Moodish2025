import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import FormField from "./components/FormField";
import NavigationHeader from "./components/NavigationHeader";
import SubmitButton from "./components/SubmitButton";

const formFields = [
  { id: "name", label: "이름", marginTop: 10 },
  { id: "username", label: "아이디", marginTop: 30 },
  { id: "password", label: "비밀번호", marginTop: 30, secureTextEntry: true },
  { id: "confirmPassword", label: "비밀번호 확인", marginTop: 30, secureTextEntry: true },
];

function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  // 입력 값 변경 시 상태 업데이트
  const handleChange = (id, value) => {
    setFormData({ ...formData, [id]: value });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <NavigationHeader />
      {formFields.map((field) => (
        <FormField
          key={field.id}
          id={field.id}
          label={field.label}
          value={formData[field.id]}
          onChange={handleChange}
          marginTop={field.marginTop}
          secureTextEntry={field.secureTextEntry || false} // 비밀번호 입력 시 숨김 처리
        />
      ))}
      <SubmitButton formData={formData} />{/* formData 전달 */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 480,
    width: "100%",
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: 10,
    paddingBottom: 88,
    flexDirection: "column",
    backgroundColor: "#fff",
  },
});

export default SignupForm;
