import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#70E2FF',
    borderRadius: 100,
    marginRight: 5,
    padding: 10,
    width: '50%'
  },

  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 50
  },

  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500'
  },

  buttonsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
    width: '80%'
  },

  container: {
    backgroundColor: '#FFFFFF',
    display: 'flex',
    height: '100%',
    width: '100%'
  },
  inputContainer: {
    borderColor: 'e8e8e8',
    borderRadius: 5,
    borderWidth: 1,
    marginVertical: 10,
    margin: 20,
    paddingHorizontal: 10,
    width: '90%'
  },
  text: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500'
  }
})
