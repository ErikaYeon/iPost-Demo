import React, { useEffect , useState} from 'react';
import { SafeAreaView, View, StatusBar, Platform, FlatList, Image, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import CustomButton from '../ui/components/CustomButton';
import HeaderWithIcon from '../ui/components/HeaderWithIcon';
import PostTextInput from '../ui/components/PostTextInput';
import OptionButton from '../ui/components/OptionButton';
import createSharedStyles from '../ui/styles/SharedStyles';
import { lightTheme, darkTheme } from '../ui/styles/Theme';
import CloseIcon from '../assets/images/icons/close.svg';
import PhotoIcon from '../assets/images/icons/photo.svg';
import LocationIcon from '../assets/images/icons/location_on.svg';
import { useRouter } from 'expo-router';
import {  setAllPostData, setPostContent, setSelectedImages, setLocation, clearPost, setDate, createPostAsync } from '../redux/slices/createPostSlice';
import { useDispatch,  useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { CreatePostRequest } from '@/types/apiContracts';
import Placeholders from '@/constants/ProfilePlaceholders';
import { addPost} from '@/redux/slices/timelineSlice';
// import { Video } from 'expo-av';


const theme = darkTheme;
const sharedStyles = createSharedStyles(theme);

const CreatePost: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  
  const postContent = useSelector((state: RootState) => state.createPost.postContent);
  const selectedImages = useSelector((state: RootState) => state.createPost.selectedImages);
  const location = useSelector((state: RootState) => state.createPost.location);
  const formattedDate = new Date;
  const date = `${formattedDate.getDate().toString().padStart(2, '0')}/${(formattedDate.getMonth() + 1).toString().padStart(2, '0')}/${formattedDate.getFullYear()}`;
  const userProfile = useSelector((state: RootState) => state.profile);

  // Obtén la ubicación pasada como parámetro (No se ve la Ubicacion en la pantalla *ARREGLAR*)
  useEffect(() => {
    if (router.params?.location) {
      dispatch(setLocation(router.params.location)); // Update location if passed from AddLocation
    }
  }, [router.params?.location]);

  const selectImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      selectionLimit: 10,
      quality: 0.5,
    });

    if (!result.canceled) {
      // Convertimos cada imagen a base64
      const base64Images = await Promise.all(
        result.assets.map(async (asset) => {
          const base64 = await FileSystem.readAsStringAsync(asset.uri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          return `data:image/jpeg;base64,${base64}`; // Convertimos a formato base64
        })
      );

      // Guardamos las imágenes base64 en el estado de Redux
      dispatch(setSelectedImages(base64Images));
    }
  };

  const renderImageItem = ({ item }) => (
    <View style={{ marginRight: 10, position: 'relative' }}>
      <Image source={{ uri: item }} style={{ width: 130, height: 130, borderRadius: 8 }} />
      <TouchableOpacity
        onPress={() => setSelectedImages(selectedImages.filter((uri) => uri !== item))}
        style={{
          position: 'absolute',
          top: -5,
          right: -5,
          backgroundColor: 'rgba(0,0,0,0.5)',
          borderRadius: 12,
          padding: 4,
        }}
      >
        <CloseIcon width={16} height={16} fill="white" />
      </TouchableOpacity>
    </View>
  );

  const handleCreatePostRedux = () =>{
    const generateRandomId = (): string => {
      return Math.floor(1000 + Math.random() * 9000).toString();
    };
    const newPostData = {
      id: generateRandomId(), 
      author: {
        id: userProfile.id,
        email: userProfile.email ?? "",
        username: userProfile.username ?? "",
        name: userProfile.name ?? "",
        lastname: userProfile.lastname ?? "",
        level: userProfile.crown,
        profileImage: userProfile.profileImage ?? Placeholders.DEFAULT_PROFILE_PHOTO,
        active: true,
      },
      createdAt: new Date().toISOString(), 
      location: location,
      title: postContent, 
      likesCount: 0, 
      commentsCount: 0, 
      contents: selectedImages ?? [], 
      likes: [], 
      isAd: false,
    };
    dispatch(addPost(newPostData));
  }

  const handlePublish = async () => {
    dispatch(setDate(date));   //creo q no hace falta
    dispatch(setAllPostData({ postContent, location, selectedImages, date }));  //creo q no hace falta
    handleCreatePostRedux();
    dispatch(clearPost());
    router.push('/(tabs)/home');

    const request: CreatePostRequest = {
      userId: userProfile.id, 
      location: location, 
      contents: selectedImages ?? [], 
      title: postContent,
    };
    
    try {
      const result = await dispatch(createPostAsync(request));
      if (createPostAsync.fulfilled.match(result)){
      }
    } catch (error) {
      console.log('Error al crear el Post')
    }
  };
  
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar backgroundColor={theme.colors.background} barStyle="light-content" />

      <SafeAreaView
        style={{
          backgroundColor: theme.colors.background,
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 30,
          
        }}
      >
      
        <HeaderWithIcon
          iconComponent={() => <CloseIcon width={24} height={24} fill={theme.colors.textPrimary} />}
          title="Nuevo post"
          onPress={() => router.push('/(tabs)/home')}
          theme={theme}
        />
       
      </SafeAreaView>

      <SafeAreaView
        style={[
          sharedStyles.screenContainer,
          { width: '100%', alignSelf: 'center', paddingHorizontal: 20, justifyContent: 'flex-start', alignItems: 'stretch' },
        ]}
      >
        <PostTextInput
          placeholder="¿Qué te gustaría publicar?"
          value={postContent}
          onChangeText={(text) => {
            setPostContent(text); // Local state update
            dispatch(setPostContent(text)); // Update Redux state
          }}
          multiline={true}
          theme={theme}
          style={{ marginBottom: theme.spacing.medium }}
        />

        {/* Mostrar imágenes seleccionadas */}
        {selectedImages.length > 0 && (
          <FlatList
            data={selectedImages}
            renderItem={renderImageItem}
            keyExtractor={(item, index) => `${item}-${index}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginVertical: theme.spacing.small }}
          />
        )}

        {/* Botones de opción */}
        <OptionButton
          iconComponent={() => <PhotoIcon width={24} height={24} fill={theme.colors.textPrimary} />}
          text="Seleccionar fotos o videos"
          onPress={selectImages}
          theme={theme}
        />
          
        
        <OptionButton
          iconComponent={() => <LocationIcon width={24} height={24} fill={theme.colors.textPrimary} />}
          text={location ? location : "Agregar ubicación"}
          onPress={() => router.push('/AddLocation')}
          theme={theme}
        />

        {/* Contenedor del botón con margen superior */}
        <View style={{ width: '100%', alignItems: 'center' }}>
          <CustomButton
            title="Publicar"
            onPress= {handlePublish}
            type="secondary"
            theme={theme}
            disabled={!(postContent.trim() && selectedImages.length > 0 && location.trim())}
            style={{
              marginTop: 30,
              marginBottom: 150,
              backgroundColor: !postContent.trim() && selectedImages.length === 0 ? '#B5BACB' : theme.colors.primary,
              borderColor: theme.colors.primary,
              width: '95%',
            }}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default CreatePost;
