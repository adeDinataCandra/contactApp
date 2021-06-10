import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'

const InputTextComponent = ({placeholder, value, onChangeText}) => {
    return (
        <View>
            <TextInput style={styles.input} placeholder={placeholder} value={value} onChangeText={onChangeText} />
        </View>
    )
}

export default InputTextComponent;

const styles = StyleSheet.create({
    input: {
        width: '100%',
        height: 50,
        borderColor: 'grey',
        backgroundColor: '#DCDCDC',
        borderRadius: 10,
        paddingLeft: 10,
        marginBottom: 20
    }
})
