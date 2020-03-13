import { Dimensions } from "react-native";
import Constants from "expo-constants";
import albumData from "./spotifyAlbumData";

const { height } = Dimensions.get("window");

// SPOTIFY
export const SONG_ROW_HEIGHT = 80;
export const ALBUM_CONTENT_HEIGHT = SONG_ROW_HEIGHT * albumData.length;
export const ALBUM_COVER_HEIGHT = 500;
export const SCROLL_BOTTOM_PADDING = 120;
export const SHUFFLE_BUTTON_HEIGHT = 52;
export const MAX_SCROLL_Y =
  height - SCROLL_BOTTOM_PADDING - ALBUM_COVER_HEIGHT - ALBUM_CONTENT_HEIGHT;
export const HEADER_PADDING_BOTTOM = 20;
export const HEADER_HEIGHT =
  60 + Constants.statusBarHeight + HEADER_PADDING_BOTTOM;
export const MAX_SHUFFLE_BUTTON_SCROLL =
  -ALBUM_COVER_HEIGHT + HEADER_HEIGHT - SHUFFLE_BUTTON_HEIGHT / 2;

// SVG Basics
export const SVG_SIDE_LENGTH = 240;

// TWITTER
export const STEP_ONE_ANIMATION_THRESHOLD = 100 - Constants.statusBarHeight;
export const STEP_TWO_ANIMATION_THRESHOLD = 200;

export const START_HEADER_HEIGHT = 120 + Constants.statusBarHeight;
export const END_HEADER_HEIGHT = 60 + Constants.statusBarHeight;
