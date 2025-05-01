import { ScrollView, StyleSheet, Text, View } from "react-native";
import ActivityCard from "../components/ui/ActivityCard";

export default function ActivityScreen() {
  const activityData = [
    {
      groupName: "Trip to Manali",
      amountOwed: "₹1200",
      itemName: "Hotel Booking",
      date: "2024-02-15",
      imgUrl: require("../assets/image.webp"), // ✅ Local image
    },
    {
      groupName: "Dinner Party",
      amountOwed: "₹500",
      itemName: "Pizza & Drinks",
      date: "2024-02-10",
      imgUrl: require("../assets/profile.png"),
    },
    {
      groupName: "Movie Night",
      amountOwed: "₹300",
      itemName: "Movie Tickets",
      date: "2024-02-08",
      imgUrl: { uri: "https://images.pexels.com/photos/30720435/pexels-photo-30720435/free-photo-of-scenic-beachfront-in-monterosso-al-mare-italy.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" }
    },
    {
      groupName: "Office Outing",
      amountOwed: "₹800",
      itemName: "Lunch at BBQ",
      date: "2024-01-25",
      imgUrl: require("../assets/image.webp"),
    },
    {
      groupName: "Weekend Trip",
      amountOwed: "₹1500",
      itemName: "Resort Stay",
      date: "2024-01-20",
      imgUrl: require("../assets/image.webp"),
    },
    {
      groupName: "Birthday Celebration",
      amountOwed: "₹1000",
      itemName: "Cake & Snacks",
      date: "2024-01-10",
      imgUrl: require("../assets/image.webp"),
    },
    {
      groupName: "New Year Party",
      amountOwed: "₹2000",
      itemName: "DJ & Food",
      date: "2023-12-31",
      imgUrl: require("../assets/image.webp"),
    },
    {
      groupName: "Wedding Gift",
      amountOwed: "₹700",
      itemName: "Gift Contribution",
      date: "2023-12-20",
      imgUrl: require("../assets/image.webp"),
    },
    {
      groupName: "Road Trip",
      amountOwed: "₹900",
      itemName: "Fuel & Snacks",
      date: "2023-12-15",
      imgUrl: require("../assets/image.webp"),
    },
    {
      groupName: "Festival Celebration",
      amountOwed: "₹1100",
      itemName: "Sweets & Decoration",
      date: "2023-11-10",
      imgUrl: require("../assets/image.webp"),
    },
    {
      groupName: "Concert Night",
      amountOwed: "₹1800",
      itemName: "VIP Tickets",
      date: "2023-10-05",
      imgUrl: require("../assets/image.webp"),
    },
    {
      groupName: "College Farewell",
      amountOwed: "₹500",
      itemName: "Gifts & Mementos",
      date: "2023-09-25",
      imgUrl: require("../assets/image.webp"),
    },
    {
      groupName: "Office Celebration",
      amountOwed: "₹750",
      itemName: "Team Lunch",
      date: "2023-08-30",
      imgUrl: require("../assets/image.webp"),
    },
    {
      groupName: "Cricket Match",
      amountOwed: "₹600",
      itemName: "Stadium Tickets",
      date: "2023-07-15",
      imgUrl: require("../assets/image.webp"),
    },
    {
      groupName: "Beach Vacation",
      amountOwed: "₹2200",
      itemName: "Hotel & Food",
      date: "2023-06-20",
      imgUrl: require("../assets/image.webp"),
    },
    {
      groupName: "Shopping Spree",
      amountOwed: "₹400",
      itemName: "Mall Purchase",
      date: "2023-05-10",
      imgUrl: require("../assets/image.webp"),
    },
    {
      groupName: "Gaming Night",
      amountOwed: "₹300",
      itemName: "Snacks & Games",
      date: "2023-04-05",
      imgUrl: require("../assets/image.webp"),
    },
    {
      groupName: "Roadside Dhaba",
      amountOwed: "₹250",
      itemName: "Dinner",
      date: "2023-03-10",
      imgUrl: require("../assets/image.webp"),
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.screenHeading}>Activity</Text>
        <View style={{ gap: 16, paddingBottom: 24 }}>
          {activityData.map((activity, index) => (
            <ActivityCard
              key={index}
              groupName={activity.groupName}
              amountOwed={activity.amountOwed}
              itemName={activity.itemName}
              date={activity.date}
              imgUrl={activity.imgUrl} // ✅ Pass require() directly
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
    flex: 1,
    backgroundColor: "white",
  },
  screenHeading: {
    fontSize: 22,
    paddingBottom: 8,
    fontWeight: "500",
  },
});
