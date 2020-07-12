import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Formik } from 'formik';
import LinearGradient from 'react-native-linear-gradient';

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
          <TextInput style={styles.inputField} placeholder="Email" onChangeText={props.handleChange('email')} value={props.values.email} />
          <TextInput style={styles.inputField} placeholder="Username" onChangeText={props.handleChange('username')} value={props.values.username} />
          <TextInput style={styles.inputField} placeholder="Password" onChangeText={props.handleChange('password')} value={props.values.password} />
          <TextInput style={styles.inputField} placeholder="Confirm Password" onChangeText={props.handleChange('confirmPassword')} value={props.values.confirmPassword} />
          <TouchableOpacity style={styles.signUpBtn} onPress={props.handleSubmit}>
            <LinearGradient colors={['#fcc288', '#ef7a40']} start={{x: 0, y: 0.5}} end={{x: 1, y: 0.5}} style={styles.linearGradient}>
              <Text style={styles.signUpBtnText}>Sign Up</Text>
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
  welcomeText: {
    alignSelf: 'flex-start',
    fontFamily: 'roboto',
    fontSize: 40,
    color: '#faab6c',
    fontWeight: 'bold',
    marginBottom: 50,
  },
  form: {
    flex: 1,
    width: 0.8 * width,
  },
  inputField: {
    fontFamily: 'roboto',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    color: 'lightgrey'
  },
  signUpBtn: {
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 20,
  },    
  signUpBtnText: {
    textAlign: 'center',
    padding: 10,
    color: '#fff',
  },
  linearGradient: {
    borderRadius: 20,
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