import React from 'react'; 
import { SafeAreaView, FlatList, StatusBar, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Post from '@/ui/components/Post';
import { darkTheme } from '../../ui/styles/Theme';
import { mockData } from '@/assets/mockData';
import InitialMessage from '../../ui/components/InitialMessage';
import createSharedStyles from '../../ui/styles/SharedStyles';
import { styles } from '../../ui/styles/LogIn';

const home = () => {
  const theme = darkTheme;
  const sharedStyles = createSharedStyles(theme);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={[stylesLocal.screenContainer, { paddingTop: StatusBar.currentHeight || 0, backgroundColor: theme.colors.background }]}>
        {mockData.length === 0 ? (
          <InitialMessage />
        ) : (
          <FlatList
            contentContainerStyle={stylesLocal.listContainer}
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
                theme={theme}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
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
