import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  TextInput,
  Button,
  ToastAndroid,
} from "react-native";
import GroupCard from "../components/ui/GroupCard";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function GroupsScreen() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupImage, setGroupImage] = useState(null);
  const [groups, setGroups] = useState([]);

  let currency = "₹";

  // Load saved groups from AsyncStorage when the component mounts
  useEffect(() => {
    loadGroups();
  }, []);

  const loadGroups = async () => {
    try {
      const storedGroups = await AsyncStorage.getItem("groups");
      if (storedGroups !== null) {
        setGroups(JSON.parse(storedGroups));
      }
    } catch (error) {
      console.error("Error loading groups:", error);
    }
  };

  // Function to save groups to AsyncStorage
  const saveGroups = async (updatedGroups) => {
    try {
      await AsyncStorage.setItem("groups", JSON.stringify(updatedGroups));
    } catch (error) {
      console.error("Error saving groups:", error);
    }
  };

  // Function to pick an image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setGroupImage(result.assets[0].uri);
    }
  };

  // Function to handle group creation
  const createGroup = () => {
    if (!groupName) {
      alert("Please enter a group name.");
      return;
    }

    const newGroup = { id: Date.now(), name: groupName, image: groupImage }; // Add unique ID
    const updatedGroups = [...groups, newGroup];

    setGroups(updatedGroups);
    saveGroups(updatedGroups); // Save to AsyncStorage
    setGroupName("");
    setGroupImage(null);
    setModalVisible(false);
  };

  // Function to remove a group
  const removeGroup = (groupId) => {
    Alert.alert("Remove Group", "Are you sure you want to remove this group?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Remove",
        onPress: () => {
          const updatedGroups = groups.filter((group) => group.id !== groupId); // Use ID for filtering
          setGroups(updatedGroups);
          saveGroups(updatedGroups);
          ToastAndroid.show("Group removed!", ToastAndroid.SHORT);
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.overview}>
          <View>
            <Text style={styles.overviewText}>
              Overall you owe{" "}
              <Text style={{ color: "red" }}>{currency}500.00</Text>
            </Text>
            <Text style={styles.overviewText}>
              and you are owed{" "}
              <Text style={{ color: "green" }}>{currency}400.00</Text>
            </Text>
          </View>
          <Pressable>
            <MaterialCommunityIcons name="filter-outline" size={24} />
          </Pressable>
        </View>

        {/* Render Groups */}
        <View style={{ gap: 8 }}>
          {groups.map((group) => (
            <GroupCard
              key={group.id} // Use unique ID as key
              title={group.name}
              expense={100} // Replace with actual expense logic
              imageUri={group.image}
              onLongPress={() => removeGroup(group.id)} // Pass group ID
            />
          ))}
        </View>

        {/* Button to open modal */}
        <View style={styles.center}>
          <Pressable
            onPress={() => {
              console.log("Opening modal...");
              setModalVisible(true);
            }}
            style={styles.addButton}
          >
            <MaterialIcons name="group-add" size={16} color="green" />
            <Text style={styles.addButtonText}>Start a new group</Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Modal for Adding a New Group */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          console.log("Closing modal...");
          setModalVisible(false);
        }}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Create Group</Text>

            <TextInput
              placeholder="Enter group name"
              value={groupName}
              onChangeText={setGroupName}
              style={styles.input}
            />

            <Pressable onPress={pickImage} style={styles.imagePicker}>
              <MaterialCommunityIcons
                name="image-plus"
                size={24}
                color="gray"
              />
              <Text>Select Group Image</Text>
            </Pressable>

            {groupImage && (
              <Image source={{ uri: groupImage }} style={styles.previewImage} />
            )}

            <View style={styles.buttonRow}>
              <Button
                title="Cancel"
                color="red"
                onPress={() => {
                  console.log("Closing modal...");
                  setModalVisible(false);
                }}
              />
              <Button
                title="Create Group"
                color="green"
                onPress={createGroup}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
    flex: 1,
    backgroundColor: "white",
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  overview: {
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  overviewText: {
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 17,
  },
  center: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
  },
  addButton: {
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
  addButtonText: {
    color: "green",
    fontSize: 13,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
  },
  imagePicker: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  previewImage: {
    width: 200,
    height: 200,
    marginTop: 10,
    borderRadius: 5,
    alignSelf: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
