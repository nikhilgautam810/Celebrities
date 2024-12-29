
import { SafeAreaView, StatusBar, StyleSheet, Text, TextInput, View, Pressable, FlatList, Dimensions, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native'
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
  dob: string;
  gender: string;
  country: string;
  description: string;
};

const Home = () => {

  const [celebrities, setCelebrities] = React.useState(CelebritiesData);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchCeleb, setSearchCeleb] = useState('');




  const handleSave = (updatedItem: Celebrity) => {
    setCelebrities((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const celebrity = celebrities.filter((celeb) =>
      celeb.name.toLowerCase().includes(searchCeleb.toLowerCase())
    )
  


  const openDeleteModal = (id: string) => {
    setSelectedId(id);
    setModalVisible(true);

  };
  const closeModal = () => {
    setModalVisible(false);
    setSelectedId(null);
  };

  const handleDelete = () => {
    if (selectedId) {
      const updatedList = celebrities.filter((celeb) => celeb.id !== selectedId);
      setCelebrities(updatedList);
      closeModal();
    }
  };




  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.background} barStyle={'dark-content'} />
      <View style={styles.header}>
        <Text style={styles.headerTxt}>Celebrities</Text>
      </View>
      <View style={styles.searchView}>
        <VectorIcons type="AntDesign" name="search1" size={18} color={colors.color.gray} />
        <TextInput
          placeholder='Search celebrities here'
          placeholderTextColor={'#bebebe'}
          value={searchCeleb}
          onChangeText={(text)=>setSearchCeleb(text)}
          style={styles.searchTextInput}
        />
      </View>
      <FlatList
        data={celebrity}
        renderItem={({ item }) => <CelebritiesCard item={item} onSave={handleSave} onDelete={()=>openDeleteModal(item.id)} />}
        keyExtractor={(item) => item.id}
        initialNumToRender={10}  
        maxToRenderPerBatch={10}  
        windowSize={5}  
      />

      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View style={styles.modalMessageCrossBtnView}>
              <Text style={styles.modalMessage}>Are you sure you want to delete ?</Text>
              <VectorIcons type="Feather" name="x" size={16} color={colors.color.gray} onPress={()=>closeModal()}/>
            </View>
            <View style={styles.modalBtnView}>
              <Pressable style={styles.modalCancelBtn} onPress={closeModal}>
                <Text style={styles.modalCancelBtnTxt}>Cancel</Text>
              </Pressable>
              <Pressable style={styles.modalDeleteBtn} onPress={handleDelete}>
                <Text style={styles.modalDeleteBtnTxt}>Delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  header: {
    padding: 10,
    alignItems: 'center',
  },
  headerTxt: {
    fontWeight: '500',
    color: colors.text.primary,
    fontSize: 20,
  },
  searchView: {
    borderWidth: 0.6,
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: colors.border,
    paddingHorizontal: 10,
    borderRadius: 15,
    elevation:1,
    backgroundColor: colors.background,
    flexDirection: 'row',
    alignItems: 'center',
    height: height * 0.04,


  },
  searchTextInput: {
    marginRight: 15,
    marginLeft: 5,
    color: colors.text.primary,
    padding: 0

  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalView: {
    width: '85%',
    height: '12%',
    backgroundColor: colors.background,
    borderRadius: 10,
    padding: 20,
    elevation:10,
    borderWidth:0.6,
    borderColor:colors.border
  },
  modalMessageCrossBtnView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  },
  modalMessage: {
    color: colors.text.primary,
    fontSize: 12,
  },
  modalBtnView: {
    width: '52%',
    alignSelf: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30
  },
  modalCancelBtn: {
    borderWidth: 0.6,
    borderColor: colors.border,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 7,
    backgroundColor: colors.background
  },
  modalCancelBtnTxt: {
    fontSize: 11,
    color: colors.text.primary,
  },
  modalDeleteBtn: {
    borderWidth: 0.6,
    borderColor: colors.border,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 7,
    backgroundColor: colors.button.danger
  },
  modalDeleteBtnTxt: {
    fontSize: 11,
    color: colors.color.white,
  }

})