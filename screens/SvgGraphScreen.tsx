import React, { PureComponent, createRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Animated,
  Alert,
  Dimensions
} from "react-native";
import {
  PanGestureHandler,
  State as GestureState,
  PanGestureHandlerStateChangeEvent,
  PanGestureHandlerGestureEvent
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";
import * as path from "svg-path-properties";
import * as shape from "d3-shape";
import { format } from "date-fns";
import { scaleTime, scaleLinear, scaleQuantile } from "d3-scale";

import { BackButton } from "../components";

const d3 = {
  shape
};

const AnimatedPath = Animated.createAnimatedComponent(Path);

const { width } = Dimensions.get("window");
const height = 320;
const cursorRadius = 8;
const cursorBorderWidth = 6;
const cursorRadiusWithBorder = cursorRadius + cursorBorderWidth / 2;

Array.prototype.hasMax = function (attrib) {
  return this.reduce((prev, curr) => {
    return prev[attrib] > curr[attrib] ? prev : curr;
  });
};

const data = [...Array(18)].map((_, i) => {
  return {
    x: new Date(2020, 0, i),
    y: Math.floor(Math.random() * 500 + 1)
  };
}).reverse();

const scaleXRange = data.map(data => data.x);
const maxY = data.hasMax("y");

const scaleX = scaleTime()
  .domain([data[0].x, data[data.length - 1].x])
  .range([0, width * 2]);
const scaleY = scaleLinear()
  .domain([0, maxY.y])
  .range([height, 0]);

const scaleLabelX = scaleQuantile()
  .domain([data[0].x, data[data.length - 1].x])
  .range(scaleXRange);

const graphLine = d3.shape
  .line()
  .x(d => scaleX(d.x))
  .y(d => scaleY(d.y))
  .curve(d3.shape.curveBasis)(data);

const graphLineProperties = path.svgPathProperties(graphLine);
const graphLineLength = graphLineProperties.getTotalLength();

interface CursorProps {
  x: Animated.Value;
  y: Animated.Value;
}

function Cursor({ x, y }: CursorProps) {
  return (
    <Animated.View
      style={{
        transform: [{ translateX: x }, { translateY: y }],
        width: cursorRadiusWithBorder * 2,
        height: cursorRadiusWithBorder * 2,
        position: "absolute",
        borderRadius: cursorRadiusWithBorder,
        borderColor: "#b972b3",
        borderWidth: cursorBorderWidth,
        backgroundColor: "white"
      }}/>
  );
}

export default class SvgGraphScreen extends PureComponent {
  valueRef = createRef<TextInput>();
  dateRef = createRef<TextInput>();
  scrollX = new Animated.Value(0);
  scrollDecay = new Animated.Value(0);
  pathX = new Animated.Value(0);
  pathY = new Animated.Value(0);
  translateX = Animated.diffClamp(
    Animated.add(this.scrollX, this.scrollDecay),
    0,
    graphLineLength
  ) as Animated.Value
  offsetX = 0;

  componentDidMount = () => {
    this.translateX.addListener(({ value }) => {
      const { x, y } = graphLineProperties.getPropertiesAtLength(
        graphLineLength - value
      );
      this.pathX.setValue(x - cursorRadiusWithBorder);
      this.pathY.setValue(y - cursorRadiusWithBorder);
      const date = scaleLabelX(scaleX.invert(x));
      this.valueRef?.current?.setNativeProps({text: (height-y).toFixed(2)})
      this.dateRef?.current?.setNativeProps({text: format(new Date(date), "dd MMM")});
    });
  };

  gestureHandler = ({ nativeEvent: { translationX } }: PanGestureHandlerGestureEvent) => {
    this.scrollX.setValue(translationX + this.offsetX);
  };

  handleGestureStateChange = ({nativeEvent: {state, translationX, velocityX}}: PanGestureHandlerStateChangeEvent) => {
    if (state === GestureState.END) {
      this.offsetX = translationX + this.offsetX;
      Animated.decay(this.scrollDecay, {
        velocity: velocityX / 1000,
        deceleration: 0.997
      }).start();
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.screen}>
          <BackButton />
          <Text style={styles.header}>SVG graph</Text>
          <View style={styles.content}>
            <View style={styles.svgContainer}>
              <Animated.View
                style={{
                  height: height,
                  transform: [
                    {
                      translateX: this.translateX.interpolate({
                        inputRange: [0, graphLineLength],
                        outputRange: [-width, 0]
                      })
                    }
                  ],
                  zIndex: -120
                }}
              >
                <Svg width={width * 2} height={height}>
                  <Defs>
                    <LinearGradient
                      x1="50%"
                      y1="0%"
                      x2="50%"
                      y2="100%"
                      id="gradient"
                    >
                      <Stop stopColor="#CDE3F8" offset="0%" stopOpacity=".4" />
                      <Stop stopColor="#eef6fd" offset="80%" stopOpacity="0" />
                      <Stop stopColor="#FEFFFF" offset="100%" stopOpacity="0" />
                    </LinearGradient>
                  </Defs>
                  <Path
                    d={`${graphLine} L ${width * 2} ${height} L 0 ${height}`}
                    fill="url(#gradient)"
                  />
                  <AnimatedPath
                    d={graphLine}
                    stroke="white"
                    strokeWidth={6}
                    fill="none"
                  />
                </Svg>
                <Cursor x={this.pathX} y={this.pathY} />
              </Animated.View>
              <PanGestureHandler
                onGestureEvent={this.gestureHandler}
                onHandlerStateChange={this.handleGestureStateChange}
              >
                <Animated.View
                  style={{
                    ...StyleSheet.absoluteFillObject,
                    zIndex: 120
                  }}
                ></Animated.View>
              </PanGestureHandler>
            </View>
            <TextInput editable={false} style={styles.subheader} value="0.00" ref={this.valueRef} />
            <TextInput editable={false} style={styles.dateheader} value="- -" ref={this.dateRef} />
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
  subheader: {
    fontSize: 48,
    color: "#cdd4db",
    paddingTop: 40,
    width,
    fontWeight: "600",
    textAlign: "center"
  },
  dateheader: {
    fontSize: 24,
    color: "#cdd4db",
    paddingTop: 20,
    width,
    textAlign: "center"
  },
  content: {
    flex: 1,
    justifyContent: "center"
  },
  svgContainer: {
    height,
    justifyContent: "center"
  },
  icon: {
    position: "absolute",
    height: 72,
    width: 72,
    alignItems: "center",
    justifyContent: "center"
  },
});
