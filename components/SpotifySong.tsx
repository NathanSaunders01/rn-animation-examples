import React from "react";
import { View, StyleSheet, Text } from "react-native";

import { SONG_ROW_HEIGHT } from "../utils/constants";

interface Props {
  id: number;
  title: string;
  artist: string;
}

export default function Song({ title, artist, id }: Props) {
  return (
    <View key={id} style={styles.song}>
      <Text style={styles.songTitle}>{title}</Text>
      <Text style={styles.songArtist}>{artist}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  song: {
    height: SONG_ROW_HEIGHT
  },
  songTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "600"
  },
  songArtist: {
    color: "white",
    fontSize: 14,
    opacity: 0.8
  }
});
