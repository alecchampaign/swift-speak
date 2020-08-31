import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
  wideBtn: {
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 20,
  },    
  wideBtnText: {
    textAlign: 'center',
    padding: 10,
    color: '#fff',
  },
  wideBtnGradient: {
    borderRadius: 20,
  },
  form: {
    width: '80%',
  },
  inputField: {
    fontFamily: 'roboto',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  requiredText: {
    color: '#ff1500',
    fontStyle: 'italic',
    fontSize: 12
  }
});

export default globalStyles;