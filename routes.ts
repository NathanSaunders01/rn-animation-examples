import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import {
  HomeScreen,
  FadedTextScreen,
  TwitterScreen,
  SpotifyScreen,
  SvgBasicsScreen,
  SvgWithScrollScreen,
  SvgGraphScreen,
  InterpolationsScreen,
  SvgPieChartScreen,
  SvgPBLogoScreen,
  SvgRotatePBLogoScreen,
  SvgDottedPathScreen
} from "./screens";

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    FadedText: {
      screen: FadedTextScreen
    },
    Twitter: {
      screen: TwitterScreen
    },
    Spotify: {
      screen: SpotifyScreen
    },
    SvgBasics: {
      screen: SvgBasicsScreen
    },
    SvgDottedPath: {
      screen: SvgDottedPathScreen
    },
    SvgWithScroll: {
      screen: SvgWithScrollScreen
    },
    SvgGraph: {
      screen: SvgGraphScreen
    },
    SvgPieChart: {
      screen: SvgPieChartScreen
    },
    SvgPBLogoRotate: {
      screen: SvgRotatePBLogoScreen
    },
    SvgPBLogo: {
      screen: SvgPBLogoScreen
    },
    Interpolations: {
      screen: InterpolationsScreen
    }
  },
  {
    defaultNavigationOptions: {
      headerShown: false
    }
  }
);

export default createAppContainer(AppNavigator);
