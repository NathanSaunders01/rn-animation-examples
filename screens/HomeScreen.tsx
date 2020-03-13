import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList
} from "react-native";
import { Ionicons as Icon } from "@expo/vector-icons";
import { NavigationStackScreenProps } from "react-navigation-stack";
import { SafeAreaView } from "react-native-safe-area-context";

const screens = [
  { title: "Faded Text", screen: "FadedText" },
  { title: "Interpolations", screen: "Interpolations" },
  { title: "Spotify", screen: "Spotify" },
  { title: "Twitter", screen: "Twitter" },
  { title: "SVG Basics", screen: "SvgBasics" },
  { title: "SVG Dotted Path", screen: "SvgDottedPath" },
  { title: "SVG With Scroll", screen: "SvgWithScroll" },
  { title: "SVG Graph", screen: "SvgGraph" },
  { title: "SVG Pie Chart", screen: "SvgPieChart" },
  { title: "SVG PB Logo", screen: "SvgPBLogo" },
  { title: "SVG Rotating PB Logo", screen: "SvgPBLogoRotate" }
];

export default class HomeScreen extends Component<NavigationStackScreenProps> {
  renderButton = ({ item: { title, screen } }) => (
    <TouchableOpacity
      key={title}
      onPress={() => this.props.navigation.navigate(screen)}
      style={styles.button}
    >
      <Text style={styles.buttonText}>{title}</Text>
      <Icon name="md-arrow-forward" size={28} color="#cdd4db" />
    </TouchableOpacity>
  );
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.screen}>
          <Text style={styles.header}>Home</Text>
          <FlatList
            keyExtractor={({ title }) => title}
            data={screens}
            renderItem={this.renderButton}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b212f"
  },
  screen: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24
  },
  header: {
    fontSize: 32,
    color: "#cdd4db",
    paddingTop: 60,
    paddingBottom: 40
  },
  button: {
    flex: 1,
    height: 60,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#44586a",
    paddingHorizontal: 16,
    marginBottom: 20
  },
  buttonText: {
    fontSize: 18,
    color: "#cdd4db"
  }
});
