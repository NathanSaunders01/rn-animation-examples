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
import { SVG_SIDE_LENGTH } from "../utils/constants";
import { BackButton } from "../components";

const AnimatedPath = Animated.createAnimatedComponent(Path);

const paths = [
  `M0 0 H ${SVG_SIDE_LENGTH}`,
  `M0 ${SVG_SIDE_LENGTH} V ${-SVG_SIDE_LENGTH}`,
  `M${SVG_SIDE_LENGTH} ${SVG_SIDE_LENGTH} H ${-SVG_SIDE_LENGTH}`,
  `M${SVG_SIDE_LENGTH} 0 V ${SVG_SIDE_LENGTH}`
];

const animateToValueOneConfig = {
  duration: 500,
  toValue: 1
};

const animateToValueZeroConfig = {
  duration: 500,
  toValue: 0
};

const strokeDashoffsetInterpolation = {
  inputRange: [0, 1],
  outputRange: [-SVG_SIDE_LENGTH, 0]
};

export default class SvgBasicsScreen extends PureComponent {
  pathOneAnimation: Animated.Value = new Animated.Value(1);
  pathTwoAnimation: Animated.Value = new Animated.Value(1);
  pathThreeAnimation: Animated.Value = new Animated.Value(1);
  pathFourAnimation: Animated.Value = new Animated.Value(1);

  animateToOneArray = [
    Animated.timing(this.pathOneAnimation, animateToValueOneConfig),
    Animated.timing(this.pathTwoAnimation, animateToValueOneConfig),
    Animated.timing(this.pathThreeAnimation, animateToValueOneConfig),
    Animated.timing(this.pathFourAnimation, animateToValueOneConfig)
  ];

  animateToZeroArray = [
    Animated.timing(this.pathOneAnimation, animateToValueZeroConfig),
    Animated.timing(this.pathTwoAnimation, animateToValueZeroConfig),
    Animated.timing(this.pathThreeAnimation, animateToValueZeroConfig),
    Animated.timing(this.pathFourAnimation, animateToValueZeroConfig)
  ];

  resetValues = () => {
    this.pathOneAnimation.setValue(0);
    this.pathTwoAnimation.setValue(0);
    this.pathThreeAnimation.setValue(0);
    this.pathFourAnimation.setValue(0);
  };

  animateConsecutive = () => {
    this.resetValues();
    Animated.sequence(this.animateToOneArray).start();
  };

  animateSimultaneous = () => {
    this.resetValues();
    Animated.parallel(this.animateToOneArray).start();
  };

  animateLoop = () => {
    this.resetValues();
    Animated.loop(
      Animated.sequence([
        Animated.parallel(this.animateToZeroArray),
        Animated.parallel(this.animateToOneArray)
      ])
    ).start();
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.screen}>
          <BackButton />
          <Text style={styles.header}>SVG Basics</Text>
          <View style={styles.svgContainer}>
            <Svg height={SVG_SIDE_LENGTH} width={SVG_SIDE_LENGTH}>
              <AnimatedPath
                key={paths[0]}
                d={paths[0]}
                stroke="white"
                strokeWidth={2}
                strokeDasharray={SVG_SIDE_LENGTH}
                strokeDashoffset={this.pathOneAnimation.interpolate(
                  strokeDashoffsetInterpolation
                )}
              />
              <AnimatedPath
                key={paths[1]}
                d={paths[1]}
                stroke="white"
                strokeWidth={2}
                strokeDasharray={SVG_SIDE_LENGTH}
                strokeDashoffset={this.pathTwoAnimation.interpolate(
                  strokeDashoffsetInterpolation
                )}
              />
              <AnimatedPath
                key={paths[2]}
                stroke="white"
                strokeWidth={2}
                d={paths[2]}
                strokeDasharray={SVG_SIDE_LENGTH}
                strokeDashoffset={this.pathThreeAnimation.interpolate(
                  strokeDashoffsetInterpolation
                )}
              />
              <AnimatedPath
                key={paths[3]}
                stroke="white"
                strokeWidth={2}
                d={paths[3]}
                strokeDasharray={SVG_SIDE_LENGTH}
                strokeDashoffset={this.pathFourAnimation.interpolate(
                  strokeDashoffsetInterpolation
                )}
              />
            </Svg>
          </View>
          <View style={styles.controls}>
            <TouchableOpacity
              style={styles.button}
              onPress={this.animateConsecutive}
            >
              <Text style={styles.buttonText}>Consecutive</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={this.animateSimultaneous}
            >
              <Text style={styles.buttonText}>Simultaneous</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={this.animateLoop}>
              <Text style={styles.buttonText}>Loop</Text>
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
