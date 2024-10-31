import React, { useEffect , useState} from 'react';
import { SafeAreaView, View, StatusBar, Platform, FlatList, Image, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
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
import {  setAllPostData, setPostContent, setSelectedImages, setLocation, clearPost } from '../redux/slices/createPostSlice';
import { useDispatch,  useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const theme = darkTheme;
const sharedStyles = createSharedStyles(theme);

const CreatePost: React.FC = () => {
  const router = useRouter();
  // const [postContent, setPostContent] = useState('');
  // const [selectedImages, setSelectedImages] = useState([]);
  // const [location, setLocation] = useState(''); 
  const dispatch = useDispatch();
  // const {location} = useState{state => state.createPost};
  

  const postContent = useSelector((state: RootState) => state.createPost.postContent);
  const selectedImages = useSelector((state: RootState) => state.createPost.selectedImages);
  const location = useSelector((state: RootState) => state.createPost.location);

  // Obtén la ubicación pasada como parámetro (No se ve la Ubicacion en la pantalla *ARREGLAR*)
  useEffect(() => {
    if (router.params?.location) {
      dispatch(setLocation(router.params.location)); // Update location if passed from AddLocation
    }
  }, [router.params?.location]);

  const selectImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 10,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImages(result.assets.map((asset) => asset.uri));
      dispatch(setSelectedImages(result.assets.map((asset) => asset.uri)));
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
  const handlePublish = () => {
    dispatch(setAllPostData({ postContent, location, selectedImages }));
    console.log('Post publicado con datos:', { postContent, location, selectedImages });
    router.push('/(tabs)/home');
    dispatch(clearPost());   //despues borrar esta linea!!!
  };
  // console.log(useState.)
  
  

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
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginVertical: theme.spacing.small }}
          />
        )}

        {/* Mostrar la ubicación seleccionada */}
        {location && (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: theme.spacing.small }}>
            <LocationIcon width={24} height={24} fill={theme.colors.textPrimary} />
            <Text style={{ marginLeft: 5, color: theme.colors.textPrimary }}>{location}</Text>
          </View>
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
            disabled={!postContent.trim() && selectedImages.length === 0}
            style={{
              marginTop: 30,
              marginBottom: 150,
              backgroundColor: !postContent.trim() && selectedImages.length === 0 ? '#B5BACB' : theme.colors.primary,
              borderColor: theme.colors.textSecondary,
              width: '95%',
            }}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default CreatePost;
