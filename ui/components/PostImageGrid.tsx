import React from "react";
import { View, Image, StyleSheet, TouchableOpacity, Dimensions, FlatList } from "react-native";

type PostImageGridProps = {
  posts: {
    id: string;
    uri: string;
    user: string;
    description: string;
    isVideo: boolean;
  }[];
  onPressImage: (postId: string) => void; // Función para manejar el evento al presionar
};

const PostImageGrid: React.FC<PostImageGridProps> = ({ posts, onPressImage  }) => {
  const screenWidth = Dimensions.get("window").width; // Obtener el ancho de la pantalla
  const imageWidth = screenWidth / 3; // Dividir la pantalla en 3 columnas

  const renderPostItem = ({ item }: { item: PostImageGridProps["posts"][0] }) => (
    <TouchableOpacity
      key={item.id}
      style={{ width: imageWidth, height: imageWidth }}
      onPress={() => onPressImage(item.id)} // Llamada a la función con el ID del post
    >
      <Image source={{ uri: item.uri }} style={styles.image} />
      {item.isVideo && (
        <View style={styles.videoIconContainer}>
          <View style={styles.videoCircle}>
            <View style={styles.videoTriangle} />
          </View>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={posts}
      renderItem={renderPostItem}
      keyExtractor={(item) => item.id}
      numColumns={3} // Tres columnas
      showsVerticalScrollIndicator={false} // Esconde el indicador de scroll
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
  videoIconContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -20 }, { translateY: -20 }],
    justifyContent: "center",
    alignItems: "center",
  },
  videoCircle: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  videoTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderLeftColor: "white",
    borderTopWidth: 8,
    borderTopColor: "transparent",
    borderBottomWidth: 8,
    borderBottomColor: "transparent",
  },
});

export default PostImageGrid;