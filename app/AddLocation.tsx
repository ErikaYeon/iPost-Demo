import React, { useState, useEffect} from 'react';
import { SafeAreaView, View, StatusBar, Platform } from 'react-native';
import HeaderNoIcon from '../ui/components/HeaderNoIcon';
import SearchBar from '../ui/components/SearchBar';
import SuggestionsList from '../ui/components/SuggestionsList'; 
import { darkTheme } from '../ui/styles/Theme';
import { useRouter } from 'expo-router'; 
import { useDispatch, useSelector} from 'react-redux';
import { setLocation } from '../redux/slices/createPostSlice'; 

const theme = darkTheme;

const getPlacesSuggestions = async (query: string) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1&limit=5`,
      {
        headers: {
          'User-Agent': 'MyApp (your-email@example.com)', // Coloca tu email aquí
          'Accept-Language': 'es',
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener sugerencias de ubicación:", error);
    return [];
  }
};

const AddLocation: React.FC = () => {
  const router = useRouter(); // Inicializa el router
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useDispatch();

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.length > 2) {
      const places = await getPlacesSuggestions(query);  
      setSuggestions(places);
    } else {
      setSuggestions([]);
    }
  };

  const handleSearchPress = () => {
    console.log("Buscar", `Buscando: ${searchQuery}`);
  };

  const handleSuggestionPress = (displayName: string) => {
    // console.log("Ubicación seleccionada:", displayName);
    dispatch(setLocation(displayName));
    
    // Navega a CreatePost y pasa la ubicación seleccionada
    router.push({
      pathname: '/CreatePost',
      params: { location: displayName }, // Pasa la ubicación seleccionada
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar backgroundColor={theme.colors.background} barStyle="light-content" />

      <SafeAreaView style={{ backgroundColor: theme.colors.background, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 30 }}>
        <HeaderNoIcon title="Agregar ubicación" theme={theme} />
      </SafeAreaView>

      <SafeAreaView style={{ paddingHorizontal: 10, marginBottom: 10 }}>
        <SearchBar
          placeholder="Buscar una ubicación"
          onChangeText={handleSearch}
          value={searchQuery}
          theme={theme}
          onSearchPress={handleSearchPress}
        />
      </SafeAreaView>

      <SuggestionsList
        suggestions={suggestions}
        onSuggestionPress={handleSuggestionPress} // Maneja la selección de sugerencias
        theme={theme}
      />
    </View>
  );
};

export default AddLocation;
