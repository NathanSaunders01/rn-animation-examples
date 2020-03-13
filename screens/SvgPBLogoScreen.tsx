import React, { useState, useEffect, PureComponent } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Animated,
  Easing,
  Alert,
  Dimensions
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path, Circle } from "react-native-svg";
import * as path from "svg-path-properties";
import { BackButton } from "../components";

const AnimatedPath = Animated.createAnimatedComponent(Path);

const LeftOuterPath = ({ animatedValue }) => {
  const linePath =
    "M320 492.78L299.14 492.78C299.14 492.78 299.14 492.78 299.14 492.78C289.02 489.78 282.07 480.48 282.07 469.92C282.07 463.01 282.07 445.72 282.07 418.07C279.83 411.36 278.44 407.17 277.88 405.5C270 381.87 258.09 359.79 242.68 340.24C238.15 334.5 226.84 320.15 208.75 297.2C198.62 282.2 192.29 272.82 189.75 269.07C157.94 221.97 170.33 157.99 217.44 126.18C223.41 122.15 200.38 137.7 217.44 126.18C237.19 112.84 259.06 102.94 282.11 96.9C286.45 95.77 279.96 97.47 288.13 95.33C298.53 92.6 309.24 91.22 320 91.22C320 91.22 320 91.22 320 91.22";
  const properties = path.svgPathProperties(linePath);
  const pathLength = properties.getTotalLength();

  return (
    <AnimatedPath
      d={linePath}
      stroke="#03adef"
      strokeWidth={10}
      fill="none"
      strokeDasharray={pathLength}
      strokeDashoffset={animatedValue.interpolate({
        inputRange: [0, 0.8],
        outputRange: [pathLength, 0],
        extrapolate: "clamp"
      })}
    />
  );
};

const RightOuterPath = ({ animatedValue }) => {
  const linePath =
    "M320 492.78L340.86 492.78C340.86 492.78 340.86 492.78 340.86 492.78C350.98 489.78 357.93 480.48 357.93 469.92C357.93 463.01 357.93 445.72 357.93 418.07C360.17 411.36 361.56 407.17 362.12 405.5C370 381.87 381.91 359.79 397.32 340.24C401.85 334.5 413.16 320.15 431.25 297.2C441.38 282.2 447.71 272.82 450.25 269.07C482.06 221.97 469.67 157.99 422.56 126.18C416.59 122.15 439.62 137.7 422.56 126.18C402.81 112.84 380.94 102.94 357.89 96.9C353.55 95.77 360.04 97.47 351.87 95.33C341.47 92.6 330.76 91.22 320 91.22C320 91.22 320 91.22 320 91.22";
  const properties = path.svgPathProperties(linePath);
  const pathLength = properties.getTotalLength();

  return (
    <AnimatedPath
      d={linePath}
      stroke="#03adef"
      strokeWidth={10}
      fill="none"
      strokeDasharray={pathLength}
      strokeDashoffset={animatedValue.interpolate({
        inputRange: [0, 0.8],
        outputRange: [pathLength, 0],
        extrapolate: "clamp"
      })}
    />
  );
};

const LeftInnerPath = ({ animatedValue }) => {
  const linePath =
    "M320 91.22C310.71 94.53 304.9 96.59 302.58 97.42C289.99 101.9 278.94 109.87 270.72 120.4C268.39 123.38 273.24 117.17 270.72 120.4C263.03 130.25 257.29 141.48 253.8 153.48C252.25 158.81 253.92 153.07 252.63 157.51C248.28 172.49 246.46 188.09 247.24 203.68C247.77 214.14 247.13 201.43 247.4 206.75C249.04 239.27 257.02 271.16 270.88 300.62C274.21 307.69 282.54 325.39 295.86 353.7";
  const properties = path.svgPathProperties(linePath);
  const pathLength = properties.getTotalLength();

  return (
    <AnimatedPath
      d={linePath}
      stroke="#03adef"
      strokeWidth={10}
      fill="none"
      strokeDasharray={pathLength}
      strokeDashoffset={animatedValue.interpolate({
        inputRange: [0, 0.8],
        outputRange: [-pathLength, 0],
        extrapolate: "clamp"
      })}
    />
  );
};

const RightInnerPath = ({ animatedValue }) => {
  const linePath =
    "M320 91.22C329.29 94.53 335.1 96.59 337.42 97.42C350.01 101.9 361.06 109.87 369.28 120.4C371.61 123.38 366.76 117.17 369.28 120.4C376.97 130.25 382.71 141.48 386.2 153.48C387.75 158.81 386.08 153.07 387.37 157.51C391.72 172.49 393.54 188.09 392.76 203.68C392.23 214.14 392.87 201.43 392.6 206.75C390.96 239.27 382.98 271.16 369.12 300.62C365.79 307.69 357.46 325.39 344.14 353.7";
  const properties = path.svgPathProperties(linePath);
  const pathLength = properties.getTotalLength();

  return (
    <AnimatedPath
      d={linePath}
      stroke="#03adef"
      strokeWidth={10}
      fill="none"
      strokeDasharray={pathLength}
      strokeDashoffset={animatedValue.interpolate({
        inputRange: [0, 0.8],
        outputRange: [-pathLength, 0],
        extrapolate: "clamp"
      })}
    />
  );
};

const BalloonBottomPath = ({ animatedValue }) => {
  const linePath =
    "M380.92 364.05C376.02 362.58 372.95 361.66 371.73 361.29C354.96 356.26 337.54 353.7 320.03 353.7C314.74 353.7 325.31 353.7 320.03 353.7C302.48 353.7 285.02 356.26 268.21 361.31C266.99 361.67 263.95 362.59 259.08 364.05";
  const properties = path.svgPathProperties(linePath);
  const pathLength = properties.getTotalLength();

  return (
    <AnimatedPath
      d={linePath}
      stroke="#03adef"
      strokeWidth={10}
      fill="none"
      strokeDasharray={pathLength}
      strokeDashoffset={animatedValue.interpolate({
        inputRange: [0, 0.8],
        outputRange: [-pathLength, 0],
        extrapolate: "clamp"
      })}
    />
  );
};

const BasketTopPath = ({ animatedValue }) => {
  const linePath =
    "M357.25 422.67C355.69 422.43 354.71 422.28 354.32 422.22C331.19 418.71 307.67 418.79 284.57 422.47C284.4 422.49 283.98 422.56 283.31 422.67";
  const properties = path.svgPathProperties(linePath);
  const pathLength = properties.getTotalLength();

  return (
    <AnimatedPath
      d={linePath}
      stroke="#03adef"
      strokeWidth={10}
      fill="none"
      strokeDasharray={pathLength}
      strokeDashoffset={animatedValue.interpolate({
        inputRange: [0, 0.8],
        outputRange: [-pathLength, 0],
        extrapolate: "clamp"
      })}
    />
  );
};

const PerkboxLogo = () => {
  const animateStepOneValue = new Animated.Value(0);
  const animateStepTwoValue = new Animated.Value(0);
  const animateStepThreeValue = new Animated.Value(0);
  const animateStepFourValue = new Animated.Value(0);

  useEffect(() => {
    animateStepOne();
    // animateStepTwo();
    animateStepThree();
    animateStepFour();
  }, []);

  const animateStepOne = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animateStepOneValue, {
          toValue: 1,
          duration: 3000,
          easing: Easing.linear,
          useNativeDriver: true
        }),
        Animated.timing(animateStepOneValue, {
          toValue: 0,
          duration: 3000,
          easing: Easing.linear,
          useNativeDriver: true
        })
      ])
    ).start();
  };

  const animateStepTwo = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animateStepTwoValue, {
          toValue: 1,
          duration: 3000,
          // delay: 500,
          easing: Easing.linear,
          useNativeDriver: true
        }),
        Animated.timing(animateStepTwoValue, {
          toValue: 0,
          duration: 3000,
          // delay: 500,
          easing: Easing.linear,
          useNativeDriver: true
        })
      ])
    ).start();
  };

  const animateStepThree = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animateStepThreeValue, {
          toValue: 1,
          duration: 3000,
          // delay: 3500,
          easing: Easing.linear,
          useNativeDriver: true
        }),
        Animated.timing(animateStepThreeValue, {
          toValue: 0,
          duration: 3000,
          // delay: 3500,
          easing: Easing.linear,
          useNativeDriver: true
        })
      ])
    ).start();
  };

  const animateStepFour = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animateStepFourValue, {
          toValue: 1,
          duration: 2500,
          delay: 500,
          easing: Easing.linear,
          useNativeDriver: true
        }),
        Animated.timing(animateStepFourValue, {
          toValue: 0,
          duration: 2500,
          // delay: 4500,
          easing: Easing.linear,
          useNativeDriver: true
        }),
        Animated.timing(animateStepFourValue, {
          toValue: 0,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true
        })
      ])
    ).start();
  };

  return (
    <Svg viewBox="0 0 640 586" width="240" height="240">
      <LeftOuterPath animatedValue={animateStepOneValue} />
      <RightOuterPath animatedValue={animateStepOneValue} />
      <BalloonBottomPath animatedValue={animateStepFourValue} />
      <BasketTopPath animatedValue={animateStepFourValue} />
      <LeftInnerPath animatedValue={animateStepThreeValue} />
      <RightInnerPath animatedValue={animateStepThreeValue} />
    </Svg>
  );
};

export default class SvgGraphScreen extends PureComponent {
  animation = new Animated.Value(0);
  componentDidMount = () => {
    Animated.timing(this.animation, {
      toValue: 1,
      duration: 1000
    }).start();
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.screen}>
          <BackButton />
          <Text style={styles.header}>SVG pie chart</Text>
          <View style={styles.content}>
            <PerkboxLogo />
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
    paddingVertical: 12
  },
  scrollContainer: {
    ...StyleSheet.absoluteFillObject
  },
  header: {
    fontSize: 32,
    color: "#cdd4db",
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 24
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    position: "absolute",
    height: 72,
    width: 72,
    alignItems: "center",
    justifyContent: "center"
  }
});
