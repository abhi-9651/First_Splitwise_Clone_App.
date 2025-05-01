import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import FriendCard from "../components/ui/FriendCard";

export default function FriendsScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [nameOfFriend, setNameOfFriend] = useState("");
  const [friends, setFriends] = useState([]);

  // Load friends from AsyncStorage on component mount
  useEffect(() => {
    loadFriends();
  }, []);

  // Load friends from AsyncStorage
  const loadFriends = async () => {
    try {
      const storedFriends = await AsyncStorage.getItem("friends");
      setFriends(storedFriends ? JSON.parse(storedFriends) : []);
    } catch (error) {
      console.error("Error loading friends:", error);
    }
  };

  // Save friends to AsyncStorage
  const saveFriends = async (updatedFriends) => {
    try {
      await AsyncStorage.setItem("friends", JSON.stringify(updatedFriends));
    } catch (error) {
      console.error("Error saving friends:", error);
      ToastAndroid.show("Failed to save friends!", ToastAndroid.SHORT);
    }
  };

  // Open image picker to select an image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  // Add a new friend to the list
  const addFriend = () => {
    if (!nameOfFriend || !imageUri) {
      ToastAndroid.show(
        "Please enter a name and select an image!",
        ToastAndroid.SHORT
      );
      return;
    }

    const newFriend = { id: Date.now(), name: nameOfFriend, image: imageUri };
    const updatedFriends = [...friends, newFriend];
    setFriends(updatedFriends);
    saveFriends(updatedFriends);
    setNameOfFriend("");
    setImageUri(null);
    setModalVisible(false);
  };

  const removeFriend = (friendId) => {
    Alert.alert(
      "Remove Friend",
      "Are you sure you want to remove this friend?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          onPress: () => {
            const updatedFriends = friends.filter(
              (friend) => friend.id !== friendId
            );
            setFriends(updatedFriends);
            saveFriends(updatedFriends);
            ToastAndroid.show("Friend removed!", ToastAndroid.SHORT);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom", "left", "right"]}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Summary Section */}
          <View style={styles.summaryContainer}>
            <View>
              <Text style={styles.summaryText}>
                Overall you owe
                <Text style={{ color: "red" }}> ₹500.00</Text>
              </Text>
              <Text style={styles.summaryText}>
                and you are owed
                <Text style={{ color: "green" }}> ₹400.00</Text>
              </Text>
            </View>
            <Pressable>
              <MaterialCommunityIcons name="filter-outline" size={24} />
            </Pressable>
          </View>

          {/* Friends List */}
          <View style={{ gap: 10 }}>
            {friends.map((friend) => (
              <FriendCard
                key={friend.id}
                friendName={friend.name}
                imageUri={friend.image}
                onLongPress={() => removeFriend(friend.id)}
              />
            ))}
          </View>

          {/* Add Friend Button */}
          <View style={styles.addFriendContainer}>
            <Pressable
              onPress={() => setModalVisible(true)}
              style={styles.addFriendButton}
              accessibilityLabel="Add more friends"
            >
              <Feather name="user-plus" size={16} color="green" />
              <Text style={styles.addFriendText}>Add more friends</Text>
            </Pressable>
          </View>
        </ScrollView>

        {/* Add Friend Modal */}
        <Modal visible={modalVisible} transparent={true} animationType="fade">
          <View style={styles.modalOverlay} pointerEvents="box-none">
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Add Friend</Text>
              <TextInput
                placeholder="Friend Name"
                value={nameOfFriend}
                onChangeText={setNameOfFriend}
                style={styles.input}
              />
              <Pressable onPress={pickImage} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Select Image</Text>
              </Pressable>
              <Pressable onPress={addFriend} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Add Friend</Text>
              </Pressable>
              <Pressable
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Text style={styles.modalButtonText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
    flex: 1,
    backgroundColor: "white",
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  summaryContainer: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  summaryText: {
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 17,
  },
  addFriendContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
  },
  addFriendButton: {
    borderRadius: 4,
    padding: 4,
    paddingHorizontal: 12,
    borderWidth: 2,
    borderColor: "green",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  addFriendText: {
    color: "green",
    fontSize: 13,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    zIndex: 20, // Ensure modal content is above the overlay
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  modalButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
});
