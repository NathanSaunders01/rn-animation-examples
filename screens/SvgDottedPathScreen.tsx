import React, { PureComponent } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import * as path from "svg-path-properties";
import { BackButton } from "../components";

const AnimatedPath = Animated.createAnimatedComponent(Path);

const dottedLinePath =
  "M 13.525 72.814 C 13.525 72.814 50.727 15.012 82.326 27.599 C 113.925 40.185 132.384 91.86 177 86.907 C 221.616 81.954 240.802 66.061 254.033 49.326 C 267.264 32.59 243.154 7.047 231.1 7.047 C 219.045 7.047 196.699 30.828 210.518 49.326 C 224.337 67.823 249.476 86.76 285.199 93.953 C 320.923 101.147 348.708 72.814 348.708 72.814";

const lineProperties = path.svgPathProperties(dottedLinePath);
const lineLength = lineProperties.getTotalLength();

const animateToValueOneConfig = {
  duration: 10000,
  toValue: 1
};

const animateToValueZeroConfig = {
  duration: 10000,
  toValue: 0
};

export default class SvgBasicsScreen extends PureComponent {
  pathAnimation: Animated.Value = new Animated.Value(0);

  resetValues = () => {
    this.pathAnimation.setValue(0);
  };

  animateLoop = () => {
    this.resetValues();
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.pathAnimation, animateToValueOneConfig),
        Animated.timing(this.pathAnimation, animateToValueZeroConfig)
      ])
    ).start();
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.screen}>
          <BackButton />
          <Text style={styles.header}>SVG Dotted Path</Text>
          <View style={styles.svgContainer}>
            <Svg height={101} width={354}>
              <AnimatedPath
                fill="none"
                strokeWidth="4"
                strokeDasharray="10"
                d={dottedLinePath}
                strokeOpacity={1}
                stroke="white"
              />
              <AnimatedPath
                fill="none"
                strokeWidth="8"
                strokeDasharray={lineLength}
                d={dottedLinePath}
                stroke="#0b212f"
                strokeDashoffset={this.pathAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -lineLength]
                })}
              />
            </Svg>
          </View>
          <View style={styles.controls}>
            <TouchableOpacity style={styles.button} onPress={this.animateLoop}>
              <Text style={styles.buttonText}>Play</Text>
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
    alignItems: "center",
    justifyContent: "center"
  },
  controls: {
    height: 140,
    justifyContent: "space-between"
  },
  button: {
    flex: 1,
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
