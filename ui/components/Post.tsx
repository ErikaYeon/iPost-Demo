// Post.tsx
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import Modal from 'react-native-modal';
import LikeIcon from '../../assets/images/icons/like.svg';
import LikeColoredIcon from '../../assets/images/icons/like_colored.svg';
import CommentIcon from '../../assets/images/icons/comment.svg';
import SaveIcon from '../../assets/images/icons/save.svg';
import SaveColoredIcon from '../../assets/images/icons/save_colored.svg';
import SendCommentIcon from '../../assets/images/icons/send_comment.svg';
import CrownGrey from '../../assets/images/icons/gamif_crown_0_1.svg';
import CrownBronze from '../../assets/images/icons/gamif_crown_1.svg';
import CrownSilver from '../../assets/images/icons/gamif_crown_2.svg';
import CrownGold from '../../assets/images/icons/gamif_crown_3.svg';
import styles from '../../ui/styles/PostStyles'; 
// import {  setLike } from '../../redux/slices/createPostSlice';
// import { useDispatch,  useSelector } from 'react-redux';
// import { RootState } from '../../redux/store';

type CommentType = {
  id: string;
  username: string;
  text: string;
  profilePictureUrl: string;
  isVip?: boolean;
  crownType: string;
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
  crownType: string;
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
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [commentsList, setCommentsList] = useState(commentSection);
  const [newComment, setNewComment] = useState('');
  // const dispatch = useDispatch();
  // const like = useSelector((state: RootState) => state.createPost.likes);

  
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
        return null;
    }
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    // dispatch(setLike(likes));
    onLike();
    // console.log(like)
  };
  const toggleSave = () => {
    setIsSaved(!isSaved);
    onSave();
  };

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentData = {
        id: (commentsList.length + 1).toString(),
        username: '@your_username',
        text: newComment,
        profilePictureUrl: 'https://your-profile-picture-url.com',
        isVip: false,
        crownType: 'grey',
      };
      setCommentsList([...commentsList, newCommentData]);
      setNewComment('');
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
          <TouchableOpacity onPress={toggleLike} style={styles.iconButton}>
            {isLiked ? (
              <LikeColoredIcon width={20} height={20} />
            ) : (
              <LikeIcon width={20} height={20} />
            )}
            <Text style={[styles.counter, { color: theme.colors.textPrimary }]}>{likes + (isLiked ? 1 : 0)}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={openModal} style={styles.iconButton}>
            <CommentIcon width={20} height={20} />
            <Text style={[styles.counter, { color: theme.colors.textPrimary }]}>{commentsList.length}</Text>
          </TouchableOpacity>
        </View>
          <TouchableOpacity onPress={toggleSave} style={styles.iconButton}>
            {isSaved ? (
              <SaveColoredIcon width={20} height={20} />
            ) : (
              <SaveIcon width={20} height={20} />
            )}
          </TouchableOpacity>
      </View>

      {commentsList.length > 0 && (
        <>
          <TouchableOpacity onPress={openModal} style={styles.viewAllCommentsButton}>
            <Text style={[styles.viewAllCommentsText, { color: theme.colors.secondary }]}>Ver todos los comentarios</Text>
          </TouchableOpacity>

          <View style={styles.firstCommentContainer}>
            <Text style={{ color: theme.colors.textPrimary }}>
              <Text style={styles.commentUsername}>{commentsList[0].username} </Text>
              <Text>{commentsList[0].text}</Text>
            </Text>
          </View>
        </>
      )}

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={closeModal}
        onSwipeComplete={closeModal}
        swipeDirection="down"
        style={styles.modal}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={[styles.modalContent, { backgroundColor: theme.colors.background }]}
        >
          <FlatList
            data={commentsList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.commentContainer}>
                <Image source={{ uri: item.profilePictureUrl }} style={styles.commentProfilePicture} />
                <View style={styles.commentTextContainer}>
                  <View style={styles.commentHeader}>
                    {item.isVip && renderCrownIcon(item.crownType)}
                    <Text style={[styles.commentUsername, { color: theme.colors.textPrimary }]}>{item.username}</Text>
                  </View>
                  <Text style={[styles.commentText, { color: theme.colors.textSecondary }]}>{item.text}</Text>
                </View>
              </View>
            )}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, { color: theme.colors.textPrimary }]}
              placeholder="Agrega un comentario..."
              placeholderTextColor={theme.colors.textSecondary}
              value={newComment}
              onChangeText={setNewComment}
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleAddComment}>
              <SendCommentIcon width={24} height={24} fill={theme.colors.primary} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <View style={[styles.divider, { backgroundColor: theme.colors.textSecondary }]} />
    </View>
  );
};

export default Post;
