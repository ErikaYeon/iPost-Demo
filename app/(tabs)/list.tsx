import React from 'react';
import { Text, View } from 'react-native';
import { Link } from 'expo-router';

const List = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10 }}>
            <Link href="/Welcome">
                <Text>welcome</Text>
            </Link>
            <Link href="../LogIn">
                <Text>log in</Text>
            </Link>
            <Link href="../CreatePost">
                <Text>create post</Text> {/* Borrar después */}
            </Link>
            <Link href="../AddLocation">
                <Text>add location </Text> {/* Borrar después */}
            </Link>
            <Link href="/home">
                <Text>home</Text>
            </Link>
            <Text>list</Text>
        </View>
    );
}

export default List;


/* Borrar después */
