import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Comment = ({ profilePictureUrl, username, text, theme }) => {
  return (
    <View style={styles.commentContainer}>
      <Image source={{ uri: profilePictureUrl }} style={styles.commentProfilePicture} />
      <View style={styles.commentTextContainer}>
        <Text style={[styles.commentUsername, { color: theme.colors.textPrimary }]}>{username}</Text>
        <Text style={[styles.commentText, { color: theme.colors.textSecondary }]}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  commentProfilePicture: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  commentTextContainer: {
    flexShrink: 1,
  },
  commentUsername: {
    fontWeight: 'bold',
  },
  commentText: {
    flexShrink: 1,
  },
});

export default Comment;
