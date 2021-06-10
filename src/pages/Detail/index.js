import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

const Detail = ({route}) => {
    const contact = route.params;
    return (
        <View>
            <Image style={{width: 230, height: 230}} source={{uri: contact.photo}} />
        </View>
    )
}

export default Detail

const styles = StyleSheet.create({})
