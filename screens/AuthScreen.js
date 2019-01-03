import React from 'react';
import { 
  Text,
  StyleSheet,
  Button, 
  View,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import { ExpoConfigView } from '@expo/samples';

import { AsyncStorage } from "react-native"

export default class AuthScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      login: true
    }

  }
  static navigationOptions = {
    title: 'Authentication',
  };

  componentDidMount() {

  }

  onPressModeButton() {
    this.setState({login: !this.state.login});
  }

  async checkToken() {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        this.props.navigation.navigate('Main') 
      }
      else {
        // Alert.alert("no credentials found")
      }
    } catch (error) {
      console.error(error)
    }
  }

  async storeToken(token) {
    try {
      await AsyncStorage.setItem('token', token);
    } catch (error) {
      console.error(error)
    }
  }

  onPressLogIn() {
    // this.props.navigation.navigate('Main')
    return fetch('http://172.20.10.8:9999/api-auth/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    })
    .then((response) => response.json())
    .then((responseJSON) => {
      if (responseJSON.hasOwnProperty('token')) {
        this.storeToken(responseJSON.token)
        this.checkToken()
      }
      else {
      }
    })
    .catch((error) =>{
      Alert.alert(error);
    });
  }

  onPressSignUp() {
    Alert.alert('error: sign up not yet implemented')
    this.props.navigation.navigate('Auth')
  }

  textValue() {
    return ''
  }

  render() {
    return (
      <View style={styles.screenContainer}>
        <Text style={styles.text}>E-Store</Text>
        <TextInput
          style={styles.input}
          onChangeText={(username) => this.setState({username})}
          placeholder="Username"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          onChangeText={(password) => this.setState({password})}
          placeholder="Password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
        />
        {this.state.login ?
          <View style={styles.loginButtonContainer}>
            <TouchableOpacity style={styles.button} onPress={this.onPressLogIn.bind(this)}>
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
            <View style={styles.textContainer}>
              <Text style={styles.modeText}>New member?</Text>
              <TouchableOpacity onPress={this.onPressModeButton.bind(this)}>
                <Text style={styles.modeButton}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>

          :
          <View style={styles.loginButtonContainer}>
            <TextInput
              style={styles.input}
              onChangeText={(password) => this.setState({password})}
              placeholder="Confirm Password"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
            />
            <TouchableOpacity style={styles.button} onPress={this.onPressSignUp.bind(this)}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <View style={styles.textContainer}>
              <Text style={styles.modeText}>Already a member?</Text>
              <TouchableOpacity onPress={this.onPressModeButton.bind(this)}>
                <Text style={styles.modeButton}>Log In</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 50,
    textAlign: 'center',
    marginBottom: 30,
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    width: 300,
    fontSize: 20,
    height: 42,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderColor: '#888888',
    borderWidth: 1,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'skyblue',
    width: 200,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
  },
  loginButtonContainer: {
    // borderColor: "black",
    // borderWidth: 1,
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'row',
  },
  modeText: {
    margin: 5,
  },
  modeButton: {
    margin: 5,
    color: 'blue',
    fontWeight: '500',
  }
});