import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { Formik } from 'formik';

const Login = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Login</Text>
    <Formik initialValues={{ username: '', password: '' }}>
      {(props) => (
        <View>
          <TextInput placeholder="username" onChange={props.handleChange('username')} value={props.values.username} />
          <TextInput placeholder="password" onChange={props.handleChange('password')} value={props.values.password} />
          <Button title="Submit"/>
        </View>
      )}
    </Formik>
  </View>
);

export default Login;