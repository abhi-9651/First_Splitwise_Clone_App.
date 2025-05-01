// import { LinearGradient } from "expo-linear-gradient";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function FriendCard({
  friendName,
  owesYou,
  amount,
  imageUri,
  onLongPress,
}) {
  let currency = "₹";
  return (
    <Pressable onLongPress={onLongPress}>
      <View style={styles.itemContainer}>
        <View style={styles.avatarContainer}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.avatar} />
          ) : (
            <Image
              style={styles.avatar}
              source={require("../../assets/image.webp")}
            />
          )}
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.itemText}>{friendName}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.oweText}>
            {owesYou ? "You owe" : "You are owed"}
          </Text>
          <Text style={{ color: owesYou ? "red" : "green", fontWeight: "600" }}>
            {currency}
            {amount ? amount : 780}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatarContainer: {
    height: 50,
    width: 50,
    borderRadius: 100,
    overflow: "hidden",
  },
  avatar: {
    height: "100%",
    width: "100%",
    backgroundColor: "lightgray",
  },
  itemText: {
    fontSize: 15,
    fontWeight: "500",
  },
  info: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  oweText: {
    fontSize: 12,
    fontWeight: "500",
  },
});
