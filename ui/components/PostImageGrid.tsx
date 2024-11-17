import React from "react";
import { View, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;
const imageSize = screenWidth / 3 - 1; // Ajustar para reducir el margen entre imágenes

type Post = {
  id: string;
  uri: string;
  user: string;
  description: string;
};

type PostImageGridProps = {
  posts: Post[];
};

const PostImageGrid: React.FC<PostImageGridProps> = ({ posts }) => {
  const navigation = useNavigation();

  const handlePress = (post: Post) => {
    navigation.navigate("PostDetail", {
      uri: post.uri,
      user: post.user,
      description: post.description,
    });
  };

  const renderItem = ({ item }: { item: Post }) => (
    <TouchableOpacity onPress={() => handlePress(item)} style={styles.imageContainer}>
      <Image source={{ uri: item.uri }} style={styles.postImage} />
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      numColumns={3}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.grid}
    />
  );
};

const styles = StyleSheet.create({
  grid: {
    flexGrow: 1,
    paddingHorizontal: 0, // Eliminar el padding horizontal
  },
  imageContainer: {
    width: imageSize,
    height: imageSize,
    margin: 0.5, // Reducir el margen entre imágenes
  },
  postImage: {
    width: "100%",
    height: "100%",
    borderRadius: 2,
  },
});

export default PostImageGrid;
