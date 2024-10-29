import React from 'react'
import { Text, View } from 'react-native'
import { Link } from 'expo-router'

const list = () => {

    return (
        <View style= {{ flex:1, justifyContent: 'center', alignItems: 'center', gap: 10}}>
        <Link href="/Welcome">welcome</Link>
        <Link href="../LogIn">log in</Link>
        <Link href="/home"> home</Link>
        <Text> list </Text>
      </View>
    )
  }


export default list;
