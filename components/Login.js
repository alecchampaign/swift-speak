import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

const Login = () => (
  <View style={styles.container}>
    <Formik initialValues={{ username: '', password: '' }}>
      {(props) => (
        <View style={styles.form}>
          <Text style={styles.loginText}>Login</Text>
          <TextInput style={styles.inputField}placeholder="username" onChange={props.handleChange('username')} value={props.values.username} />
          <TextInput style={styles.inputField} placeholder="password" onChange={props.handleChange('password')} value={props.values.password} />
          <TouchableOpacity style={styles.loginBtn}>
            <LinearGradient colors={['#fcc288', '#ef7a40']} start={{x: 0, y: 0.5}} end={{x: 1, y: 0.5}} style={styles.linearGradient}>
              <Text style={styles.loginBtnText}>Login</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingBottom: '10%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
  },
  form: {
    width: '80%',
  },
  inputField: {
    fontFamily: 'roboto',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    color: 'lightgrey'
  },
  loginBtn: {
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 20,
  },    
  loginBtnText: {
    textAlign: 'center',
    padding: 10,
    color: '#fff',
  },
  linearGradient: {
    borderRadius: 20,
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