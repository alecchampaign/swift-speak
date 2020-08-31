import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import auth, { firebase } from '@react-native-firebase/auth';
import globalStyles from '../styles.js';

const signIn = async (email, password, navigation, setHasEmptyFields, setIsInvalid) => {
  if (email.length === 0 || password.length === 0) {
    setHasEmptyFields(true);
    setIsInvalid(false);
    return;
  }
  try {
    const response = await auth().signInWithEmailAndPassword(email, password)
    if (response && response.user) {
      const user = firebase.auth().currentUser;
      if (user.uid) navigation.navigate('Home');
    } else {
      setIsInvalid(true);
      setHasEmptyFields(false);
    }
  } catch (e) {
    setIsInvalid(true);
    setHasEmptyFields(false);
  }
}

const Login = ({ navigation }) => {
  const [isInvalid, setIsInvalid] = useState(false);
  const [hasEmptyFields, setHasEmptyFields] = useState(false);
  return (
    <View style={styles.container}>
      <Formik 
          initialValues={{ email: '', password: '', }}
          // needs an onSubmit prop here
          onSubmit={values => {
            signIn(values.email, values.password, navigation, setHasEmptyFields, setIsInvalid);
          }}
        >
          {(props) => (
            <View style={globalStyles.form}>
              <Text style={styles.loginText}>Login</Text>
              {isInvalid ? (<Text style={globalStyles.requiredText}>*Email and/or Password is invalid</Text>) : (<></>)}
              {hasEmptyFields ? (<Text style={globalStyles.requiredText}>*Please enter Email/Password</Text>) : (<></>)}
              <TextInput style={globalStyles.inputField} placeholder="Email" onChangeText={props.handleChange('email')} value={props.values.email} />
              <TextInput style={globalStyles.inputField} placeholder="Password" onChangeText={props.handleChange('password')} value={props.values.password} />
              <TouchableOpacity style={globalStyles.wideBtn} onPress={props.handleSubmit}>
                <LinearGradient colors={['#fcc288', '#ef7a40']} start={{x: 0, y: 0.5}} end={{x: 1, y: 0.5}} style={globalStyles.wideBtnGradient}>
                  <Text style={globalStyles.wideBtnText}>Login</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingBottom: '10%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
  },
  loginText: {
    alignSelf: 'flex-start',
    fontFamily: 'roboto',
    fontSize: 40,
    color: '#faab6c',
    fontWeight: 'bold',
    marginBottom: 50,
  }
})

export default Login;