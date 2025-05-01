import React from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  Alert,
  Pressable,
  ToastAndroid,
} from "react-native";
import {
  AntDesign,
  Feather,
  FontAwesome,
  Fontisto,
  Entypo,
  MaterialIcons,
} from "@expo/vector-icons";

const AccountScreen = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Screen Heading */}
        <Text style={styles.screenHeading}>Account</Text>

        {/* Profile Section */}
        <View style={styles.accountInfoSection}>
          <Pressable
            onPress={() => Alert.alert("Changing Photo")}
            style={{ position: "relative" }}
          >
            <Image
              source={require("../assets/profile.png")}
              style={styles.accountInfoImage}
            />
            <AntDesign
              style={{
                backgroundColor: "white",
                position: "absolute",
                bottom: -8,
                right: -8,
                padding: 2,
                borderRadius: 100,
              }}
              name="camerao"
              size={24}
              color="black"
            />
          </Pressable>
          <View style={{ flex: 1, marginLeft: 8 }}>
            <Text style={{ fontSize: 18, fontWeight: "500" }}>Abhijeet Kushwaha</Text>
            <Text style={{ fontSize: 12, color: "gray" }}>
              2024021301@mmmut.ac.in
            </Text>
          </View>
          <Pressable
            onPress={() =>
              ToastAndroid.show("Editing profile info", ToastAndroid.SHORT)
            }
          >
            <Feather
              name="edit"
              size={24}
              color="black"
              style={{ marginRight: 8 }}
            />
          </Pressable>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Account Actions */}
        <View style={styles.section}>
          <Pressable style={[styles.accountButtons, { flexDirection: "row" }]}>
            <FontAwesome name="qrcode" size={30} color="black" />
            <Text style={styles.accountButtonsText}>Scan code</Text>
          </Pressable>
          <Pressable style={[styles.accountButtons, { flexDirection: "row" }]}>
            <FontAwesome name="diamond" size={25} color="purple" />
            <Text style={styles.accountButtonsText}>Splitwise Pro</Text>
          </Pressable>
        </View>

        {/* Preferences Section */}
        <View style={styles.sectionHeader}>
          <Text style={{ opacity: 0.7 }}>Preferences</Text>
        </View>
        <View style={styles.section}>
          <Pressable style={[styles.accountButtons, { flexDirection: "row" }]}>
            <Fontisto name="email" size={30} color="black" />
            <Text style={styles.accountButtonsText}>Email Settings</Text>
          </Pressable>
          <Pressable style={[styles.accountButtons, { flexDirection: "row" }]}>
            <Feather name="bell" size={30} color="black" />
            <Text style={styles.accountButtonsText}>Notification settings</Text>
          </Pressable>
          <Pressable style={[styles.accountButtons, { flexDirection: "row" }]}>
            <Feather name="lock" size={30} color="black" />
            <Text style={styles.accountButtonsText}>Security</Text>
          </Pressable>
        </View>

        {/* Feedback Section */}
        <View style={styles.sectionHeader}>
          <Text style={{ opacity: 0.7 }}>Feedback</Text>
        </View>
        <View style={styles.section}>
          <Pressable style={[styles.accountButtons, { flexDirection: "row" }]}>
            <Entypo name="star" size={30} color="black" />
            <Text style={styles.accountButtonsText}>Rate Splitwise</Text>
          </Pressable>
          <Pressable style={[styles.accountButtons, { flexDirection: "row" }]}>
            <AntDesign name="questioncircleo" size={30} color="black" />
            <Text style={styles.accountButtonsText}>
              Contact Splitwise support
            </Text>
          </Pressable>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Logout Button */}
        <View style={styles.section}>
          <Pressable
            onPress={() => ToastAndroid.show("Logging out", ToastAndroid.SHORT)}
            style={[styles.accountButtons, { flexDirection: "row" }]}
          >
            <Feather name="log-out" size={30} color="black" />
            <Text style={styles.accountButtonsText}>Log out</Text>
          </Pressable>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={styles.footerText}>Made with</Text>
            <MaterialIcons name="auto-awesome" size={14} color="gold" />
            <Text style={styles.footerText}> in Providence, RI, USA</Text>
          </View>
          <Pressable>
            <Text style={styles.footerLink}>Bunnies!</Text>
          </Pressable>
          <Pressable>
            <Text style={styles.footerLink}>Privacy Policy</Text>
          </Pressable>
          <Text style={styles.footerText}>v.25.1.2/824</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = {
  container: { padding: 14, backgroundColor: "white", flex: 1 },
  screenHeading: { fontSize: 22, fontWeight: "bold", marginBottom: 12 },
  accountInfoSection: { flexDirection: "row", alignItems: "center" },
  accountInfoImage: { width: 60, height: 60, borderRadius: 30 },
  divider: {
    width: "100%",
    height: 1,
    borderWidth: 0.5,
    borderColor: "lightgray",
    marginVertical: 12,
  },
  sectionHeader: { paddingHorizontal: 14, marginVertical: 8 },
  section: { paddingHorizontal: 14, gap: 12 },
  accountButtons: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  accountButtonsText: { marginLeft: 12, fontSize: 16 },
  footer: {
    paddingHorizontal: 14,
    gap: 12,
    marginTop: 24,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    opacity: 0.7,
  },
  footerLink: { fontSize: 14, color: "blue", textAlign: "center" },
};

export default AccountScreen;
