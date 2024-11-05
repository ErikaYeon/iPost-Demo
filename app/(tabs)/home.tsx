import React from 'react'; 
import { SafeAreaView, FlatList, StatusBar, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Post from '@/ui/components/Post';
import { darkTheme } from '../../ui/styles/Theme';
import { mockData } from '@/assets/mockData';
import InitialMessage from '../../ui/components/InitialMessage';
import createSharedStyles from '../../ui/styles/SharedStyles';
import { styles } from '../../ui/styles/LogIn';
import { useSelector, useDispatch, } from 'react-redux';
import { RootState } from '../../redux/store';

const home = () => {
  const theme = darkTheme;
  const sharedStyles = createSharedStyles(theme);

  const newPost = useSelector((state: RootState) => state.createPost);
  const userProfile = useSelector((state: RootState) => state.profile);
  const postList = [...mockData];

  console.log('New Post Data:', newPost);
  console.log('User Profile Data:', userProfile);


  if (newPost.postContent) {
    postList.unshift({
      id: '4', // Assign a unique ID for the new post
      profilePictureUrl: userProfile.profilePictureUrl,
      name:  userProfile.name,  
      username: userProfile.username,
      description: newPost.postContent,
      location: newPost.location,
      date: newPost.date, 
      images: newPost.selectedImages,
      likes: newPost.likes,
      comments: newPost.comments,
      isVip: userProfile.isVip,
      crownType: userProfile.crownType,
      commentSection: newPost.commentSection,
    });
  }

  return (
    <SafeAreaView style={[stylesLocal.screenContainer, { paddingTop: StatusBar.currentHeight || 0, backgroundColor: theme.colors.background }]}>
      {postList.length === 0 ? (
        <InitialMessage theme={theme} />
      ) : (
        <FlatList
          contentContainerStyle={stylesLocal.listContainer}
          data={postList}
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
              theme={theme}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </SafeAreaView>
  );
};

const stylesLocal = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: darkTheme.colors.background,
  },
  listContainer: {
    paddingBottom: 20,
  },
});

export default home;
