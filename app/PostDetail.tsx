// import React from "react";
// import { View, Text, Image, StyleSheet } from "react-native";
// import { RouteProp } from "@react-navigation/native";
// import { RootStackParamList } from "@/ui/navigators/AppNavigator";

// type PostDetailScreenRouteProp = RouteProp<RootStackParamList, "PostDetail">;

// type PostDetailScreenProps = {
//   route: PostDetailScreenRouteProp;
// };

// const PostDetailScreen: React.FC<PostDetailScreenProps> = ({ route }) => {
//   const { uri, user, description } = route.params;

//   return (
//     <View style={styles.container}>
//       <Image source={{ uri }} style={styles.image} />
//       <View style={styles.content}>
//         <Text style={styles.user}>{user}</Text>
//         <Text style={styles.description}>{description}</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#000",
//   },
//   image: {
//     width: "100%",
//     height: "60%",
//     resizeMode: "cover",
//   },
//   content: {
//     padding: 16,
//   },
//   user: {
//     color: "#FFF",
//     fontWeight: "bold",
//     fontSize: 18,
//     marginBottom: 8,
//   },
//   description: {
//     color: "#FFF",
//     fontSize: 16,
//   },
// });

// export default PostDetailScreen;
