import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { Formik } from 'formik';

const Signup = ({ navigation }) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Signup</Text>
    <Formik 
      initialValues={{ email: '', username: '', password: '', confirmPassword: '' }}
      // needs an onSubmit prop here
    >
      {(props) => (
        <View>
          <TextInput placeholder="Email" onChangeText={props.handleChange('email')} value={props.values.email} />
          <TextInput placeholder="Username" onChangeText={props.handleChange('username')} value={props.values.username} />
          <TextInput placeholder="Password" onChangeText={props.handleChange('password')} value={props.values.password} />
          <TextInput placeholder="Confirm Password" onChangeText={props.handleChange('confirmPassword')} value={props.values.confirmPassword} />
          <Button onPress={props.handleSubmit} title="Submit" />
          <Text onPress={() => navigation.navigate('Login')}>Already have an account? Login</Text>
        </View>
      )}
    </Formik>
  </View>
);

export default Signup;