import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Para iconos como "like", "comentario", "guardar"
import { lightTheme, darkTheme } from '../styles/Theme';


interface PostProps {
  profilePicture: string;
  name: string;
  username: string;
  description: string;
  location?: string;
  date: string;
  images?: string[];  // Lista de URLs de imágenes (para carrusel)
  onLike: () => void;
  onComment: () => void;
  onSave: () => void;
  likes: number;
  comments: number;
  theme: any;
}

const Post: React.FC<PostProps> = ({
  profilePicture,
  name,
  username,
  description,
  location,
  date,
  images = [],
  onLike,
  onComment,
  onSave,
  likes,
  comments,
  theme,
}) => {

  return (
    <View style={[styles.postContainer, { backgroundColor: theme.colors.backgroundColor }]}>

      {/* Encabezado del Post */}
      <View style={styles.header}>
        <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
        <View style={styles.userInfo}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.username}>@{username}</Text>
        </View>
      </View>

      {/* Descripción del Post */}
      <Text style={styles.description}>{description}</Text>

      {/* Ubicación y Fecha */}
      <View style={styles.locationDateContainer}>
        {location && <Text style={styles.location}>{location}</Text>}
        <Text style={styles.date}>{date}</Text>
      </View>

      {/* Carrusel de Imágenes */}
      {images.length > 0 && (
        <FlatList
          data={images}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.postImage} />
          )}
          showsHorizontalScrollIndicator={false}
        />
      )}

      {/* Botones de Interacción */}
      <View style={styles.interactionContainer}>
        <View style={styles.leftInteraction}>
          <TouchableOpacity onPress={onLike} style={styles.iconButton}>
            <FontAwesome name="heart-o" size={20} color="black" />
            <Text style={styles.counter}>{likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onComment} style={styles.iconButton}>
            <FontAwesome name="comment-o" size={20} color="black" />
            <Text style={styles.counter}>{comments}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={onSave} style={styles.iconButton}>
          <FontAwesome name="bookmark-o" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    postContainer: {
        marginBottom: 7, // Añade margen inferior para espaciar los posts
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
        width: 370,
        height: 200,
      },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userInfo: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 14,
    color: 'gray',
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
  },
  locationDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  location: {
    fontSize: 13,
    color: 'gray',
  },
  date: {
    fontSize: 13,
    color: 'gray',
  },
  postImage: {
    width: 300,
    height: 200,
    borderRadius: 8,
    marginRight: 10,
  },
  interactionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  leftInteraction: {
    flexDirection: 'row',
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  counter: {
    marginLeft: 5,
    fontSize: 14,
  },
});

export default Post;