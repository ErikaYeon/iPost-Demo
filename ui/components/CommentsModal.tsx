// CommentsModal.js
import React from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import Modal from 'react-native-modal';
import CrownIcon from './CrownIcon'; // Importa CrownIcon
import SendCommentIcon from '../../assets/images/icons/send_comment.svg'; // Ícono de enviar comentario

const CommentsModal = ({ visible, onClose, comments, theme }) => {
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      style={styles.modal}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[styles.modalContent, { backgroundColor: theme.colors.background }]}
      >
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.commentContainer}>
              <Image source={{ uri: item.profilePictureUrl }} style={styles.commentProfilePicture} />
              <View style={styles.commentTextContainer}>
                <View style={styles.commentHeader}>
                  {item.isVip && <CrownIcon type={item.crownType} style={styles.crownIcon} />}
                  <Text style={[styles.commentUsername, { color: theme.colors.textPrimary }]}>
                    {item.username}
                  </Text>
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
          />
          <TouchableOpacity style={styles.sendButton}>
            <SendCommentIcon width={24} height={24} fill={theme.colors.primary} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
  crownIcon: {
    marginRight: 5,
  },
  commentUsername: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
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

export default CommentsModal;
