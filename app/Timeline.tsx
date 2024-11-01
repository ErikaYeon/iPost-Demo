import React from 'react';
import { View, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import Post from '../ui/components/Post';
import { mockData } from '../assets/mockData';
import { darkTheme } from '../ui/styles/Theme';

const Timeline = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.listContainer}
          data={mockData}
          renderItem={({ item }) => (
            <Post
              profilePictureUrl={item.profilePictureUrl}
              name={item.name}
              username={item.username}
              description={item.description}
              location={item.location}
              date={item.date}
              images={item.images}
              likes={item.likes}
              comments={item.comments}
              isVip={item.isVip}
              crownType={item.crownType}
              commentSection={item.commentSection}
              onLike={() => console.log('Liked post ' + item.id)}
              onComment={() => console.log('Commented on post ' + item.id)}
              onSave={() => console.log('Saved post ' + item.id)}
              theme={darkTheme}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: darkTheme.colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  listContainer: {
    paddingBottom: 20,
  },
});

export default Timeline;
