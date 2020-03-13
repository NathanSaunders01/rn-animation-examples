import React, { PureComponent } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackButton } from "../components";

const ANIMATION_TIMELINE_START = 0;
const ANIMATION_TIMELINE_END = 1;

interface State {
  bubbles: number[];
}

export default class SvgBasicsScreen extends PureComponent {
  animation = new Animated.Value(0);

  state: State = {
    bubbles: []
  };

  componentDidUpdate = () => {
    if (this.state.bubbles.length) this.animateBubbles();
  };

  animateBubbles = () => {
    this.animation.setValue(0);
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.animation, {
          toValue: ANIMATION_TIMELINE_END,
          duration: 1000,
          easing: Easing.linear
        }),
        Animated.timing(this.animation, {
          toValue: ANIMATION_TIMELINE_START,
          duration: 1000,
          easing: Easing.linear
        })
      ])
    ).start();
  };

  setBubbleCount = (count: number) =>
    this.setState({ bubbles: [...Array(count)].fill(0) });

  resetValues = () => this.setState({ bubbles: [] });

  render() {
    const { bubbles } = this.state;
    const range = ANIMATION_TIMELINE_END / bubbles.length;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.screen}>
          <BackButton />
          <Text style={styles.header}>Interpolation Basics</Text>
          <View style={styles.svgContainer}>
            {bubbles.map((_, i) => {
              const start = i * range;
              const end = start + range;
              const opacity = this.animation.interpolate({
                inputRange: [start, end],
                outputRange: [0, 1]
              });
              return (
                <Animated.View key={i} style={[styles.bubble, { opacity }]} />
              );
            })}
          </View>
          <View style={styles.controls}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.setBubbleCount(1)}
            >
              <Text style={styles.buttonText}>One bubble</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.setBubbleCount(2)}
            >
              <Text style={styles.buttonText}>Two bubbles</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.setBubbleCount(3)}
            >
              <Text style={styles.buttonText}>Three bubbles</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={this.resetValues}>
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
          </View>
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
    paddingBottom: 0
  },
  svgContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  bubble: {
    height: 48,
    width: 48,
    borderRadius: 24,
    backgroundColor: "white",
    marginHorizontal: 20
  },
  controls: {
    height: 280,
    justifyContent: "space-between"
  },
  button: {
    flex: 1,
    // height: 60,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#44586a",
    marginBottom: 20
  },
  buttonText: {
    fontSize: 18,
    color: "#cdd4db"
  }
});
