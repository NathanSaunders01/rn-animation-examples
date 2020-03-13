import React from "react";
import { View, StyleSheet } from "react-native";

interface Props {
  index: number;
}

export default function Card({ index }: Props) {
  return (
    <View style={[styles.card, index === 0 && styles.initCard]}>
      <View style={styles.header} />
      <View style={styles.line} />
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    height: 160,
    padding: 12,
    marginBottom: 20,
    justifyContent: "space-between"
  },
  header: {
    width: "50%",
    backgroundColor: "lightgray",
    borderRadius: 16,
    height: 32
  },
  line: {
    width: "100%",
    backgroundColor: "lightgray",
    borderRadius: 16,
    height: 32
  },
  initCard: {
    borderTopColor: "lightgrey",
    borderTopWidth: 2
  }
});
