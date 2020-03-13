import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BackButton } from "../components";

interface State {
  show: boolean;
}

export default class FadedTextScreen extends React.Component {
  opacity = new Animated.Value(0);

  state: State = {
    show: false
  };

  componentDidUpdate() {
    if (this.state.show) {
      this.animateInText();
    } else {
      this.animateOutText();
    }
  }

  animateInText = () => {
    Animated.timing(this.opacity, {
      duration: 1000,
      toValue: 1,
      easing: Easing.linear,
      useNativeDriver: true // Ensures animations run smoothly on Android
    }).start();
  };

  animateOutText = () => {
    Animated.timing(this.opacity, {
      duration: 1000,
      toValue: 0,
      easing: Easing.linear,
      useNativeDriver: true // Ensures animations run smoothly on Android
    }).start();
  };

  toggleShow = () => {
    this.setState((prevState: State) => ({
      show: !prevState.show
    }));
  };

  render() {
    const { show } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.screen}>
          <BackButton />
          <View style={styles.content}>
            <Animated.Text style={[styles.text, { opacity: this.opacity }]}>
              Hello World!
            </Animated.Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={this.toggleShow}>
            <Text style={styles.buttonText}>{show ? "Hide" : "Show"}</Text>
          </TouchableOpacity>
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
    paddingHorizontal: 24
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    flex: 1,
    maxHeight: 60,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#44586a",
    paddingHorizontal: 16,
    marginBottom: 20
  },
  text: {
    fontSize: 32,
    color: "#cdd4db"
  },
  buttonText: {
    fontSize: 18,
    color: "#cdd4db"
  }
});
