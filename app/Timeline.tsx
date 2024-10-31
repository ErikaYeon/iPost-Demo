import React from 'react';
import { View, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import Post from '@/ui/components/Post';
import { Image } from 'react-native';
import { styles } from '../ui/styles/Home';
import { mockData } from '@/assets/mockData';

  

const Timeline: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.listContainer}
          data={mockData}
          renderItem={({ item }) => (
            <Post
              profilePicture={item.profilePicture}
              name={item.name}
              username={item.username}
              description={item.description}
              location={item.location}
              date={item.date}
              images={item.images}
              likes={item.likes}
              comments={item.comments}
              onLike={() => console.log('Liked post ' + item.id)}
              onComment={() => console.log('Commented on post ' + item.id)}
              onSave={() => console.log('Saved post ' + item.id)}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};


export default Timeline;
