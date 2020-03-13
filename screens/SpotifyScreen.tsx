import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Animated
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  PanGestureHandler,
  State as GestureState,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerStateChangeEvent
} from "react-native-gesture-handler";
import Constants from "expo-constants";

import AlbumImg from "../assets/eminem_album_cover.png";
import { BackButton, SpotifySong } from "../components";
import albumData from "../utils/spotifyAlbumData";
import {
  ALBUM_CONTENT_HEIGHT,
  ALBUM_COVER_HEIGHT,
  MAX_SCROLL_Y,
  HEADER_HEIGHT,
  SHUFFLE_BUTTON_HEIGHT,
  MAX_SHUFFLE_BUTTON_SCROLL
} from "../utils/constants";

const { width } = Dimensions.get("window");

interface AnimatedComponentProps {
  dragY: Animated.AnimatedInterpolation;
}

export default class SpotifyScreen extends Component {
  dragY = new Animated.Value(0);
  offsetY = 0;

  panHandler = ({
    nativeEvent: { translationY }
  }: PanGestureHandlerGestureEvent) => {
    this.dragY.setValue(translationY + this.offsetY);
  };

  handleStateChange = ({
    nativeEvent: { state, translationY }
  }: PanGestureHandlerStateChangeEvent) => {
    if (state === GestureState.END) {
      this.offsetY = translationY + this.offsetY;
    }
  };

  render() {
    const clampedY = Animated.diffClamp(this.dragY, MAX_SCROLL_Y, 0);

    return (
      <PanGestureHandler
        onGestureEvent={this.panHandler}
        onHandlerStateChange={this.handleStateChange}
      >
        <View style={styles.container}>
          <Header dragY={clampedY} />
          <AlbumCover dragY={clampedY} />
          <ShuffleButton dragY={clampedY} />
          <Animated.View
            style={[
              styles.content,
              {
                transform: [{ translateY: clampedY }]
              }
            ]}
          >
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.9)", "rgba(0,0,0,1)"]}
              style={styles.linearGradient}
            />
            {albumData.map(song => (
              <SpotifySong key={song.title} {...song} />
            ))}
          </Animated.View>
        </View>
      </PanGestureHandler>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  },
  header: {
    width,
    position: "absolute",
    top: 0,
    zIndex: 100,
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 20
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    height: 60
  },
  headerTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "600"
  },
  linearGradient: {
    position: "absolute",
    height: 160,
    top: -160,
    width
  },
  text: {
    color: "white",
    fontSize: 12,
    fontWeight: "600"
  },
  albumContainer: {
    height: ALBUM_COVER_HEIGHT,
    width,
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "center"
  },
  albumCover: {
    width: 160,
    height: 160,
    marginBottom: 20
  },
  albumName: {
    fontSize: 24,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
    marginBottom: 12
  },
  followButton: {
    borderColor: "gray",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 2,
    paddingHorizontal: 12,
    borderRadius: 24
  },
  shuffleButton: {
    backgroundColor: "#1DB954",
    height: SHUFFLE_BUTTON_HEIGHT,
    paddingHorizontal: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 36
  },
  shuffleText: {
    color: "white",
    fontSize: 16,
    letterSpacing: 1,
    fontWeight: "600"
  },
  shuffleWrapper: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 120
  },
  content: {
    backgroundColor: "black",
    width,
    height: ALBUM_CONTENT_HEIGHT,
    paddingHorizontal: 16,
    paddingTop: 30
  }
});

function Header({ dragY }: AnimatedComponentProps) {
  const backgroundColor = dragY.interpolate({
    inputRange: [
      -ALBUM_COVER_HEIGHT + HEADER_HEIGHT / 2,
      -ALBUM_COVER_HEIGHT + HEADER_HEIGHT
    ],
    outputRange: ["rgba(0,0,0,1)", "transparent"],
    extrapolate: "clamp"
  });
  const textOpacity = dragY.interpolate({
    inputRange: [-ALBUM_COVER_HEIGHT, 0],
    outputRange: [1, 0],
    extrapolate: "clamp"
  });
  return (
    <Animated.View style={[styles.header, { backgroundColor }]}>
      <View style={styles.headerContainer}>
        <BackButton />
        <Animated.Text style={[styles.headerTitle, { opacity: textOpacity }]}>
          Eminem - The Eminem Show
        </Animated.Text>
      </View>
    </Animated.View>
  );
}

function AlbumCover({ dragY }: AnimatedComponentProps) {
  const backgroundColor = dragY.interpolate({
    inputRange: [-ALBUM_COVER_HEIGHT, 0],
    outputRange: ["rgba(0,0,0,0.8)", "rgba(155,121,136,0.6)"],
    extrapolate: "clamp"
  });

  const opacity = dragY.interpolate({
    inputRange: [-ALBUM_COVER_HEIGHT, 0],
    outputRange: [0.6, 1],
    extrapolate: "clamp"
  });

  const scale = dragY.interpolate({
    inputRange: [-ALBUM_COVER_HEIGHT, 0],
    outputRange: [0.7, 1],
    extrapolate: "clamp"
  });

  return (
    <Animated.View style={[styles.albumContainer, { backgroundColor }]}>
      <Animated.View
        style={{
          alignItems: "center",
          justifyContent: "center",
          opacity,
          transform: [{ scale }]
        }}
      >
        <Image source={AlbumImg} style={styles.albumCover} />
        <Text style={styles.albumName}>Eminem - The Eminem Show</Text>
        <TouchableOpacity activeOpacity={0.75} style={styles.followButton}>
          <Text style={styles.text}>FOLLOW</Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
}

function ShuffleButton({ dragY }: AnimatedComponentProps) {
  const buttonScroll = dragY.interpolate({
    inputRange: [MAX_SHUFFLE_BUTTON_SCROLL, 0],
    outputRange: [MAX_SHUFFLE_BUTTON_SCROLL, 0],
    extrapolate: "clamp"
  });
  return (
    <Animated.View
      style={[
        styles.shuffleWrapper,
        {
          transform: [{ translateY: buttonScroll }]
        }
      ]}
    >
      <TouchableOpacity activeOpacity={0.75} style={styles.shuffleButton}>
        <Text style={styles.shuffleText}>SHUFFLE PLAY</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
