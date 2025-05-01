import { Image, Pressable, Text, View } from "react-native";

export default function GroupCard({ title, expense, imageUri, onLongPress }) {
  return (
    <Pressable onLongPress={onLongPress}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <View
          style={{
            backgroundColor: "lightgray",
            height: 60,
            width: 80,
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              style={{ height: 60, width: 80, borderRadius: 8 }}
              resizeMode="cover"
            />
          ) : (
            <Image
              source={require("../../assets/image.webp")}
              style={{ height: 60, width: 80, borderRadius: 8 }}
              resizeMode="cover"
            />
          )}
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>{title}</Text>
          <Text style={{ fontSize: 14 }}>
            {expense === 0 ? "No Expense" : `Expense: ${expense}`}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
