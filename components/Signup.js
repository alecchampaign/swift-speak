import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Formik } from 'formik';
import LinearGradient from 'react-native-linear-gradient';
import {Transition, animated} from 'react-spring/renderprops';
import auth from "@react-native-firebase/auth";
import globalStyles from '../styles.js';

const createUser = async (email, password) => {
  try {
   const response =  await auth().createUserWithEmailAndPassword(email, password);
    if(response){
      console.log(tag,"🍎",response)
    }
  } catch (e) {
    console.error(e.message);
  }
}

const Signup = ({ navigation }) => {
  const [items] = useState([
    { title: '你好', pinyin: 'Nǐ hǎo', translation: 'Hello', key: 0 },
    { title: '欢迎', pinyin: 'Huānyíng', translation: 'Welcome', key: 1 },
    { title: '高兴', pinyin: 'Gāoxìng', translation: 'Happy', key: 2 },
    { title: '中文', pinyin: 'Zhōngwén', translation: 'Chinese', key: 3 },
    { title: '谢谢', pinyin: 'Xièxiè', translation: 'Thanks', key: 4}
  ]);
  const [index, setIndex] = useState(0);
  const AnimatedView = animated(View);
  useEffect(() => {
    const interval = setInterval(() => {
        setIndex((state) => (state + 1) % items.length);
      }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.chineseWelcomeTextContainer}>
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
      </View>
      <Formik 
        initialValues={{ email: '', username: '', password: '', confirmPassword: '' }}
        // needs an onSubmit prop here
        onSubmit={values => {
          if (values.password !== values.confirmPassword) return;
          createUser(values.email, values.password)
          navigation.navigate('Login');
        }}
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