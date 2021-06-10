import React, {useState, useEffect} from 'react'
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import {InputTextComponent} from '../../components';
import ImagePicker from 'react-native-image-picker';
import {useForm} from '../../utils';
import Axios from 'axios';
import profile from '../../assets/icons/profile.jpg';

const Form = ({navigation}) => {
    const [imageUpload, setImageUpload] = useState('');
    const [form, setForm] = useForm({
        firstName: '',
        lastName: '',
        age: '',
        photo: ''
    });

    const getImage = () => {
        ImagePicker.launchImageLibrary({
            quality: 0.5,
            maxWidth: 300,
            maxHeight: 300
        }, (response) => {
            if (response.didCancel || response.error) {
                alert('Gak Jadi !')
            } else {
                console.log('response getImage :', response);
                // setData ke variabel imageUpload
                setForm('photo', `data:${response.type};base64, ${response.data}`);
            }
        });

       
    }

    const tambah = () => {
        console.log(form);
        Axios.post('https://simple-contact-crud.herokuapp.com/contact', form)
        .then(res => {
            setForm('reset');
            console.log(res);
            navigation.replace('Home');
        })
    }
    return (
        <View style={styles.page}>
            <Text style={styles.judul}>Tambah Contact</Text>
            <InputTextComponent placeholder="First Name ..." value={form.firstName} onChangeText={(value) => setForm('firstName', value)} />
            <InputTextComponent placeholder="Last Name ..." value={form.lastName} onChangeText={(value) => setForm('lastName',value)} />
            <InputTextComponent placeholder="Age ..." value={form.age} onChangeText={(value) => setForm('age', value)} />
            <Text>Choose Image</Text>
            {
                form.photo ? <Image style={styles.avatar} source={{uri: form.photo}} /> : <Image style={styles.avatar} source={profile} />
            }
            <TouchableOpacity style={styles.wraperChooseImage} onPress={getImage}>  
                <Text style={styles.getImage}>Click</Text>
            </TouchableOpacity>
            <Button title="Tambah" onPress={tambah} />
            <View style={styles.gap}></View>
            <Button title="Back" onPress={() => navigation.navigate('Home')} />
        </View>
    )
}

export default Form

const styles = StyleSheet.create({
    page: {
        flex: 1,
        padding: 20
    },
    getImage: {
        padding: 10,
        backgroundColor: 'blue',
        color: 'white',
        textAlign: 'center',
        borderRadius: 10
    },
    wraperChooseImage:{
        width: 90,
        marginBottom: 20,
        marginTop: 10
    }, 
    avatar: {
        width: 100,
        height: 100
    },
    judul: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20
    },
    gap: {
        paddingVertical: 10
    }
})
