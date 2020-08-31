import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Keyboard } from 'react-native';
import { Formik } from 'formik';
import LinearGradient from 'react-native-linear-gradient';
import {Transition, animated} from 'react-spring/renderprops';
import auth from "@react-native-firebase/auth";
import globalStyles from '../styles.js';

const createUser = async (email, password) => {
  try {
   const response =  await auth().createUserWithEmailAndPassword(email, password);
    if(response){
      console.log(tag,"🍎",response);
    }
  } catch (e) {
    alert(e.message);
  }
}

const Signup = ({ navigation }) => {
  const [items] = useState([
    { title: '你好', pinyin: 'Nǐ hǎo', translation: 'Hello', key: 0 },
    { title: '欢迎', pinyin: 'Huānyíng', translation: 'Welcome', key: 1 },
    { title: '高兴', pinyin: 'Gāoxìng', translation: 'Happy', key: 2 },
    { title: '中文', pinyin: 'Zhōngwén', translation: 'Chinese language', key: 3 },
    { title: '谢谢', pinyin: 'Xièxiè', translation: 'Thanks', key: 4}
  ]);
  const [index, setIndex] = useState(0);
  const [hasEmptyField, setHasEmptyField] = useState(false);
  const [hasShortPassword, setHasShortPassword] = useState(false);
  const [hasInvalidEmail, setHasInvalidEmail] = useState(false);
  const [hasMixedPasswords, setHasMixedPasswords] = useState(false);
  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);
  const AnimatedView = animated(View);
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => setKeyboardIsOpen(true));
    Keyboard.addListener('keyboardDidHide', () => setKeyboardIsOpen(false));
    const interval = setInterval(() => {
        setIndex((state) => (state + 1) % items.length);
      }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <View style={styles.container}>
      {keyboardIsOpen === false ? (<View style={styles.chineseWelcomeTextContainer}>
        <Transition native items={items[index]} keys={item => item.key} from={{ opacity: 0 }} enter={{ opacity: 1 }} leave={{ opacity: 0 }} config={{duration: 1000}}>
          {item => props => (
            <AnimatedView style={{...styles.chineseWelcomeTextSubcontainer, position: 'absolute', ...props}}>
              <Text style={{...styles.chineseWelcomeText}}>{item.title}</Text>
              <View style={styles.chineseWelcomeSubtext}> 
                <Text style={styles.pinyin}>{item.pinyin}</Text>
                <Text style={styles.translation}>{item.translation}</Text>
              </View>
            </AnimatedView>
          )} 
        </Transition>
      </View>) : (<></>)}
      <Formik 
        initialValues={{ email: '', username: '', password: '', confirmPassword: '' }}
        onSubmit={values => {
          console.log(values.username.length)
          const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g;
          if (values.email.length === 0 || values.username.length === 0 || values.password.length === 0 || values.confirmPassword.length === 0) {
            setHasEmptyField(true);
            setHasInvalidEmail(false);
            setHasShortPassword(false);
            setHasMixedPasswords(false);
            return;
          } else setHasEmptyField(false);
          if (!values.email.match(emailRegex)) {
            setHasInvalidEmail(true);
            setHasEmptyField(false);
            setHasShortPassword(false);
            setHasMixedPasswords(false);
            return;
          } else setHasInvalidEmail(false);
          if (values.password.length < 6) {
            setHasShortPassword(true);
            setHasInvalidEmail(false);
            setHasEmptyField(false);
            setHasMixedPasswords(false);
            return;
          } else setHasShortPassword(false);
          if (values.password !== values.confirmPassword) {
            setHasMixedPasswords(true);
            setHasInvalidEmail(false);
            setHasEmptyField(false);
            setHasShortPassword(false);
            return;
          } else setHasMixedPasswords(false);
          createUser(values.email, values.password);
          navigation.navigate('Login');
        }}
      >
        {(props) => (
          <View style={styles.form}>
            <Text style={styles.welcomeText}>Welcome!</Text>
            {hasEmptyField ? (<Text style={globalStyles.requiredText}>*Please fill out all fields</Text>) : (<></>)}
            {hasShortPassword ? (<Text style={globalStyles.requiredText}>*Passwords must have at least 6 characters</Text>) : (<></>)}
            {hasInvalidEmail ? (<Text style={globalStyles.requiredText}>*Email must be valid</Text>) : (<></>)}
            {hasMixedPasswords ? (<Text style={globalStyles.requiredText}>*Passwords must match</Text>) : (<></>)}
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
}

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