import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable
} from 'react-native';
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

const Home = ({navigation}) => {
  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState({});
   const [modalVisible, setModalVisible] = useState(false);
   const dispatch = useDispatch();
   const getContactReducer = useSelector(state => state);

  const getAllContacts = () => {
    Axios.get('https://simple-contact-crud.herokuapp.com/contact').then(res => {
      console.log(res.data.data);
      setContacts(res.data.data);
    });
  };

  useEffect(() => {
    getAllContacts();
  }, []);

  const deleteContact = id => {
    Alert.alert(
      'Delete Contact',
      `Kamu yakin ingin hapus contact dengan id ${id}`,
      [
        {
          text: "Cancel", onPress: () => {
            console.warn('this cancel !')
          }
        },
        {
          text: "Ok", onPress: () => {
            const url = `https://simple-contact-crud.herokuapp.com/contact/${id}`;
            console.log(url);
            Axios.delete(url, {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
            })
              .then(res => console.log(res))
              .catch(err => {
                console.log(err.message);
              });
          }
        }
      ]
    )
   
  };

  const getContact = (id) => {
  
    Axios.get(`https://simple-contact-crud.herokuapp.com/contact/${id}`)
    .then(res => {
      console.log(res.data.data);
      setContact(res.data.data);
      setModalVisible(true)
      console.log('getContact Reducer:', getContactReducer);
    }).catch(err => {
      console.log(err.message);
    })
  }

  const updateContact = (id) => {
    Axios.get(`https://simple-contact-crud.herokuapp.com/contact/${id}`)
    .then(res => {
      dispatch({type: 'GET_CONTACT', value: res.data.data})
      navigation.navigate('Update');
    }).catch(err => {
      console.log(err.message);
    })
  }

  return (
    <View style={styles.page}>
      <View style={styles.btnTambah}>
        <Button
          title="Add Contact"
          onPress={() => navigation.navigate('Form')}></Button>
      </View>
       <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Image style={{width: 200, height: 200, borderRadius: 20}} source={{uri: contact.photo}} />
            <Text style={{textAlign: 'left', marginTop: 10, fontSize: 20, fontWeight: 'bold'}}>{contact.firstName} {contact.lastName}</Text>
            <Text style={styles.modalText}>{contact.age} thn</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle}>Close Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={styles.wrapperContact}>
        {contacts.map(contact => {
          return (
            <View style={styles.wrapperContent} key={contact.id}>
            <TouchableOpacity onPress={() => getContact(contact.id)}>
             <Image style={styles.avatar} source={{uri: contact.photo}} />
            </TouchableOpacity>
              <View style={{padding: 5}}>
                <Text style={{fontSize: 12}}>
                  {contact.firstName + ' ' + contact.lastName}
                </Text>
                <Text style={{fontSize: 10}}>{contact.age} thn</Text>
              </View>
              <TouchableOpacity
                onPress={() => updateContact(contact.id)}>
                <Text style={styles.update}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteContact(contact.id)}>
                <Text style={styles.delete}>Delete</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 10,
  },
  avatar: {
    width: 120,
    height: 120,
  },
  wrapperContent: {
    width: '33%',
    paddingVertical: 10,
  },
  wrapperContact: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  update: {
    padding: 5,
    backgroundColor: 'yellow',
    textAlign: 'center',
    color: '#000',
    borderRadius: 10,
  },
  delete: {
    padding: 5,
    backgroundColor: 'red',
    textAlign: 'center',
    color: '#eee',
    borderRadius: 10,
    marginTop: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
  }
  // btnTambah: {
  //   paddingVertical: 10,
  //   paddingHorizontal: 10
  // }
});
