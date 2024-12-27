import { SafeAreaView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { colors } from '../components/constants'
import VectorIcons from '../components/VectorIcons'

type Props = {}

const Home = (props: Props) => {
  return (
    <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'}/>
        <View style={styles.header}>
        <Text style={styles.headerTxt}>Celebrities</Text>
        </View>
      <View style={styles.searchView}>
        <VectorIcons type="AntDesign" name="search1" size={20} color="#bebebe" />
        <TextInput 
        placeholder='Search celebrities here'
        placeholderTextColor={'#bebebe'}
        // onChangeText={}
        style={styles.searchTextInput}
        />
      </View>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.background.primary
    },
    header:{
        padding:10,
        // backgroundColor:'#ccc',
        alignItems:'center',
    },
    headerTxt:{
        fontWeight:'500',
        color:'#000',
        fontSize:20,
    },
    searchView:{
        borderWidth:0.6,
        marginVertical:10,
        marginHorizontal:20,
        borderColor:colors.borderColor,
        paddingHorizontal:10,
        borderRadius:15,
        elevation:1,
        backgroundColor:colors.background.primary,
        flexDirection:'row',
        alignItems:'center',
        height:40,
    

    },
    searchTextInput:{
        marginRight:15,
        marginLeft:5,
        color:"#000"

    }
})