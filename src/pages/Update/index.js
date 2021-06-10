import React, {useState, useEffect} from 'react'
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import {InputTextComponent} from '../../components';
import ImagePicker from 'react-native-image-picker';
import {useForm} from '../../utils';
import Axios from 'axios';

const Update = ({navigation, route}) => {
    const data = route.params;
    const [imageUpload, setImageUpload] = useState('');
    const [form, setForm] = useForm({
        firstName: data.firstName,
        lastName: data.lastName,
        age: data.age,
        photo: data.photo
    });

    useEffect(() => {
        console.log(form);
    })

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

    const update = () => {
        Axios.put(`https://simple-contact-crud.herokuapp.com/contact/${data.id}`, form)
        .then(res => {
            setForm('reset');
            console.log(res);
            navigation.replace('Home');
        })
    }
    return (
        <View style={styles.page}>
            <Text style={styles.judul}>Update Contact</Text>
            <InputTextComponent placeholder="First Name ..." value={form.firstName} onChangeText={(value) => setForm('firstName', value)} />
            <InputTextComponent placeholder="Last Name ..." value={form.lastName} onChangeText={(value) => setForm('lastName',value)} />
            <InputTextComponent placeholder="Age ..." value={form.age} onChangeText={(value) => setForm('age', value)} />
            <Text>Choose Image</Text>
            <Image style={styles.avatar} source={{uri: form.photo}} />
            <TouchableOpacity style={styles.wraperChooseImage} onPress={getImage}>  
                <Text style={styles.getImage}>Click</Text>
            </TouchableOpacity>
            <Button title="Update" onPress={update} />
            <View style={styles.gap}></View>
            <Button title="Back" onPress={() => navigation.navigate('Home')} />
        </View>
    )
}

export default Update

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
