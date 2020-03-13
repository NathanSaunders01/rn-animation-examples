import React, { PureComponent } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Animated,
  Alert,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Dimensions,
  Platform
} from "react-native";
import Constants from "expo-constants";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import * as path from "svg-path-properties";

import { SVG_SIDE_LENGTH } from "../utils/constants";
import { BackButton } from "../components";
import { calculateArcPath } from "../utils/helpers";

const { height } = Dimensions.get("window");

const AnimatedPath = Animated.createAnimatedComponent(Path);

const circlePath = calculateArcPath(
  SVG_SIDE_LENGTH / 2,
  SVG_SIDE_LENGTH / 2,
  SVG_SIDE_LENGTH / 2 - 3,
  0,
  359.9
);
const circlePathProperties = path.svgPathProperties(circlePath);
const strokeDasharray = circlePathProperties.getTotalLength();

export default class SvgWithScrollScreen extends PureComponent {
  scrollY = new Animated.Value(0);
  alertPresent = false;

  componentDidMount = () => {
    const threshold = Platform.OS === "android" ? 100 : -100;
    this.scrollY.addListener(({ value }) => {
      if (value < threshold && !this.alertPresent) {
        this.alertPresent = true;
        Alert.alert("Camera activated", null, [
          {
            text: "Cancel",
            onPress: () => (this.alertPresent = false),
            style: "cancel"
          },
          { text: "OK", onPress: () => (this.alertPresent = false) }
        ]);
      }
    });
  };

  handleScrollEventAlternative = Animated.event(
    [{ nativeEvent: { contentOffset: { y: this.scrollY } } }],
    { useNativeDriver: true }
  );

  handleScrollEvent = ({
    nativeEvent: {
      contentOffset: { y }
    }
  }: NativeSyntheticEvent<NativeScrollEvent>) => this.scrollY.setValue(y);

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.screen}>
          <BackButton />
          <Text style={styles.header}>SVG with scroll</Text>
          <Text style={styles.subheader}>
            iOS: Swipe down to activate camera
          </Text>
          <Text style={styles.subheader}>
            Android: Swipe up to activate camera
          </Text>
          <View style={styles.svgContainer}>
            <Svg height={SVG_SIDE_LENGTH} width={SVG_SIDE_LENGTH}>
              <AnimatedPath
                d={circlePath}
                fill="none"
                stroke="white"
                strokeWidth={6}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={this.scrollY.interpolate({
                  inputRange: [-100, 0],
                  outputRange: [0, -strokeDasharray]
                })}
              />
            </Svg>
            <View style={styles.icon}>
              <FontAwesome name="camera" size={56} color="white" />
            </View>
          </View>
          <ScrollView
            overScrollMode={"always"}
            onScroll={this.handleScrollEvent}
            style={styles.scrollContainer}
            contentContainerStyle={styles.scrollContent}
            scrollEventThrottle={16}
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
  scrollContainer: {
    ...StyleSheet.absoluteFillObject,
    top: 60 + Constants.statusBarHeight,
    zIndex: 20
  },
  header: {
    fontSize: 32,
    color: "#cdd4db",
    paddingTop: 60,
    paddingBottom: 20
  },
  subheader: {
    fontSize: 20,
    color: "#cdd4db",
    paddingBottom: 20
  },
  svgContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  scrollContent: {
    height: height * 2
  },
  icon: {
    position: "absolute",
    height: 72,
    width: 72,
    alignItems: "center",
    justifyContent: "center"
  }
});
