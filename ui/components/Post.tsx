import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import LikeIcon from '../../assets/images/icons/like.svg';
import CommentIcon from '../../assets/images/icons/comment.svg';
import SaveIcon from '../../assets/images/icons/save.svg';
import CrownGrey from '../../assets/images/icons/gamif_crown_0_1.svg';
import CrownBronze from '../../assets/images/icons/gamif_crown_1.svg';
import CrownSilver from '../../assets/images/icons/gamif_crown_2.svg';
import CrownGold from '../../assets/images/icons/gamif_crown_3.svg';
import Comment from '../../ui/components/Comment';

type CommentType = {
  id: string;
  username: string;
  text: string;
  profilePictureUrl: string;
};

type PostProps = {
  profilePictureUrl: string;
  name: string;
  username: string;
  description: string;
  location?: string;
  date: string;
  images: string[];
  likes: number;
  comments: number;
  isVip?: boolean;
  crownType?: string;
  commentSection?: CommentType[];
  onLike: () => void;
  onComment: () => void;
  onSave: () => void;
  theme: any;
};
const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
}; //PARA QUE DESPUES DE CIERTA CANT DE CARACTERES APAREZCAN 3 PUNTOS Y NO SE IMPRIMA TODO

const Post: React.FC<PostProps> = ({
  profilePictureUrl,
  name,
  username,
  description,
  location,
  date,
  images = [],
  commentSection = [],
  isVip = false,
  crownType = 'grey',
  onLike,
  onComment,
  onSave,
  likes,
  comments,
  theme,
}) => {
  const renderCrownIcon = (type: string) => {
    switch (type) {
      case 'grey':
        return <CrownGrey width={20} height={20} style={styles.crownIcon} />;
      case 'bronze':
        return <CrownBronze width={20} height={20} style={styles.crownIcon} />;
      case 'silver':
        return <CrownSilver width={20} height={20} style={styles.crownIcon} />;
      case 'gold':
        return <CrownGold width={20} height={20} style={styles.crownIcon} />;
      default:
        return <></>;
    }
  };

  return (
    <View style={[styles.postContainer, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Image source={{ uri: profilePictureUrl }} style={styles.profilePicture} />
        <View style={styles.userInfo}>
          <View style={styles.nameContainer}>
            {isVip && renderCrownIcon(crownType)}
            <Text style={[styles.name, { color: theme.colors.textPrimary }]}>{name}</Text>
          </View>
          <Text style={[styles.username, { color: theme.colors.textSecondary }]}>{username}</Text>
        </View>
      </View>
      <Text style={[styles.description, { color: theme.colors.textPrimary }]}>{description}</Text>
      <View style={styles.locationDateContainer}>
      {location && (
          <Text style={[styles.location, { color: theme.colors.textSecondary }]}>
            {truncateText(location, 35)} {/* Cambia 20 por el número máximo de caracteres que prefieras */}
          </Text>
        )}
        <Text style={[styles.date, { color: theme.colors.textSecondary }]}>{date}</Text>
      </View>

      {images.length > 0 && (
        <FlatList
          data={images}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Image source={{ uri: item }} style={styles.postImage} />}
          showsHorizontalScrollIndicator={false}
        />
      )}

      <View style={styles.interactionContainer}>
        <View style={styles.leftInteraction}>
          <TouchableOpacity onPress={onLike} style={styles.iconButton}>
            <LikeIcon width={20} height={20} />
            <Text style={[styles.counter, { color: theme.colors.textPrimary }]}>{likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onComment} style={styles.iconButton}>
            <CommentIcon width={20} height={20} />
            <Text style={[styles.counter, { color: theme.colors.textPrimary }]}>{comments}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={onSave} style={styles.iconButton}>
          <SaveIcon width={20} height={20} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={commentSection}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Comment
            profilePictureUrl={item.profilePictureUrl}
            username={item.username}
            text={item.text}
            theme={theme}
          />
        )}
        style={styles.commentSection}
      />

      <View style={[styles.divider, { backgroundColor: theme.colors.textSecondary }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    marginBottom: 15,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  profilePicture: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 10,
  },
  userInfo: {
    justifyContent: 'center',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  crownIcon: {
    marginRight: 5,
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 15,
  },
  description: {
    fontSize: 18,
    marginVertical: 5,
  },
  locationDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  location: {
    fontSize: 15,
    fontStyle: 'italic',
  },
  date: {
    fontSize: 15,
  },
  postImage: {
    width: 300,
    height: 300,
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
  commentSection: {
    marginVertical: 20,
  },
  divider: {
    height: 1,
    alignSelf: 'stretch',
    marginTop: 10,
  },
});

export default Post;
