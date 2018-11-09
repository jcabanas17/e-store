import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Picker,
  Button,
  SegmentedControlIOS,
  Alert,
  TextInput
} from 'react-native';
import StoreItem from '../components/StoreItem';

import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Shop',
  };

  state = {
    selectedIndex: 0,
    searchText: ''
  };

  handleButtonPress = (itemData, event) => {
    Alert.alert(itemData.name + ' was added to cart');
  };

  render() {
    return (
      <View style={styles.screenContainer}>
        <TextInput
          placeholder="Search"
          onChangeText={(searchText) => this.setState({searchText})}
          style={styles.searchBar}
        />
        <View style={styles.headerContainer}>
        {
          Platform.OS === 'ios' 
          ? 
          <SegmentedControlIOS
            values={['U-Store', 'C-Store', 'Wawa']}
            selectedIndex={this.state.selectedIndex}
            onChange={(event) => {
              this.setState({selectedIndex: event.nativeEvent.selectedSegmentIndex});
            }}
            style={styles.segmentedControl}
          />  
          : 
          <Button title="segmented controler unavailable for android"></Button>
        }
        </View>
      {/* MULTI DEPARTMENT SCROLLVIEW */}
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.storeWrapper}>

            <Text style={styles.departmentTitle}>Snacks</Text>
            <ScrollView horizontal={true} contentContainerStyle={styles.departmentContainer}> 
            <StoreItem 
              title="Popcorn"
              price={3.99}
              image={require("../assets/images/sushi.png")}
              description="Really Yummy Food"
              handleButtonPress={this.handleButtonPress.bind(null, {name: 'Popcorn'})}
              storeID={0}
              key={1}
            />
            <StoreItem 
              title="Oreos"
              price={1.99}
              image={require("../assets/images/sushi.png")}
              description="Really Yummy Food"
              handleButtonPress={this.handleButtonPress.bind(null, {name: 'Oreos'})}
              storeID={0}
              key={2}
            />
            <StoreItem 
              title="Sweedish Fish"
              price={1.99}
              image={require("../assets/images/sushi.png")}
              description="Really Yummy Food"
              handleButtonPress={this.handleButtonPress.bind(null, {name: 'Sweedish Fish'})}
              storeID={0}
              key={3}
            />
            <StoreItem 
              title="Pop Tarts"
              price={0.99}
              image={require("../assets/images/sushi.png")}
              description="Really Yummy Food"
              handleButtonPress={this.handleButtonPress.bind(null, {name: 'Pop Tarts'})}
              storeID={0}
              key={4}
            />
            <StoreItem 
              title="Goldfish"
              price={1.99}
              image={require("../assets/images/sushi.png")}
              description="Really Yummy Food"
              handleButtonPress={this.handleButtonPress.bind(null, {name: 'Goldfish'})}
              storeID={0}
              key={5}
            />
            <StoreItem 
              title="Clif Bar"
              price={1.99}
              image={require("../assets/images/sushi.png")}
              description="Really Yummy Food"
              handleButtonPress={this.handleButtonPress.bind(null, {name: 'Clif Bar'})}
              storeID={0}
              key={6}
            />
            </ScrollView>

            <Text style={styles.departmentTitle}>Meds</Text>
            <ScrollView horizontal={true} contentContainerStyle={styles.departmentContainer}> 
            <StoreItem 
              title="Tylenol"
              price={2.99}
              image={require("../assets/images/sushi.png")}
              description="Really Yummy Food"
              handleButtonPress={this.handleButtonPress.bind(null, {name: 'Tylenol'})}
              storeID={0}
              key={7}
            />
            <StoreItem 
              title="Advil"
              price={2.99}
              image={require("../assets/images/sushi.png")}
              description="Really Yummy Food"
              handleButtonPress={this.handleButtonPress.bind(null, {name: 'Advil'})}
              storeID={0}
              key={8}
            />
            </ScrollView>

            <Text style={styles.departmentTitle}>Fresh Food</Text>
            <ScrollView horizontal={true} contentContainerStyle={styles.departmentContainer}> 
            <StoreItem 
              title="Honey Mustard Chicken Wrap"
              price={2.99}
              image={require("../assets/images/sushi.png")}
              description="Really Yummy Food"
              handleButtonPress={this.handleButtonPress.bind(null, {name: 'Honey Mustard Chicken Wrap'})}
              storeID={0}
              key={9}
            />
            <StoreItem 
              title="Sushi"
              price={2.99}
              image={require("../assets/images/sushi.png")}
              description="Really Yummy Food"
              handleButtonPress={this.handleButtonPress.bind(null, {name: 'Sushi3'})}
              storeID={0}
              key={10}
            />
            </ScrollView>            
          </View>
        </ScrollView>


{/*
          {this.state.itemList.map((item, key) => {
            
            return (

              this.state.searchText==='' ?
              item.storeID === this.state.selectedIndex ?
              <StoreItem 
              title={item.name}
              price={item.price}
              image={require("../assets/images/sushi.png")}
              description="Really Yummy Food"
              handleButtonPress={this.handleButtonPress.bind(null,item)}
              storeID={item.storeID}
              key={key}
              />
              : ''
              :
              String(item.name).toLowerCase().indexOf(String(this.state.searchText).toLowerCase()) !== -1 ?
              item.storeID === this.state.selectedIndex ?
              <StoreItem 
              title={item.name}
              price={item.price}
              image={require("../assets/images/sushi.png")}
              description="Really Yummy Food"
              handleButtonPress={this.handleButtonPress.bind(null,item)}
              storeID={item.storeID}
              key={key}
              />
              : ''
              : ''
            )
          })}
*/}          

      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
  },
  screenContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 2,
  },
  contentContainer: {
    alignItems: 'center',
  },
  segmentedControl: {
    width: "100%",
    height: 40,
  },
  searchBar: {
    fontSize: 18,
    height: 45,
    marginLeft: 10,
    marginRight: 10
  },
  departmentTitle: {
    fontSize: 24,
    color: 'black',
    backgroundColor: '#EEE',
    height: 30,
    paddingLeft: 10,
    paddingTop: 2,
    textAlign: 'center'
  },
  // departmentScroll: {
  //   backgroundColor: 'white',
  //   borderColor: 'red',
  //   borderWidth: 2,
  // },
  department: {
    borderColor: 'black',
    borderWidth: 1,
  },
  departmentContainer: {
    marginBottom: 5
  },
  storeWrapper: {
    width: '100%'
  }
});
