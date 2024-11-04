// PostStyles.ts
import { StyleSheet } from 'react-native';

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
    paddingHorizontal: 10,
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
  viewAllCommentsButton: {
    alignSelf: 'flex-start',
    marginTop: 8,
    marginBottom: 5,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 10,
    backgroundColor: '#0C7A79',
  },
  viewAllCommentsText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  firstCommentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  commentUsername: {
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    alignSelf: 'stretch',
    marginTop: 10,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    maxHeight: '90%',
    borderRadius: 10,
    padding: 10,
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentText: {
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    marginRight: 10,
  },
  sendButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
});

export default styles;
