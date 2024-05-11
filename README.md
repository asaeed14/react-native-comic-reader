# react-native-comic-reader

A React Native package for reading multiple comics with advanced features like native-level animations and gesture handlers.

This package offers smooth native-level animations and supports various gestures including `slide to next item`, `double tap to zoom`, `two-fingers zoom-in/zoom-out`.

The AnimatedButton feature allows users to `zoom in to a particular x and y position` of the comic for seamless reading. Additionally, users can track the progress of the current comic with a `smooth progress bar` and navigate using footer buttons or by sliding left and right.

## Preview

https://github.com/asaeed14/react-native-comic-reader/assets/25408139/60f15ce1-74da-49d6-820e-8c85260b8a8b

## Requirements

Before using this package, ensure that you have installed the following dependencies:

- [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated): Required for native level animations.
- [react-native-gesture-handler](https://github.com/software-mansion/react-native-gesture-handler): Necessary for handling gestures in React Native applications.
- [react-native-svg](https://github.com/react-native-svg/react-native-svg): Essential for rendering dynamic colors icons in SVG format.

You can install these dependencies via npm or yarn:

```bash
# Using npm
npm install react-native-reanimated react-native-gesture-handler react-native-svg

# Using yarn
yarn add react-native-reanimated react-native-gesture-handler react-native-svg
```

### Image Coordinates Finder Tool

Along with the react-native-comic-reader package, we provide an Image Coordinates Finder web page. This tool assists you in generating `image coordinates` required for the ComicReader component. Users can upload an image and interactively mark points on the image to generate the necessary coordinates. These coordinates can then be used directly in the data array when rendering comics with the ComicReader component.

Explore the [Image Coordinates Finder Tool](https://imagecoordinatesfinder.web.app/) to simplify the process of preparing data for your comic reader applications.

https://github.com/asaeed14/react-native-comic-reader/assets/25408139/9038879d-a6a7-4cd8-a28c-fe8981629d52

## Getting started

```bash
# Using npm
npm install react-native-comic-reader

# Using yarn
yarn add react-native-comic-reader
```

## Usage

```js
import React from "react";
import { StyleSheet, View } from "react-native";
import { ComicReader } from "react-native-comic-reader";

const MyPager = () => {
  return (
    <View style={styles.container}>
      <ComicReader
        sliderPrimaryColor="" // optional
        sliderSecondaryColor="" // optional
        zoomActionButtonColor="" // optional
        iconsColor="" // optional
        textColor="" // optional
        data={comicsData} // required
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
```

## Important:

Please note that the ComicReader component will inherit spacing from its parent container. Make sure to define appropriate spacing properties such as padding, margin, or alignment for the parent container to achieve the desired layout and spacing of the ComicReader component.

## API

| Prop                  | Type   | Required | default |              Description              |
| --------------------- | ------ | :------: | :-----: | :-----------------------------------: |
| sliderPrimaryColor    | string |    No    | #E47886 | Color for non-selected area of slider |
| sliderSecondaryColor  | string |    No    | #D84355 |   Color for selected area of slider   |
| iconsColor            | string |    No    |  #FFF   |            Color for icons            |
| zoomActionButtonColor | string |    No    | #D84355 |     Color for zoom action button      |
| textColor             | string |    NO    |  #FFF   |            Color for text             |
| data                  | array  |   YES    |    -    |             data for list             |

## Instructions

to use the `remote` images checkout the below data format

```ts
const data = [
  {
    id: "1",
    imageSource: {
      uri: "https://www.cartoonstudies.org/wp-content/uploads/2021/11/reading-page-2-674x1024.jpg",
    },
    coordinates: [
      { x: -211, y: 350.78125 },
      { x: -11, y: 346.78125 },
      { x: 188, y: 338.78125 },
      { x: -164.9921875, y: 170.78125 },
      { x: -16.9921875, y: 15.78125 },
      { x: -178.9921875, y: -286.21875 },
      { x: 197.0078125, y: -289.21875 },
    ],
  },
];
```

to use the `local/static` images checkout the below data format

```ts
const data = [
  {
    id: "1",
    imageSource: require("./yourImagePath/comicImage.jpg"),
    coordinates: [
      { x: -211, y: 350.78125 },
      { x: -11, y: 346.78125 },
      { x: 188, y: 338.78125 },
      { x: -164.9921875, y: 170.78125 },
      { x: -16.9921875, y: 15.78125 },
      { x: -178.9921875, y: -286.21875 },
      { x: 197.0078125, y: -289.21875 },
    ],
  },
];
```

## License

MIT
