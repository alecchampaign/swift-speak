import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Formik } from 'formik';
import LinearGradient from 'react-native-linear-gradient';
import globalStyles from '../styles.js';

const Signup = ({ navigation }) => (
  <View style={styles.container}>
    <View style={styles.chineseWelcomeTextContainer}>
      <View style={styles.chineseWelcomeTextSubcontainer}>
        <Text style={styles.chineseWelcomeText}>你好!</Text>
        <View style={styles.chineseWelcomeSubtext}>
          <Text style={styles.pinyin}>Nǐ hǎo</Text>
          <Text style={styles.translation}>Hello</Text>
        </View>
      </View>
    </View>
    <Formik 
      initialValues={{ email: '', username: '', password: '', confirmPassword: '' }}
      // needs an onSubmit prop here
    >
      {(props) => (
        <View style={styles.form}>
          <Text style={styles.welcomeText}>Welcome!</Text>
          <TextInput style={globalStyles.inputField} placeholder="Email" onChangeText={props.handleChange('email')} value={props.values.email} />
          <TextInput style={globalStyles.inputField} placeholder="Username" onChangeText={props.handleChange('username')} value={props.values.username} />
          <TextInput style={globalStyles.inputField} placeholder="Password" onChangeText={props.handleChange('password')} value={props.values.password} />
          <TextInput style={globalStyles.inputField} placeholder="Confirm Password" onChangeText={props.handleChange('confirmPassword')} value={props.values.confirmPassword} />
          <TouchableOpacity style={globalStyles.wideBtn} onPress={props.handleSubmit}>
            <LinearGradient colors={['#fcc288', '#ef7a40']} start={{x: 0, y: 0.5}} end={{x: 1, y: 0.5}} style={globalStyles.wideBtnGradient}>
              <Text style={globalStyles.wideBtnText}>Sign Up</Text>
            </LinearGradient>
          </TouchableOpacity>
          <Text style={styles.loginText} onPress={() => navigation.navigate('Login')}>Already have an account? Login</Text>
        </View>
      )}
    </Formik>
  </View>
);

const { height, width } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    paddingBottom: 0.1 * height,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'white'
  },
  chineseWelcomeTextSubcontainer: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  chineseWelcomeTextContainer: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  chineseWelcomeText: {
    fontSize: 80,
    fontFamily: 'roboto',
    color: '#faab6c',
    fontWeight: 'bold',
    borderWidth: 4,
    borderColor: '#faab6c',
    borderRadius: 20,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 10,
    paddingTop: 10,
  },
  chineseWelcomeSubtext: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pinyin: {
    color: '#faab6c',
    flex: 0.5,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  translation: {
    color: '#faab6c',
    flex: 0.5,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  form: {
   ...globalStyles.form,
    flex: 1,
  },
  welcomeText: {
    alignSelf: 'flex-start',
    fontFamily: 'roboto',
    fontSize: 40,
    color: '#faab6c',
    fontWeight: 'bold',
    marginBottom: 50,
  },
  loginText: {
    color: '#faab6c',
    borderBottomWidth: 1,
    borderColor: '#faab6c',
    textAlign: 'center',
    alignSelf: 'center',
  },
})

export default Signup;