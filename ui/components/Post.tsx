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
import { darkTheme, lightTheme } from "@/ui/styles/Theme";
import { Modal as NativeModal } from "react-native"; // Usa Modal nativo para el modal de imagen completa
import AsyncStorage from "@react-native-async-storage/async-storage";
import LikeIconDark from "../../assets/images/icons/like.svg";
import LikeIconLight from "../../assets/images/icons/like_darkMode.svg";
import LikeColoredIcon from "../../assets/images/icons/like_colored.svg";
import CommentIconDark from "../../assets/images/icons/comment.svg";
import CommentIconLight from "../../assets/images/icons/comment_darkMode.svg";
import ShareIconDark from "../../assets/images/icons/share.svg";
import ShareIconLight from "../../assets/images/icons/share_darkMode.svg";
import SaveIconDark from "../../assets/images/icons/save.svg";
import SaveIconLight from "../../assets/images/icons/save_darkMode.svg";
import SaveColoredIconDark from "../../assets/images/icons/saved.svg";
import SaveColoredIconLight from "../../assets/images/icons/saved_darkMode.svg";
import SendCommentIconDark from "../../assets/images/icons/send_comment.svg";
import SendCommentIconLight from "../../assets/images/icons/send_comment_darkMode.svg";
import CrownGrey from "../../assets/images/icons/gamif_crown_0_1.svg";
import CrownBronze from "../../assets/images/icons/gamif_crown_1.svg";
import CrownSilver from "../../assets/images/icons/gamif_crown_2.svg";
import CrownGold from "../../assets/images/icons/gamif_crown_3.svg";
import MultiPhotosIcon from "../../assets/images/icons/multi_photos.svg";
import { likePost, unlikePost } from "@/networking/postService";
import createPostStyles from "../../ui/styles/PostStyles";
import { Crown } from "@/types/models";
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
import {
  favoritePostAsync,
  unfavoritePostAsync,
} from "@/redux/slices/postSlice";
import { useTranslation } from "react-i18next";

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
  isSavedByUser: boolean;
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
  isSavedByUser,
  postId,
  userId,
  isAd,
}) => {
  const [isLiked, setIsLiked] = useState(isLikedByUser);
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [isSaved, setIsSaved] = useState(isSavedByUser);
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
  const { t, i18n } = useTranslation("translations");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const flatListRef = useRef<FlatList>(null);

  const themeMode = useSelector((state: RootState) => state.profile.theme);
  const theme = themeMode === "dark" ? darkTheme : lightTheme;
  const styles = createPostStyles(theme);

  const videoRefs = useRef<{ [key: string]: Video | null }>({});
  const fullscreenVideoRef = useRef<Video | null>(null);

  useEffect(() => {
    return () => {
      videoRefs.current = {}; // Limpia todas las referencias de videos en la vista normal
      fullscreenVideoRef.current = null; // Limpia la referencia del video en pantalla completa
    };
  }, []);

  const [playingVideos, setPlayingVideos] = useState<{
    [key: string]: boolean;
  }>({});

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

  const toggleSave = async () => {
    try {
      if (isSaved) {
        // Si está guardado, quítalo de favoritos
        await dispatch(unfavoritePostAsync({ postId, userId: userProfile.id }));
        await AsyncStorage.removeItem(`favorite_${postId}_${userProfile.id}`);
      } else {
        // Si no está guardado, agrégalo a favoritos
        await dispatch(favoritePostAsync({ postId, userId: userProfile.id }));
        await AsyncStorage.setItem(
          `favorite_${postId}_${userProfile.id}`,
          "true"
        );
      }
      setIsSaved(!isSaved); // Cambia el estado local
      onSave();
    } catch (error) {
      console.error("Error al cambiar el estado de favorito:", error);
    }
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
      Alert.alert(i18n.t("error.share"));
    }
  };

  // Alternar el estado de un video específico
  const togglePlayPause = async (videoId: string, isFullscreen = false) => {
    try {
      const ref = isFullscreen
        ? fullscreenVideoRef.current // Video en pantalla completa
        : videoRefs.current[videoId]; // Video en la vista normal

      if (ref) {
        if (playingVideos[videoId]) {
          await ref.pauseAsync();
        } else {
          await ref.playAsync();
        }
        setPlayingVideos((prev) => ({
          ...prev,
          [videoId]: !prev[videoId],
        }));
      } else {
        console.error("Referencia del video no encontrada para:", videoId);
      }
    } catch (error) {
      console.error("Error al alternar el estado de reproducción:", error);
    }
  };

  const openImageModal = (uri: string, index: number) => {
    setSelectedImageUri(uri);
    setSelectedImageIndex(index);
    if (videoRefs.current[uri]) {
      fullscreenVideoRef.current = videoRefs.current[uri];
    }
    setImageModalVisible(true);
  };

  const closeImageModal = async () => {
    if (fullscreenVideoRef.current) {
      await fullscreenVideoRef.current.pauseAsync();
    }
    fullscreenVideoRef.current = null;
    setSelectedImageUri(null);
    setImageModalVisible(false);
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
              {isAd ? i18n.t("post.sponsored") : username}
            </Text>
          </View>
        </View>
        {isAd && (
          <TouchableOpacity onPress={handleShare} style={styles.iconButton}>
            <ShareIconDark width={20} height={20} />
          </TouchableOpacity>
        )}
      </View>

      <Text style={[styles.description, { color: theme.colors.textPrimary }]}>
        {isAd ? (
          <Text
            style={styles.link}
            onPress={() => Linking.openURL(description)} // Abre el enlace en el navegador
          >
            {i18n.t("post.visitSite")}
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
        <TouchableOpacity onPress={() => openImageModal(images[0].uri)}>
          {images[0].type === "image" ? (
            <Image
              source={{ uri: images[0].uri }}
              style={styles.singlePostImage}
            />
          ) : (
            <View style={{ position: "relative" }}>
              <Video
                ref={(ref) => {
                  if (ref) {
                    videoRefs.current[images[0].uri] = ref; // Sincroniza la referencia del video único
                  }
                }}
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
        </TouchableOpacity>
      ) : (
        <FlatList
          data={images}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => openImageModal(item.uri, index)}>
              <View style={{ position: "relative" }}>
                {item.type === "image" ? (
                  <Image source={{ uri: item.uri }} style={styles.postImage} />
                ) : (
                  <View style={{ position: "relative" }}>
                    <Video
                      ref={(ref) => {
                        videoRefs.current[item.uri] = ref; // Almacena la referencia en videoRefs
                      }}
                      source={{ uri: item.uri }}
                      style={styles.postImage}
                      resizeMode={ResizeMode.COVER}
                      isLooping
                    />
                    <TouchableOpacity
                      style={styles.playPauseButton}
                      onPress={() => togglePlayPause(item.uri, false)}
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
                {/* Mostrar el ícono de múltiples fotos */}
                {images.length > 1 && (
                  <View style={modalStyles.multiPhotosIconContainer}>
                    <MultiPhotosIcon width={20} height={20} />
                  </View>
                )}
              </View>
            </TouchableOpacity>
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
            {images.length > 1 ? (
              <FlatList
                data={images}
                horizontal
                keyExtractor={(item, index) => index.toString()}
                initialScrollIndex={images.findIndex(
                  (item) => item.uri === selectedImageUri
                )}
                renderItem={({ item }) => (
                  <View style={{ position: "relative" }}>
                    {item.type === "image" ? (
                      <Image
                        source={{ uri: item.uri }}
                        style={modalStyles.fullscreenImage}
                      />
                    ) : (
                      <>
                        <Video
                          ref={(ref) => {
                            if (item.uri === selectedImageUri) {
                              fullscreenVideoRef.current = ref; // Asigna la referencia solo al video visible
                            }
                          }}
                          source={{ uri: item.uri }}
                          style={modalStyles.fullscreenVideo}
                          resizeMode={ResizeMode.CONTAIN}
                          shouldPlay={playingVideos[item.uri]}
                          isLooping
                        />
                        <TouchableOpacity
                          style={styles.playPauseButton}
                          onPress={() =>
                            togglePlayPause(selectedImageUri || "", true)
                          }
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
                      </>
                    )}
                  </View>
                )}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                getItemLayout={(data, index) => ({
                  length: Dimensions.get("window").width,
                  offset: Dimensions.get("window").width * index,
                  index,
                })}
                onScrollToIndexFailed={(info) => {
                  console.warn("Scroll failed: ", info);
                  setTimeout(() => {
                    flatListRef.current?.scrollToIndex({
                      index: info.index,
                      animated: true,
                    });
                  }, 100);
                }}
              />
            ) : selectedImageUri?.endsWith(".mp4") ||
              selectedImageUri?.includes("video") ? (
              <>
                <Video
                  ref={(ref) => {
                    if (ref) {
                      fullscreenVideoRef.current = ref; // Sincroniza el video único en pantalla completa
                    }
                  }}
                  source={{ uri: selectedImageUri }}
                  style={modalStyles.fullscreenVideo}
                  resizeMode={ResizeMode.CONTAIN}
                  shouldPlay={playingVideos[selectedImageUri]}
                  isLooping
                />
                <TouchableOpacity
                  style={styles.playPauseButton}
                  onPress={() => togglePlayPause(selectedImageUri, true)}
                >
                  {playingVideos[selectedImageUri] ? (
                    <View style={styles.pauseIcon}>
                      <View style={styles.pauseBar} />
                      <View style={styles.pauseBar} />
                    </View>
                  ) : (
                    <View style={styles.playIcon} />
                  )}
                </TouchableOpacity>
              </>
            ) : (
              <Image
                source={{ uri: selectedImageUri }}
                style={modalStyles.fullscreenImage}
              />
            )}
            <TouchableOpacity
              onPress={closeImageModal}
              style={modalStyles.modalCloseButtonContainer}
            >
              <Text style={modalStyles.modalCloseButtonText}>
                {i18n.t("modal.close")}
              </Text>
            </TouchableOpacity>
          </View>
        </NativeModal>
      )}
      {!isAd && (
        <View style={styles.interactionContainer}>
          <View style={styles.leftInteraction}>
            <TouchableOpacity onPress={toggleLike} style={styles.iconButton}>
              {isLiked ? (
                themeMode === "dark" ? (
                  <LikeColoredIcon width={20} height={20} />
                ) : (
                  <LikeColoredIcon width={20} height={20} />
                )
              ) : themeMode === "dark" ? (
                <LikeIconDark width={20} height={20} />
              ) : (
                <LikeIconLight width={20} height={20} />
              )}
              <Text
                style={[styles.counter, { color: theme.colors.textPrimary }]}
              >
                {likeCount}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={openModal} style={styles.iconButton}>
              {themeMode === "dark" ? (
                <CommentIconDark width={20} height={20} />
              ) : (
                <CommentIconLight width={20} height={20} />
              )}
              <Text
                style={[styles.counter, { color: theme.colors.textPrimary }]}
              >
                {commentsCount}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={toggleSave} style={styles.iconButton}>
            {isSaved ? (
              themeMode === "dark" ? (
                <SaveColoredIconDark width={20} height={20} />
              ) : (
                <SaveColoredIconLight width={20} height={20} />
              )
            ) : themeMode === "dark" ? (
              <SaveIconDark width={20} height={20} />
            ) : (
              <SaveIconLight width={20} height={20} />
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
                placeholder={i18n.t("comment.addComment")}
                placeholderTextColor={theme.colors.textSecondary}
                value={newComment}
                onChangeText={setNewComment}
              />

              <TouchableOpacity
                style={styles.sendButton}
                onPress={handleAddComment}
              >
                {themeMode === "dark" ? (
                  <SendCommentIconDark
                    width={24}
                    height={24}
                    fill={theme.colors.primary}
                  />
                ) : (
                  <SendCommentIconLight
                    width={24}
                    height={24}
                    fill={theme.colors.primary}
                  />
                )}
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
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    resizeMode: "contain",
  },
  fullscreenVideo: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "black",
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
  multiPhotosIconContainer: {
    position: "absolute",
    top: 8,
    right: 12,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo semitransparente
    borderRadius: 10,
    padding: 4,
    zIndex: 10,
  },
});

export default Post;
