// Post.tsx
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Share,
  StyleSheet,
  Dimensions,
  Linking,
} from "react-native";
import Modal from "react-native-modal";
import { Modal as NativeModal } from "react-native"; // Usa Modal nativo para el modal de imagen completa
import AsyncStorage from "@react-native-async-storage/async-storage";
import LikeIcon from "../../assets/images/icons/like.svg";
import LikeColoredIcon from "../../assets/images/icons/like_colored.svg";
import CommentIcon from "../../assets/images/icons/comment.svg";
import ShareIcon from "../../assets/images/icons/share.svg";
import SaveIcon from "../../assets/images/icons/save.svg";
import SaveColoredIcon from "../../assets/images/icons/saved.svg";
import SendCommentIcon from "../../assets/images/icons/send_comment.svg";
import CrownGrey from "../../assets/images/icons/gamif_crown_0_1.svg";
import CrownBronze from "../../assets/images/icons/gamif_crown_1.svg";
import CrownSilver from "../../assets/images/icons/gamif_crown_2.svg";
import CrownGold from "../../assets/images/icons/gamif_crown_3.svg";
import { likePost, unlikePost } from "@/networking/postService";
import styles from "../../ui/styles/PostStyles";
import { Crown } from "@/types/models";
// import Clipboard from '@react-native-clipboard/clipboard';
import * as Clipboard from "expo-clipboard";
import { Video, ResizeMode } from "expo-av";
import Placeholders from "@/constants/ProfilePlaceholders";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  addCommentToList,
  postComments,
  fetchCommentsByPostId,
} from "@/redux/slices/commentsSlice";
import { commentType1 } from "@/types/apiContracts";
import { levelToCrown } from "@/types/mappers";

type PostProps = {
  profilePictureUrl: string;
  name: string;
  username: string;
  description: string;
  location?: string;
  date: string;
  images: { uri: string; type: string }[];
  initialLikes: number;
  comments: number;
  isVip?: boolean;
  crownType: Crown;
  // commentSection?: CommentType[];
  commentSection?: commentType1[];
  onLike: () => void;
  onComment: () => void;
  onSave: () => void;
  postId: string;
  userId: string;
  theme: any;
  isLikedByUser: boolean;
  isAd: boolean;
};

const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
}; //PARA QUE DESPUES DE CIERTA CANT DE CARACTERES APAREZCAN 3 PUNTOS Y NO SE IMPRIMA TODO

const truncateDate = (formattedDate: string) => {
  const date = new Date(formattedDate); // Convertir la cadena a un objeto Date

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date provided"); // Manejo de error si la fecha es inválida
  }

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString().slice(-2); // Obtener los últimos dos dígitos del año

  return `${day}/${month}/${year}`;
};

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
  crownType,
  onLike,
  onComment,
  onSave,
  initialLikes,
  comments,
  isLikedByUser,
  postId,
  userId,
  theme,
  isAd,
}) => {
  const [isLiked, setIsLiked] = useState(isLikedByUser);
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [isSaved, setIsSaved] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [commentsList, setCommentsList] = useState(commentSection);
  const [newComment, setNewComment] = useState("");
  const [commentsCount, setCommentsCount] = useState(comments);
  const userProfile = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch<AppDispatch>();
  const ListaReduxComments = useSelector(
    (state: RootState) => state.comments.comments
  );
  const { isLoading } = useSelector((state: RootState) => state.comments);
  const [isImageModalVisible, setImageModalVisible] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);

  const openImageModal = (uri: string) => {
    setSelectedImageUri(uri);
    setImageModalVisible(true);
  };

  const closeImageModal = () => {
    setSelectedImageUri(null);
    setImageModalVisible(false);
  };

  const [playingVideos, setPlayingVideos] = useState<{
    [key: string]: boolean;
  }>({});
  const videoRef = useRef<Video>(null); // Referencia al componente de video

  useEffect(() => {
    const checkIfLiked = async () => {
      try {
        const isLikedValue = await AsyncStorage.getItem(
          `like_${postId}_${userId}`
        );
        setIsLiked(isLikedValue === "true");
      } catch (error) {
        console.error("Error al recuperar el estado de like:", error);
      }
    };

    checkIfLiked();
  }, [postId, userId]);

  const renderCrownIcon = (type: Crown) => {
    switch (type) {
      case Crown.GREY:
        return <CrownGrey width={20} height={20} style={styles.crownIcon} />;
      case Crown.BRONCE:
        return <CrownBronze width={20} height={20} style={styles.crownIcon} />;
      case Crown.SILVER:
        return <CrownSilver width={20} height={20} style={styles.crownIcon} />;
      case Crown.GOLD:
        return <CrownGold width={20} height={20} style={styles.crownIcon} />;
      default:
        return null;
    }
  };

  const toggleLike = async () => {
    try {
      if (isLiked) {
        await unlikePost(postId, userId);
        setLikeCount((prev) => prev - 1);
        await AsyncStorage.removeItem(`like_${postId}_${userId}`);
      } else {
        await likePost(postId, userId);
        setLikeCount((prev) => prev + 1);
        await AsyncStorage.setItem(`like_${postId}_${userId}`, "true");
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error al cambiar el estado de like:", error);
    }
  };

  const toggleSave = () => {
    setIsSaved(!isSaved);
    onSave();
  };

  const openModal = async () => {
    await dispatch(fetchCommentsByPostId(postId));
    setModalVisible(true);
    console.log("lista de redux" + ListaReduxComments);
  };

  const closeModal = () => setModalVisible(false);

  function generarNumeroRandom() {
    return Math.floor(Math.random() * 900) + 100;
  }

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentData: commentType1 = {
        id: generarNumeroRandom().toString(),
        content: newComment,
        createAt: new Date().toISOString(),
        author: {
          name: userProfile.name ?? "@your_username",
          nickname: userProfile.username ?? "",
          lastname: userProfile.lastname ?? "",
          id: userProfile.id,
          profileImage:
            userProfile.profileImage ?? Placeholders.DEFAULT_PROFILE_PHOTO,
          level: 1,
          active: true,
        },
      };

      setCommentsCount((prevComments) => prevComments + 1);

      setNewComment("");
      dispatch(
        postComments({
          comment: newComment,
          authorId: userProfile.id,
          postId: postId,
        })
      );
    }
  };

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: description,
        url: description,
      });
      return result;
    } catch (error) {
      Alert.alert("Error al compartir");
    }
  };

  // Alternar el estado de un video específico
  const togglePlayPause = async (videoId: string) => {
    if (videoRef.current) {
      if (playingVideos[videoId]) {
        await videoRef.current.pauseAsync();
      } else {
        await videoRef.current.playAsync();
      }
      setPlayingVideos((prev) => ({
        ...prev,
        [videoId]: !prev[videoId],
      }));
    }
  };

  return (
    <View
      style={[
        styles.postContainer,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <View style={styles.headerHeader}>
        <View style={styles.header}>
          <Image
            source={{ uri: profilePictureUrl }}
            style={styles.profilePicture}
          />
          <View style={styles.userInfo}>
            <View style={styles.nameContainer}>
              {!isAd && renderCrownIcon(crownType)}
              <Text style={[styles.name, { color: theme.colors.textPrimary }]}>
                {name}
              </Text>
            </View>
            <Text
              style={[styles.username, { color: theme.colors.textSecondary }]}
            >
              {isAd ? "Patrocinado" : username}
            </Text>
          </View>
        </View>
        {isAd && (
          <TouchableOpacity onPress={handleShare} style={styles.iconButton}>
            <ShareIcon width={20} height={20} />
          </TouchableOpacity>
        )}
      </View>

      <Text style={[styles.description, { color: theme.colors.textPrimary }]}>
        {isAd ? (
          <Text
            style={styles.link}
            onPress={() => Linking.openURL(description)} // Abre el enlace en el navegador
          >
            visitar sitio
          </Text>
        ) : (
          description
        )}
      </Text>

      <View style={styles.locationDateContainer}>
        {location && (
          <Text
            style={[styles.location, { color: theme.colors.textSecondary }]}
          >
            {truncateText(location, 30)}
          </Text>
        )}
        <Text style={[styles.date, { color: theme.colors.textSecondary }]}>
          {truncateDate(date)}
        </Text>
      </View>

      {images.length === 1 ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {images[0].type === "image" ? (
            <Image source={{ uri: images[0].uri }} style={styles.singlePostImage} />
          ) : (
            <View style={{ position: "relative" }}>
              <Video
                ref={videoRef}
                source={{ uri: images[0].uri }}
                style={styles.singlePostImage}
                resizeMode={ResizeMode.COVER}
                isLooping
                shouldPlay={false} // El video estará pausado al cargar
              />
              <TouchableOpacity
                style={styles.playPauseButton}
                onPress={() => togglePlayPause(images[0].uri)}
              >
                {playingVideos[images[0].uri] ? (
                  <View style={styles.pauseIcon}>
                    <View style={styles.pauseBar} />
                    <View style={styles.pauseBar} />
                  </View>
                ) : (
                  <View style={styles.playIcon} />
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>
      ) : (
        <FlatList
          data={images}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View>
              {item.type === "image" ? (
                <TouchableOpacity onPress={() => openImageModal(item.uri)}>
                  <Image source={{ uri: item.uri }} style={styles.postImage} />
                </TouchableOpacity>
              ) : (
                <View style={{ position: "relative" }}>
                  <Video
                    ref={videoRef}
                    source={{ uri: item.uri }}
                    style={styles.postImage}
                    resizeMode={ResizeMode.COVER}
                    isLooping
                  />
                  <TouchableOpacity
                    style={styles.playPauseButton}
                    onPress={() => togglePlayPause(item.uri)}
                  >
                    {playingVideos[item.uri] ? (
                      <View style={styles.pauseIcon}>
                        <View style={styles.pauseBar} />
                        <View style={styles.pauseBar} />
                      </View>
                    ) : (
                      <View style={styles.playIcon} />
                    )}
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          snapToAlignment="start"
          decelerationRate="fast"
        />
      )}

      {selectedImageUri && (
        <NativeModal
          visible={isImageModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={closeImageModal}
        >
          <View style={modalStyles.modalBackground}>
            <TouchableOpacity
              onPress={closeImageModal}
              style={modalStyles.modalCloseButtonContainer}
            >
              <Text style={modalStyles.modalCloseButtonText}>Cerrar</Text>
            </TouchableOpacity>
            <Image
              source={{ uri: selectedImageUri }}
              style={modalStyles.fullscreenImage}
            />
          </View>
        </NativeModal>
      )}

      {!isAd && (
        <View style={styles.interactionContainer}>
          <View style={styles.leftInteraction}>
            <TouchableOpacity onPress={toggleLike} style={styles.iconButton}>
              {isLiked ? (
                <LikeColoredIcon width={20} height={20} />
              ) : (
                <LikeIcon width={20} height={20} />
              )}
              <Text
                style={[styles.counter, { color: theme.colors.textPrimary }]}
              >
                {likeCount}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={openModal} style={styles.iconButton}>
              <CommentIcon width={20} height={20} />
              <Text
                style={[styles.counter, { color: theme.colors.textPrimary }]}
              >
                {commentsCount}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={toggleSave} style={styles.iconButton}>
            {isSaved ? (
              <SaveColoredIcon width={19} height={19} />
            ) : (
              <SaveIcon width={20} height={20} />
            )}
          </TouchableOpacity>
        </View>
      )}

      {!isLoading && !isAd && (
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={closeModal}
          onSwipeComplete={closeModal}
          swipeDirection="down"
          style={styles.modal}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={[
              styles.modalContent,
              { backgroundColor: theme.colors.background },
            ]}
          >
            {ListaReduxComments.length > 0 && (
              <FlatList
                data={ListaReduxComments}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.commentContainer}>
                    <View style={styles.commentTextContainer}>
                      <View style={styles.commentHeader}>
                        {renderCrownIcon(levelToCrown(item.author.level))}
                        <Text
                          style={[
                            styles.commentUsername,
                            { color: theme.colors.textPrimary },
                          ]}
                        >
                          {item.author.name}
                        </Text>
                      </View>
                      <Text
                        style={[
                          styles.commentText,
                          { color: theme.colors.textSecondary },
                        ]}
                      >
                        {item.content}
                      </Text>
                    </View>
                  </View>
                )}
              />
            )}

            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, { color: theme.colors.textPrimary }]}
                placeholder="Agrega un comentario..."
                placeholderTextColor={theme.colors.textSecondary}
                value={newComment}
                onChangeText={setNewComment}
              />
              <TouchableOpacity
                style={styles.sendButton}
                onPress={handleAddComment}
              >
                <SendCommentIcon
                  width={24}
                  height={24}
                  fill={theme.colors.primary}
                />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      )}

      <View
        style={[
          styles.divider,
          { backgroundColor: theme.colors.textSecondary },
        ]}
      />
    </View>
  );
};

const modalStyles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  fullscreenImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  modalCloseButtonContainer: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 10,
  },
  modalCloseButtonText: {
    color: "white",
    fontSize: 18,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
});

export default Post;
