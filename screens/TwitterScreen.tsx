import React, { PureComponent } from "react";
import {
  View,
  StyleSheet,
  Animated,
  ScrollView,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent
} from "react-native";
import Constants from "expo-constants";

import { BackButton } from "../components";
import { TwitterCard } from "../components";
import {
  STEP_ONE_ANIMATION_THRESHOLD,
  START_HEADER_HEIGHT,
  END_HEADER_HEIGHT,
  STEP_TWO_ANIMATION_THRESHOLD
} from "../utils/constants";

const { width } = Dimensions.get("window");

interface HeaderProps {
  scrollX: Animated.Value;
}

function Header({ scrollX }: HeaderProps) {
  const height = scrollX.interpolate({
    inputRange: [0, STEP_ONE_ANIMATION_THRESHOLD],
    outputRange: [START_HEADER_HEIGHT, END_HEADER_HEIGHT],
    extrapolate: "clamp"
  });
  const zIndex = scrollX.interpolate({
    inputRange: [0, STEP_ONE_ANIMATION_THRESHOLD, STEP_TWO_ANIMATION_THRESHOLD],
    outputRange: [-10, 1, 10],
    extrapolate: "clamp"
  });

  return (
    <Animated.View style={[styles.header, { zIndex, height }]}>
      <View>
        <BackButton />
      </View>
    </Animated.View>
  );
}

export default class TwitterScreen extends PureComponent {
  scrollY: Animated.Value = new Animated.Value(0);

  handleScrollAlternative = ({
    nativeEvent: {
      contentOffset: { y }
    }
  }: NativeSyntheticEvent<NativeScrollEvent>) => this.scrollY.setValue(y);

  handleScrollEvent = Animated.event(
    [{ nativeEvent: { contentOffset: { y: this.scrollY } } }],
    { useNativeDriver: true }
  );

  render() {
    const scale = this.scrollY.interpolate({
      inputRange: [0, STEP_ONE_ANIMATION_THRESHOLD],
      outputRange: [1, 0.6],
      extrapolate: "clamp"
    });
    const translateY = this.scrollY.interpolate({
      inputRange: [
        0,
        STEP_ONE_ANIMATION_THRESHOLD,
        STEP_TWO_ANIMATION_THRESHOLD
      ],
      outputRange: [0, 40, -160],
      extrapolate: "clamp"
    });

    const cards = [...Array(12)].map((_, i) => (
      <TwitterCard key={i} index={i} />
    ));

    return (
      <View style={styles.container}>
        <Header scrollX={this.scrollY} />
        <View style={{ flex: 1 }}>
          <Animated.View
            style={[
              styles.profileIcon,
              { transform: [{ scale }, { translateY }] }
            ]}
          />
          <ScrollView
            contentContainerStyle={styles.scrollView}
            // onScroll={this.handleScrollAlternative}
            onScroll={this.handleScrollEvent}
            scrollEventThrottle={16}
          >
            {cards}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    width,
    paddingTop: 160
  },
  header: {
    backgroundColor: "#1DA1F2",
    width,
    paddingTop: Constants.statusBarHeight
  },
  profileIcon: {
    backgroundColor: "green",
    height: 80,
    width: 80,
    borderRadius: 60,
    position: "absolute",
    top: -40,
    left: 20,
    borderColor: "white",
    borderWidth: 3
  }
});
