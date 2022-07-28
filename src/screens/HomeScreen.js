import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

const HomeScreen = () => {

    const user = useSelector(state => state.user)

    return (
        <View>
            <Text>HomeScreen {user.email} </Text>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})