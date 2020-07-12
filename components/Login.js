import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import globalStyles from '../styles.js';

const Login = () => (
  <View style={styles.container}>
    <Formik initialValues={{ username: '', password: '' }}>
      {(props) => (
        <View style={globalStyles.form}>
          <Text style={styles.loginText}>Login</Text>
          <TextInput style={globalStyles.inputField}placeholder="Username" onChange={props.handleChange('username')} value={props.values.username} />
          <TextInput style={globalStyles.inputField} placeholder="Password" onChange={props.handleChange('password')} value={props.values.password} />
          <TouchableOpacity style={globalStyles.wideBtn}>
            <LinearGradient colors={['#fcc288', '#ef7a40']} start={{x: 0, y: 0.5}} end={{x: 1, y: 0.5}} style={globalStyles.wideBtnGradient}>
              <Text style={globalStyles.wideBtnText}>Login</Text>
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