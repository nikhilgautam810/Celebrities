import * as React from 'react';
import { Image, StyleSheet, Text, TextInput, View, Pressable, Dimensions } from 'react-native'
import { colors } from '../components/constants'
import VectorIcons from '../components/VectorIcons'
import Collapsible from 'react-native-collapsible';
const { width, height } = Dimensions.get('window');


type Celebrity = {
    id: string;
    name: string;
    image: string;
    dob: string;
    gender: string;
    country: string;
    description: string;
};
let imageHeight = height * 0.06;
let imageWidth = width * 0.13;

const CelebritiesCard = ({ item, onSave, onDelete }: { item: any; onSave: (updatedItem: any) => void; onDelete: (id: string) => void; }) => {

    const [expanded, setExpanded] = React.useState(true);
    const [isEditing, setIsEditing] = React.useState(false);
    const [editedData, setEditedData] = React.useState<Celebrity>({ ...item });
    const [dropdownVisible, setDropdownVisible] = React.useState(false);



    const ShowMore = () => {
        setExpanded(!expanded);
        if (isEditing) {
            setIsEditing(false);
        }
        setDropdownVisible(false);
    };

    const Edit = () => {
        setIsEditing(!isEditing);
    };

    const Delete = () => {
        console.log("Delete function called");
        onDelete(item.id);
    };


    const handleSave = () => {
        onSave(editedData);
        setIsEditing(false);
        setDropdownVisible(false);
    };
    const CloseEditMode = () => {
        setIsEditing(!isEditing);
        setDropdownVisible(false);
    }

    const calculateAge = (dob: string) =>{
        const birthDay = new Date(dob);
        const todayDate = new Date();
        var age = todayDate.getFullYear() - birthDay.getFullYear();
        return age;
    }

    return (
        <Pressable style={styles.celebsView} onPress={ShowMore}>
            <View style={[styles.celebsListView, { marginVertical: expanded ? 0 : 10 }]}>
                <View style={styles.celebsViewImageName}>
                    <Image style={styles.celebImage} source={{ uri: item.image }} />
                    {
                        isEditing ? (
                            <View style={styles.textInputView}>
                                <TextInput
                                    style={styles.nameTextInput}
                                    value={editedData.name}
                                    onChangeText={(text) => setEditedData({ ...editedData, name: text })}
                                />
                            </View>
                        ) : (
                            <Text style={styles.celebNameTxt}>{editedData.name}</Text>
                        )
                    }
                </View>
                <View style={styles.dropDownBtn}>
                    <VectorIcons
                        type="Entypo"
                        name={expanded ? 'chevron-thin-down' : 'chevron-thin-up'}
                        size={18}
                        color={colors.color.gray} />
                </View>

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
                                        value={editedData.dob}
                                        onChangeText={(text) => setEditedData({ ...editedData, dob: text })}
                                    />
                                </View>
                            ) : (
                                <Text style={styles.info}>{calculateAge(editedData.dob)} Years</Text>
                            )
                        }
                    </View>
                    <View style={styles.infoView}>
                        <Text style={styles.infoTxt}>Gender</Text>
                        {
                            isEditing ? (
                                <View style={[styles.textInputView, {zIndex: 100}]}>
                                    <Pressable
                                        style={styles.genderField}
                                        onPress={() => setDropdownVisible(!dropdownVisible)} 
                                    >
                                        <Text style={styles.info}>
                                            {editedData.gender || 'Select Gender'}
                                        </Text>
                                        <VectorIcons
                                            type="Entypo"
                                            name={dropdownVisible ? 'chevron-thin-up' : 'chevron-thin-down'}
                                            size={14}
                                            color={colors.color.gray}
                                        />
                                    </Pressable>
                                    {dropdownVisible && (
                                        <View style={styles.dropdown}>
                                            {['Male', 'Female', 'Other'].map((option) => (
                                                <Pressable
                                                    key={option}
                                                    style={styles.dropdownItem}
                                                    onPress={() => {
                                                        setEditedData({ ...editedData, gender: option });
                                                        setDropdownVisible(false); 
                                                    }}
                                                >
                                                    <Text style={styles.info}>{option}</Text>
                                                </Pressable>
                                            ))}
                                        </View>
                                    )}
                                </View>
                            ) : (
                                <Text style={styles.info}>{editedData.gender}</Text>
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
                                        value={editedData.country}
                                        onChangeText={(text) => setEditedData({ ...editedData, country: text })}
                                    />
                                </View>
                            ) : (
                                <Text style={styles.info}>{editedData.country}</Text>
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
                                    value={editedData.description}
                                    multiline={true}
                                    numberOfLines={5}
                                    placeholder='Write your'
                                    onChangeText={(text) => setEditedData({ ...editedData, description: text })}
                                />
                            </View>
                        ) : (
                            <Text style={styles.descriptionTxt}>{editedData.description}</Text>
                        )
                    }
                </View>

                <View style={styles.editDeleteView}>
                    {
                        isEditing ? (
                            <><Pressable style={styles.editBtn} onPress={() => CloseEditMode()}>
                                <VectorIcons
                                    type="Feather"
                                    name="x-circle"
                                    size={24}
                                    color={colors.button.danger} />
                            </Pressable>
                                <Pressable style={styles.saveBtn} onPress={() => handleSave()}>
                                    <VectorIcons
                                        type="Octicons"
                                        name="check-circle"
                                        size={22}
                                        color={colors.button.green} />
                                </Pressable></>
                        ) : (
                            <><Pressable style={styles.editBtn} onPress={() => Delete()}>
                                <VectorIcons
                                    type="AntDesign"
                                    name="delete"
                                    size={22}
                                    color={'#FF0000'} />
                            </Pressable>
                                <Pressable style={styles.editBtn} onPress={() => Edit()}>
                                    <VectorIcons
                                        type="Octicons"
                                        name="pencil"
                                        size={22}
                                        color={colors.button.blue} />
                                </Pressable></>
                        )
                    }

                </View>
            </Collapsible>
        </Pressable>
    )
}

export default CelebritiesCard;

const styles = StyleSheet.create({
    celebsView: {
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginVertical: 10,
        marginHorizontal: 15,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: colors.background
    },
    celebsListView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
    },
    celebsViewImageName: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    celebImage: {
        height: imageHeight,
        width: imageWidth,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: colors.border,
        marginRight: 15,
        resizeMode: 'stretch'

    },
    celebNameTxt: {
        color: colors.text.primary,
        fontWeight: '400',
        fontSize: 17,
    },
    dropDownBtn: {
        padding: 5
    },
    celebsInfo: {
        paddingHorizontal:8
    },
    ageGenderCountryView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        width: '100%'
    },


    infoView: {
        alignItems: 'flex-start'
    },
    infoTxt: {
        fontSize: 14,
        color: colors.text.secondary,
        marginBottom: 5

    },
    info: {
        fontSize: 14,
        color: colors.text.primary,
    },

    descriptionTxt: {
        fontSize: 14,
        color: colors.text.primary
    },
    descriptionView: {
        marginVertical: 15
    },
    editDeleteView: {
        alignSelf: 'flex-end',
        flexDirection: 'row',
        width: '20%',
        margin: 5,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    editBtn: {
        alignSelf: 'center'
    },
    textInputView: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 10,
        alignItems: 'center',

    },
    nameTextInput: {
        height: height / 30,
        color: colors.text.primary,
        margin: 1,
        fontSize: 14,
        padding: 0,
        paddingHorizontal: 10

    },
    detailsTextInput: {
        height: height / 35,
        width: width / 4.5,
        color: colors.text.primary,
        margin: 1,
        fontSize: 14,
        padding: 0,
        paddingHorizontal: 10
    },
    descriptionTextInput: {
        height: height / 12,
        color: colors.text.primary,
        padding: 0,
        fontSize: 14,
        paddingHorizontal: 10

    },
    genderField: {
        height: height / 35,
        width: width / 4.5,
        color: colors.text.primary,
        margin: 1,
        fontSize: 14,
        padding: 0,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.background,
        borderRadius: 10,
    },
    genderText: {
        color: '#000',
        fontSize: 16,
    },
    dropdown: {
        position: 'absolute',
        top: 30,
        width: '100%',
        backgroundColor: colors.background,
        borderWidth: 0.6,
        borderColor: '#ccc',
        borderRadius: 10,
        elevation: 10,
        zIndex: 100
        },
    dropdownItem: {
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.border,
    },
    dropdownText: {
        fontSize: 16,
        color: colors.text.primary,
    },
    genderDropDownBtn: {
        position: 'absolute',
        right: 5,
        top: 5
    }


})

