
import { Image, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, View, Pressable, FlatList, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../components/constants'
import VectorIcons from '../components/VectorIcons'
import { CelebritiesData } from '../Data/CelebritiesData';
import CelebritiesCard from '../components/CelebritiesCard';
const { width, height } = Dimensions.get('window');

type Celebrity = {
  id: string;
  name: string;
  image: string;
  age: string;
  gender: string;
  country: string;
  description: string;
};

const Home = (props: Props) => {

  const [celebrities, setCelebrities] = React.useState(CelebritiesData);


  const handleSave = (updatedItem: Celebrity) => {
    setCelebrities((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
      <View style={styles.header}>
        <Text style={styles.headerTxt}>Celebrities</Text>
      </View>
      <View style={styles.searchView}>
        <VectorIcons type="AntDesign" name="search1" size={18} color="#bebebe" />
        <TextInput
          placeholder='Search celebrities here'
          placeholderTextColor={'#bebebe'}
          // onChangeText={}
          style={styles.searchTextInput}
        />
      </View>
      <FlatList
        data={celebrities}
        renderItem={({ item }) => <CelebritiesCard item={item} OnSave={handleSave}/>}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary
  },
  header: {
    padding: 10,
    // backgroundColor:'#ccc',
    alignItems: 'center',
  },
  headerTxt: {
    fontWeight: '500',
    color: '#000',
    fontSize: 20,
  },
  searchView: {
    borderWidth: 0.6,
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: colors.borderColor,
    paddingHorizontal: 10,
    borderRadius: 15,
    // elevation:1,
    backgroundColor: colors.background.primary,
    flexDirection: 'row',
    alignItems: 'center',
    height: height * 0.04,


  },
  searchTextInput: {
    marginRight: 15,
    marginLeft: 5,
    color: "#000",
    padding: 0

  },

})