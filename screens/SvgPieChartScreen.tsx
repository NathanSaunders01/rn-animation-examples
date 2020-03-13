import React, { PureComponent } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

import { BackButton } from "../components";
import { calculateArcPath } from "../utils/helpers";

const AnimatedPath = Animated.createAnimatedComponent(Path);

const CHART_HEIGHT = 240;
const SVG_PADDING = 10;
const SVG_HEIGHT = CHART_HEIGHT + 2 * SVG_PADDING;
const SVG_WIDTH = SVG_HEIGHT;

export default class SvgGraphScreen extends PureComponent {
  animation = new Animated.Value(0);

  componentDidMount = () => {
    Animated.timing(this.animation, {
      toValue: 1,
      duration: 1000
    }).start();
  };

  createInterpolationRanges = (endAngle: number) => {
    const dRange = [];
    const iRange = [];
    for (let i = 0; i < endAngle; i++) {
      dRange.push(
        calculateArcPath(SVG_WIDTH / 2, SVG_HEIGHT / 2, CHART_HEIGHT / 2, 0, i)
      );
      iRange.push(i / (endAngle - 1));
    }

    return { dRange, iRange };
  };

  render() {
    const {
      dRange: firstDRange,
      iRange: firstIRange
    } = this.createInterpolationRanges(180);
    const {
      dRange: secondDRange,
      iRange: secondIRange
    } = this.createInterpolationRanges(359.99);
    const {
      dRange: thirdDRange,
      iRange: thirdIRange
    } = this.createInterpolationRanges(270);
    const firstDPath = this.animation.interpolate({
      inputRange: firstIRange,
      outputRange: firstDRange
    });
    const secondDPath = this.animation.interpolate({
      inputRange: secondIRange,
      outputRange: secondDRange
    });
    const thirdDPath = this.animation.interpolate({
      inputRange: thirdIRange,
      outputRange: thirdDRange
    });
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.screen}>
          <BackButton />
          <Text style={styles.header}>SVG pie chart</Text>
          <View style={styles.content}>
            <Svg height={SVG_HEIGHT} width={SVG_WIDTH}>
              <AnimatedPath
                d={secondDPath}
                fill="none"
                stroke="blue"
                strokeWidth={20}
              />
              <AnimatedPath
                d={thirdDPath}
                fill="none"
                stroke="yellow"
                strokeWidth={20}
              />
              <AnimatedPath
                d={firstDPath}
                fill="none"
                stroke="green"
                strokeWidth={20}
              />
            </Svg>
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
