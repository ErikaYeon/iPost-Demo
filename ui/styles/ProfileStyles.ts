// ProfileScreenStyles.ts
import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#201E43",
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: "#B5BACB",
    backgroundColor: "#201E43",
  },
  imageContainer: {
    flex: 1,
    margin: 1,
  },
  postImage: {
    width: screenWidth / 3 - 2,
    height: screenWidth / 3 - 2,
    borderRadius: 8,
  },
});
