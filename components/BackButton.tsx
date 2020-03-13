import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons as Icon } from "@expo/vector-icons";
import { withNavigation, NavigationInjectedProps } from "react-navigation";
import Constants from "expo-constants";

interface Props extends NavigationInjectedProps {
  color?: string;
}

function BackButton({ navigation, color = "white" }: Props) {
  return (
    <TouchableOpacity
      style={styles.backButton}
      onPress={() => navigation.goBack()}
    >
      <Icon name="md-arrow-back" size={32} color={color} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backButton: {
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10
  }
});

export default withNavigation(BackButton);
