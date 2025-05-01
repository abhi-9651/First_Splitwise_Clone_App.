import { Image, StyleSheet, Text, View } from "react-native";

export default function ActivityCard({
  groupName,
  amountOwed,
  itemName,
  date,
  imgUrl,
}) {
  return (
    <View style={styles.itemContainer}>
      <View style={{ position: "relative" }}>
        <View style={styles.itemImage}>
          <Image
            style={{
              height: "100%",
              width: "100%",
              backgroundColor: "lightgray",
            }}
            source={imgUrl} // ✅ Directly pass require() or URI
          />
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text>You added {itemName} in {groupName}</Text>
        <Text style={{ fontSize: 14, lineHeight: 14, color: "green" }}>
          You owe {amountOwed}
        </Text>
        <Text style={{ fontSize: 12, lineHeight: 13 }}>
          {new Date(date).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
  },
  itemImage: {
    height: 60,
    width: 60,
  },
});
