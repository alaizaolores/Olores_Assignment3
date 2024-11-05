import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View, StyleSheet, Image, KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import styles from "../styles/styling";
import { TextInput, Button } from "react-native-paper";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoginPressed, setIsLoginPressed] = useState(false);
  const [isForgotPasswordPressed, setIsForgotPasswordPressed] = useState(false);
  const [isRegisterPressed, setIsRegisterPressed] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const footer = require("../../assets/gradient.png");

  const [logoSize, setLogoSize] = useState(150);
  const codered = require("../../assets/codered.png");

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setLogoSize(50);
      setIsKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setLogoSize(150);
      setIsKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <KeyboardAvoidingView 
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 25 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Image source={codered} style={[styles.logoImage, { width: logoSize, height: logoSize }]} />
        <View style={loginStyle.header}>
          <Text style={loginStyle.headingTitle}>Welcome, Pulse!</Text>
          <Text style={loginStyle.subheadingTitle}>
            Find Blood with Speed, Be the Hope They Need!
          </Text>
          <Text style={loginStyle.pageTitle}>Log In</Text>
        </View>
        <View>
          <TextInput
            label="EMAIL"
            value={email}
            mode="outlined"
            activeOutlineColor="red"
            outlineColor="red"
            textColor="red"
            onChangeText={(newEmail) => setEmail(newEmail)}
            labelStyle={{ color: 'red' }}
            style={[loginStyle.textInput, { fontFamily: "PoppinsBold" }]}
          />
          
          <TextInput
            label="PASSWORD"
            value={password}
            mode="outlined"
            activeOutlineColor="red"
            outlineColor="red"
            textColor="red"
            onChangeText={(newPassword) => setPassword(newPassword)}
            secureTextEntry={!isPasswordVisible}
            right={
              <TextInput.Icon
                icon={isPasswordVisible ? "eye-off" : "eye"}
                color="gray"
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              />
            }
            style={[loginStyle.textInput, { fontFamily: "PoppinsBold" }]}
          />
        </View>
        <View style={{ alignItems: 'center', margin: -5 }}>
          <Button
            mode="text"
            onPress={() => navigation.navigate("RecoverPass")}
            onPressIn={() => setIsForgotPasswordPressed(true)} 
            onPressOut={() => setIsForgotPasswordPressed(false)}
            labelStyle={{
              fontSize: 14,
              textAlign: 'center',
              color: isForgotPasswordPressed ? 'black' : 'red',
              fontFamily: "Poppins"
            }}
            style={{ padding: 0 }}
          >
            Forgot Password?
          </Button>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Button
            mode="elevated"
            onPress={() => navigation.navigate("Profile")}
            onPressIn={() => setIsLoginPressed(true)} 
            onPressOut={() => setIsLoginPressed(false)} 
            labelStyle={{
              fontSize: 18,
              textAlign: 'center',
              color: 'white',
              fontFamily: "PoppinsBold",
              marginBottom: -4,
            }}
            style={[
              styles.button,
              {
                backgroundColor: isLoginPressed ? "#ff8e92" : "#fe0009",
                borderRadius: 5,
                width: 290,
                height: 50,
                marginBottom: isKeyboardVisible ? -200 : 0,
              },
            ]}
          >
            LOG IN
          </Button>
        </View>
        
        {!isKeyboardVisible && (
          <>
            <View style={{ height: 0.5, width: "80%", alignSelf: 'center', backgroundColor: 'white', marginVertical: 2 }} />

            <View style={{ alignItems: 'center' }}>
              <Button
                mode="elevated"
                onPress={() => navigation.navigate("Register")}
                onPressIn={() => setIsRegisterPressed(true)} 
                onPressOut={() => setIsRegisterPressed(false)}
                labelStyle={{ fontSize: 18, textAlign: 'center', color: 'white', fontFamily: "PoppinsBold" }} 
                style={{
                  backgroundColor: isRegisterPressed ? "#83d6f4" : "#1dc5fd",
                  paddingVertical: 7,
                  paddingHorizontal: 5,
                  margin: 10,
                  borderRadius: 5,
                  width: 290,
                  height: 50,
                }}
              >
                CREATE AN ACCOUNT
              </Button>
            </View>
          </>
        )}
      </KeyboardAvoidingView>
      {!isKeyboardVisible && (
        <View style={[styles.footerContainer, { position: 'absolute', bottom: 0, left: 0, right: 0, zIndex:-1 }]}>
          <Image source={footer} style={styles.footerImage} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Login;

const loginStyle = StyleSheet.create(styles);
