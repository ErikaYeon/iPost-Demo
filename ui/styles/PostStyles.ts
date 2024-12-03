// PostStyles.ts
import { StyleSheet, Dimensions } from "react-native";
import { Theme } from "@/ui/styles/Theme";


export const createPostStyles = (theme: Theme) =>
  StyleSheet.create({
  postContainer: {
    marginBottom: 15,
    padding: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    textAlign: "left",
  },
  headerHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profilePicture: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 10,
  },
  userInfo: {
    justifyContent: "center",
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  crownIcon: {
    marginRight: 5,
  },
  name: {
    fontSize: 15,
    fontWeight: "bold",
  },
  username: {
    fontSize: 15,
  },
  description: {
    fontSize: 18,
    marginVertical: 5,
  },
  locationDateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  location: {
    fontSize: 15,
    fontStyle: "italic",
  },
  date: {
    fontSize: 15,
  },
  postImage: {
    width: Dimensions.get("window").width - 50,
    height: Dimensions.get("window").width - 50,
    borderRadius: 8,
    marginRight: 6,
    marginLeft: 0,
    padding: 10,
  },
  singlePostImage: {
    width: Dimensions.get("window").width - 50, // Ancho igual a la pantalla
    height: Dimensions.get("window").width - 50, // Altura igual al ancho para que sea cuadrado
    borderRadius: 8, // Opcional: esquinas redondeadas
    resizeMode: "cover", // Asegura que la imagen cubra todo
    margin: 0, // Sin margen
    padding: 0, // Sin padding
  },
  interactionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  leftInteraction: {
    flexDirection: "row",
  },
  iconButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  counter: {
    marginLeft: 5,
    fontSize: 14,
  },
  viewAllCommentsButton: {
    alignSelf: "flex-start",
    marginTop: 8,
    marginBottom: 5,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 10,
    backgroundColor: "#0C7A79",
  },
  viewAllCommentsText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  firstCommentContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
  commentUsername: {
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    alignSelf: "stretch",
    marginTop: 10,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    maxHeight: "90%",
    borderRadius: 10,
    padding: 10,
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  commentProfilePicture: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  commentTextContainer: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentText: {
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  input: {
    flex: 1,
    borderColor: theme.colors.textPrimary,
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    marginRight: 10,
  },
  sendButton: {
    paddingVertical: 8,
    paddingHorizontal: 5,
    marginRight:-7,
    borderRadius: 5,
  },
  singleImage: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    borderRadius: 8,
  },
  playPauseButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -40 }, { translateY: -40 }],
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  playIcon: {
    width: 0,
    height: 0,
    borderLeftWidth: 30,
    borderLeftColor: "white",
    borderTopWidth: 20,
    borderTopColor: "transparent",
    borderBottomWidth: 20,
    borderBottomColor: "transparent",
  },
  pauseIcon: {
    flexDirection: "row",
    justifyContent: "center", // Centra ambas barras
    alignItems: "center", // Asegura que estén alineadas verticalmente
    width: 40, // Ancho total del ícono
    height: 40, // Altura total del ícono
  },
  pauseBar: {
    width: 12, // Ancho de cada barra
    height: 40, // Altura de las barras
    backgroundColor: "white",
    marginHorizontal: 4, // Espaciado entre las barras
  },
  link: {
    textDecorationLine: "underline",
    fontStyle: "italic",
  },
});

export default createPostStyles;
