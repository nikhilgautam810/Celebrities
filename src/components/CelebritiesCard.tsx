import * as React from 'react';
import { Image, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, View, Pressable, Dimensions } from 'react-native'
import { colors } from '../components/constants'
import VectorIcons from '../components/VectorIcons'
import Collapsible from 'react-native-collapsible';
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
let imageHeight = height * 0.06;
let imageWidth = width * 0.13;

const CelebritiesCard = ({item}: {item: Celebrity}) =>{

    const [expanded, setExpanded] = React.useState(true);
    const [isEditing, setIsEditing] = React.useState(false);

    const ShowMore = () =>{
        setExpanded(!expanded);
        if (isEditing) {
         setIsEditing(false);
        }
    };

    const Edit = () =>{
        setIsEditing(true);
    };
    const Delete = () =>{

    };
    const Save = () =>{

    }

    return(
        <View style={styles.celebsView}>
        <View style={[styles.celebsListView, {marginVertical: expanded ? 0 : 10}]}>
        <View style={styles.celebsViewImageName}>
            <Image style={styles.celebImage} source={{uri: item.image}}/>
            {
                isEditing ? (
                     <View style={styles.textInputView}>
                        <TextInput
                            style={styles.nameTextInput}
                            value={item.name}
                            // onChangeText={}
                        />
                    </View>
                ) : (
                    <Text style={styles.celebNameTxt}>{item.name}</Text>
                )
            }
        </View>
        <Pressable style={styles.dropDownBtn} onPress={ShowMore}>
          <VectorIcons 
          type="Entypo" 
          name={expanded ? 'chevron-thin-down' : 'chevron-thin-up'} 
          size={18} 
          color="#bebebe" />
        </Pressable>
        
      </View>
        <Collapsible style={styles.celebsInfo} collapsed={expanded}>
            <View style={styles.ageGenderCountryView}>
                <View style={styles.infoView}>
                    <Text style={styles.infoTxt}>Age</Text>
                     {
                            isEditing ? (
                            <View style={styles.textInputView}>
                                <TextInput
                                    style={styles.detailsTextInput}
                                    value={item.age}
                                    // onChangeText={}
                                />
                            </View>
                        ) : (
                            <Text style={styles.info}>{item.age}</Text>
                        )
                    }
                </View>
                <View style={styles.infoView}>
                    <Text style={styles.infoTxt}>Gender</Text>
                     {
                            isEditing ? (
                            <View style={styles.textInputView}>
                                <TextInput
                                    style={styles.detailsTextInput}
                                    value={item.gender}
                                    // onChangeText={}
                                />
                            </View>
                        ) : (
                            <Text style={styles.info}>{item.gender}</Text>
                        )
                    }
                </View>
                <View style={styles.infoView}>
                    <Text style={styles.infoTxt}>Country</Text>
                     {
                            isEditing ? (
                            <View style={styles.textInputView}>
                                <TextInput
                                    style={styles.detailsTextInput}
                                    value={item.country}
                                    // onChangeText={}
                                />
                            </View>
                        ) : (
                            <Text style={styles.info}>{item.country}</Text>
                        )
                    }
                </View>
            </View>
            <View style={styles.descriptionView}>
                <Text style={styles.infoTxt}>Description</Text>
                 {
                        isEditing ? (
                            <View style={styles.textInputView}>
                                <TextInput
                                    style={styles.descriptionTextInput}
                                    value={item.description}
                                    multiline={true}
                                    numberOfLines={5}
                                    placeholder='Write your'
                                    // onChangeText={}
                                />
                            </View>
                        ) : (
                             <Text style={styles.descriptionTxt}>{item.description}</Text>
                        )
                    }
            </View>

            <View style={styles.editDeleteView}>
                <Pressable style={styles.editBtn} onPress={()=>Delete()}>
                    <VectorIcons 
                        type="AntDesign" 
                        name="delete" 
                        size={22} 
                        color={colors.button.danger} />
                </Pressable>
                 <Pressable style={styles.deleteBtn} onPress={()=>Edit()}>
                    <VectorIcons 
                        type="Octicons" 
                        name="pencil" 
                        size={22} 
                        color={colors.button.primary} />
                </Pressable>
            </View>
        </Collapsible>
      </View>
    )
}

export default CelebritiesCard;

const styles = StyleSheet.create({
     celebsView:{
      borderWidth:1,
      borderColor:"#C0C0C0",
      alignItems:'center',
      paddingVertical:10,
      paddingHorizontal:15,
      marginVertical:10,
      marginHorizontal:15,
      borderRadius:10,
      overflow:'hidden'
    },
    celebsListView:{
     flexDirection:'row',
        justifyContent:'space-between',
        // backgroundColor:'#ccc',
        width:'100%',
        alignItems:'center',
        

    },
    celebsViewImageName:{
      alignItems:'center',
      flexDirection:'row',
    },
    celebImage:{
      height:imageHeight,
      width:imageWidth,
      borderRadius:50,
      borderWidth:1,
      borderColor:colors.border.primary,
            // borderColor:"#C0C0C0",
      marginRight:15,
      resizeMode:'cover'
      
    },
    celebNameTxt:{
      color:'#000',
      fontWeight:'500',
      fontSize:19,
    },
    dropDownBtn:{
      padding:5
    },
    celebsInfo:{
        // position:'absolute',
        // top:0,

    },
    ageGenderCountryView:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginVertical:10,
    width:'100%'
    },

    
    infoView:{
        alignItems:'flex-start'
    },
    infoTxt:{
        fontSize:14,
        color:"#C0C0C0",
        marginLeft:5,
        marginBottom:5

    },
    info:{
        fontSize:15,
        color:colors.text.primary,
    },

    descriptionTxt:{
        fontSize:16,
        color:colors.text.primary
    },
    descriptionView:{
        marginVertical:10
    },
    editDeleteView:{
        alignSelf:'flex-end',
        flexDirection:'row',
        width:'20%',
        margin:5,
        // backgroundColor:'#ccc',
        justifyContent:'space-between',
        alignItems:'center'
    },
    editBtn:{
        alignSelf:'center'
    },
    textInputView:{
        borderWidth:1,
        borderColor:'#C0C0C0',
        borderRadius:10,
        alignItems:'center'

    },
    nameTextInput:{
        height: height/30,
        // maxWidth: width/2,
        color:'#000',
        margin:1,
        fontSize:15,
        padding:0,
        paddingHorizontal:10

    },
    detailsTextInput:{
         height: height/35,
        width: width/4.5,
        color:'#000',
        margin:1,
        fontSize:15,
        padding:0,
        paddingHorizontal:10
    },
    descriptionTextInput:{
        height:height/12,
        color:colors.text.primary,
        // backgroundColor:'#ccc',
        padding:0,
        fontSize:15,
         paddingHorizontal:10

    },

})
 
