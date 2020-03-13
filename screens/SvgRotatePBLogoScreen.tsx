import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Platform
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import { Accelerometer, ThreeAxisMeasurement } from "expo-sensors";

import { BackButton } from "../components";

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface LineProps {
  animation: Animated.AnimatedAddition;
}

const iconSize = 100;

const pbBlue = "#03adef";

const balloonLeftOuterPath =
  "M252.07 373.8L197.72 298.8C195.25 294.13 193.7 291.21 193.08 290.04C179.76 264.86 173.5 236.54 174.98 208.1C175.86 191.11 174.53 216.79 174.98 208.1C177.57 158.23 213.87 116.57 262.91 107.18C266.09 106.57 274.03 105.05 286.73 102.62L320 98.8";
const balloonRightOuterPath =
  "M387.93 373.8L442.28 298.8C444.75 294.13 446.3 291.21 446.92 290.04C460.24 264.86 466.5 236.54 465.02 208.1C464.14 191.11 465.47 216.79 465.02 208.1C462.43 158.23 426.13 116.57 377.09 107.18C373.91 106.57 365.97 105.05 353.27 102.62L320 98.8";
const balloonBottomPath =
  "M378.75 380.33C377.08 379.79 376.04 379.45 375.63 379.32C364.36 375.67 352.59 373.8 340.75 373.8C328.98 373.8 316.71 373.8 306.23 373.8C290.09 373.8 274.02 375.91 258.43 380.07C258.3 380.1 257.97 380.19 257.44 380.33";
const balloonFullPath = `${balloonRightOuterPath} ${balloonBottomPath.replace(
  "M",
  "L"
)} ${balloonLeftOuterPath.replace("M", "L")} ${balloonBottomPath.replace(
  "M",
  "L"
)}`;
const basketTopPath =
  "M355.45 441.87C345.77 440.98 339.73 440.42 337.31 440.2C325.79 439.14 314.2 439.07 302.67 439.99C299.54 440.24 291.72 440.87 279.2 441.87";
const basketOuterPath = `${basketTopPath} h 5 v 68 h 70 z`;
const logoOuterPath =
  "M388 373.8C385.69 376.04 384.25 377.43 383.68 377.99C376.5 384.94 371.07 393.47 367.8 402.91C365.33 410.05 361.73 420.44 358.97 428.41C356.65 435.14 355.69 442.26 356.16 449.36C356.87 460.05 358.6 486.09 359.39 497.97C359.6 501.04 358.46 504.04 356.29 506.22C354.15 508.36 352.28 510.23 350.42 512.09C347.31 515.19 343.1 516.94 338.7 516.94C328.98 516.94 308.75 516.94 299.55 516.94C293.51 516.94 287.75 514.42 283.66 509.98C282.33 508.54 284.88 511.31 283.58 509.9C279.39 505.36 277.2 499.32 277.51 493.14C278.07 482.24 279.1 462.01 279.62 451.82C280.06 443.09 278.81 434.36 275.94 426.11C273.33 418.6 269.93 408.83 267.34 401.38C264.38 392.88 260.16 384.87 254.82 377.63C254.44 377.12 253.5 375.84 252 373.8";

const animationConfig = {
  toValue: 1,
  duration: 5000,
  easing: Easing.bezier(0.64, 0.04, 0.35, 1),
  useNativeDriver: Platform.OS === "android"
};

const basePathConfigs = {
  stroke: pbBlue,
  strokeWidth: 8,
  fill: "none"
};

const animatedPathConfigs = {
  ...basePathConfigs,
  stroke: "white"
};

const animatedPathInterpolations: Animated.InterpolationConfigType = {
  inputRange: [0, 1],
  outputRange: [balloonLeftOuterPath, balloonRightOuterPath],
  extrapolate: "clamp"
};

const animatedStrokeWidthInterpolations: Animated.InterpolationConfigType = {
  inputRange: [0, 0.1, 0.9, 1],
  outputRange: [0, 12, 12, 0],
  extrapolate: "clamp"
};

function getAnimatedLogoStyles(
  animation: Animated.Value,
  translateX: Animated.AnimatedAddition
) {
  return {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [-20, 0, -20]
        })
      },
      {
        translateX
      }
    ]
  };
}

const { timing, loop, Value } = Animated;

function AnimatedLinePath({ animation }: LineProps) {
  const linePath = animation.interpolate(animatedPathInterpolations);
  const strokeWidth = animation.interpolate(animatedStrokeWidthInterpolations);

  return (
    <AnimatedPath
      d={linePath}
      {...animatedPathConfigs}
      strokeWidth={strokeWidth}
    />
  );
}

export default function FullScreenLoading() {
  let subscription;
  const animation = useRef(new Value(0)).current;
  const translateX = useRef(new Value(0)).current;
  const [data, setData] = useState<ThreeAxisMeasurement>({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    Accelerometer.setUpdateInterval(500);
    animateLoadingLoop();
    toggleAccelerometer();
  }, []);

  useEffect(() => {
    animateXAxis();
  }, [data]);

  const toggleAccelerometer = () => {
    if (subscription) {
      unsubscribe();
    } else {
      subscribe();
    }
  };

  const animateXAxis = () => {
    const toValue = Animated.add(translateX, -data.x * 100) as Animated.Value;
    Animated.timing(translateX, {
      toValue,
      duration: 5000,
      easing: Easing.bezier(0.64, 0.04, 0.35, 1),
      useNativeDriver: Platform.OS === "android"
    }).start();
  };

  const subscribe = () => {
    subscription = Accelerometer.addListener(accelerometerData => {
      setData(accelerometerData);
    });
  };

  const unsubscribe = () => {
    subscription && subscription.remove();
    subscription = null;
  };

  const animateLoadingLoop = () => {
    loop(timing(animation, animationConfig)).start();
  };

  const logoAnimatedStyled = getAnimatedLogoStyles(animation, translateX);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screen}>
        <BackButton color={pbBlue} />
        <Animated.View style={logoAnimatedStyled}>
          <Svg height={iconSize} width={iconSize} viewBox="0 0 640 615">
            <Path d={basketOuterPath} {...basePathConfigs} fill={pbBlue} />
            <Path d={balloonFullPath} {...basePathConfigs} fill={pbBlue} />
            <Path d={logoOuterPath} {...basePathConfigs} />
            {[...Array(4)].map((_, i) => {
              const diff = (i - 1) * 0.5 - 0.25;
              const animatedValue = Animated.add(animation, diff);
              return <AnimatedLinePath key={i} animation={animatedValue} />;
            })}
          </Svg>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  screen: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center"
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
