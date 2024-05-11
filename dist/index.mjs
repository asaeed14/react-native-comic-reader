// src/ComicReader/index.tsx
import React8, { useEffect as useEffect3, useRef, useState as useState2 } from "react";
import { Platform, View as View2 } from "react-native";
import {
  FlatList,
  GestureDetector as GestureDetector2,
  GestureHandlerRootView
} from "react-native-gesture-handler";
import {
  runOnJS as runOnJS2,
  useAnimatedStyle as useAnimatedStyle4,
  useSharedValue as useSharedValue4,
  withDelay as withDelay2,
  withSpring,
  withTiming as withTiming4
} from "react-native-reanimated";

// src/ComicReader/style.ts
import { Dimensions, StyleSheet } from "react-native";
var screenWidth = Dimensions.get("window").width;
var screenHeight = Dimensions.get("window").height;
var ACTION_BUTTON_SIZE = 50;
var HORIZONTAL_SPACING = 70;
var FOOTER_LINE_WIDTH = screenWidth - HORIZONTAL_SPACING;
var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainerStyle: {
    alignItems: "center"
  },
  image: {
    width: screenWidth,
    height: screenHeight
  },
  imageLoader: {
    position: "absolute",
    top: "30%",
    alignItems: "center",
    justifyContent: "center",
    width: screenWidth,
    height: screenWidth,
    backgroundColor: "#CCCCCC"
  },
  actionButtonWrapper: {
    width: ACTION_BUTTON_SIZE,
    height: ACTION_BUTTON_SIZE,
    borderRadius: 50,
    marginBottom: 10,
    marginRight: 10,
    elevation: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  actionButtonAnimatedWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    position: "absolute"
  },
  actionButton: {
    width: ACTION_BUTTON_SIZE,
    height: ACTION_BUTTON_SIZE,
    alignItems: "center",
    justifyContent: "center"
  },
  bounceAnimation: {
    position: "absolute",
    width: ACTION_BUTTON_SIZE + 70,
    height: ACTION_BUTTON_SIZE + 70
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    height: 24
  },
  arrowWrapper: {
    padding: 5
  },
  footerCounterBallon: {
    padding: 10,
    width: 30,
    height: 50,
    borderRadius: 14,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    bottom: 0,
    left: -10
  },
  currentComicIndexLabel: {
    fontWeight: "bold"
  },
  footerCounterBallonRope: {
    width: 2,
    height: 8,
    position: "absolute",
    bottom: -7,
    borderRadius: 2,
    overflow: "visible"
  },
  footerLine: {
    width: FOOTER_LINE_WIDTH,
    height: 8,
    borderRadius: 4,
    alignItems: "center",
    flexDirection: "row"
  },
  footerInnerLine: {
    height: 8,
    width: 50,
    borderRadius: 4
  },
  footerLineCircle: {
    width: 14,
    height: 14,
    borderRadius: 12,
    borderWidth: 8,
    marginLeft: -5,
    alignItems: "center",
    justifyContent: "center"
  },
  footerLineInnerCircle: {
    width: 6,
    height: 6,
    borderRadius: 10
  }
});

// src/ComicReader/ComicZoomActionButton.tsx
import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withDelay,
  withRepeat,
  withTiming
} from "react-native-reanimated";
var AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
var ComicZoomActionButton = ({
  containerDimensions,
  handleButtonPress,
  buttonIcon,
  zoomActionButtonColor
}) => {
  const buttonX = useSharedValue(screenWidth - ACTION_BUTTON_SIZE - 20);
  const buttonY = useSharedValue(-40);
  const buttonScale = useSharedValue(1);
  const bounceAnimation = useSharedValue(0);
  const bounceWithDelay = useSharedValue(0);
  useEffect(() => {
    bounceAnimation.value = withRepeat(
      withTiming(1.5, { duration: 2e3 }),
      0,
      true
    );
    bounceWithDelay.value = withDelay(
      1e3,
      withRepeat(withTiming(1.3, { duration: 2e3 }), 0, true)
    );
  }, []);
  const movingGesture = Gesture.Pan().onBegin(() => {
    buttonScale.value = withTiming(2, { duration: 1e3 });
  }).onChange((event) => {
    buttonX.value += event.changeX;
    buttonY.value += event.changeY;
  }).onFinalize((event) => {
    buttonX.value = withDecay({
      velocity: event.velocityX,
      rubberBandEffect: true,
      clamp: [0, containerDimensions.width - ACTION_BUTTON_SIZE]
    });
    buttonY.value = withDecay({
      velocity: event.velocityY,
      rubberBandEffect: true,
      clamp: [0, -containerDimensions.height]
    });
    buttonScale.value = withTiming(1, { duration: 1e3 });
  });
  const buttonAnimatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: buttonX.value },
      { translateY: buttonY.value },
      { scale: buttonScale.value }
    ]
  }));
  const bounceAnimatedStyles = useAnimatedStyle(() => ({
    opacity: bounceAnimation.value - 1,
    backgroundColor: interpolateColor(
      bounceAnimation.value,
      [0, 1, 1.5],
      ["transparent", "transparent", zoomActionButtonColor]
    ),
    transform: [{ scale: bounceAnimation.value }]
  }));
  const bounceWithDelayAnimatedStyles = useAnimatedStyle(() => ({
    opacity: bounceWithDelay.value - 1,
    backgroundColor: interpolateColor(
      bounceWithDelay.value,
      [0, 1.3],
      ["transparent", zoomActionButtonColor]
    ),
    transform: [{ scale: bounceWithDelay.value }]
  }));
  return /* @__PURE__ */ React.createElement(GestureDetector, { gesture: movingGesture }, /* @__PURE__ */ React.createElement(
    AnimatedTouchableOpacity,
    {
      style: [
        styles.actionButtonWrapper,
        { backgroundColor: zoomActionButtonColor },
        buttonAnimatedStyles
      ]
    },
    /* @__PURE__ */ React.createElement(
      Animated.View,
      {
        style: [
          styles.actionButtonAnimatedWrapper,
          bounceWithDelayAnimatedStyles
        ]
      }
    ),
    /* @__PURE__ */ React.createElement(
      Animated.View,
      {
        style: [styles.actionButtonAnimatedWrapper, bounceAnimatedStyles]
      }
    ),
    /* @__PURE__ */ React.createElement(
      TouchableOpacity,
      {
        style: styles.actionButton,
        onPress: handleButtonPress
      },
      buttonIcon
    )
  ));
};

// src/ComicReader/useCustomAnimations.ts
import { runOnJS, useSharedValue as useSharedValue2, withTiming as withTiming2 } from "react-native-reanimated";
import { Gesture as Gesture2 } from "react-native-gesture-handler";
var useCustomAnimations = ({
  containerDimensions,
  handleFlatListScrollEnable
}) => {
  const isDoubleTaped = useSharedValue2(false);
  const footerInnerLineAnimation = useSharedValue2(0);
  const footerLineCircleAnimation = useSharedValue2(1);
  const footerBallonTranslateX = useSharedValue2(0);
  const footerBallonTranslateY = useSharedValue2(0);
  const footerBallonRotateZ = useSharedValue2(0);
  const footerBallonScale = useSharedValue2(0);
  const comicImageX = useSharedValue2(0);
  const comicImageY = useSharedValue2(0);
  const comicImageScale = useSharedValue2(1);
  const savedComicImageX = useSharedValue2(0);
  const savedComicImageY = useSharedValue2(0);
  const savedComicImageScale = useSharedValue2(1);
  const centerX = containerDimensions.width / 2;
  const centerY = containerDimensions.height / 2;
  const resetAnimation = () => {
    comicImageX.value = withTiming2(0, { duration: 1e3 });
    comicImageY.value = withTiming2(0, { duration: 1e3 });
    comicImageScale.value = withTiming2(1, { duration: 1e3 }, () => {
      savedComicImageX.value = comicImageX.value;
      savedComicImageY.value = comicImageY.value;
      savedComicImageScale.value = comicImageScale.value;
      runOnJS(handleFlatListScrollEnable)(true);
    });
  };
  const doubleTap = Gesture2.Tap().maxDuration(250).numberOfTaps(2).onStart((event) => {
    if (isDoubleTaped.value || savedComicImageScale.value >= 2 || savedComicImageScale.value > 1) {
      runOnJS(resetAnimation)();
      isDoubleTaped.value = false;
      return;
    }
    comicImageX.value = withTiming2(-(event.x - centerX), { duration: 1e3 });
    comicImageY.value = withTiming2(-(event.y - centerY), { duration: 1e3 });
    comicImageScale.value = withTiming2(2, { duration: 1e3 }, () => {
      savedComicImageX.value = comicImageX.value;
      savedComicImageY.value = comicImageY.value;
      savedComicImageScale.value = comicImageScale.value;
      runOnJS(handleFlatListScrollEnable)(false);
    });
    isDoubleTaped.value = true;
  });
  const pan = Gesture2.Pan().onChange((event) => {
    if (event.translationX <= 0) {
      comicImageX.value = savedComicImageX.value + event.translationX;
    } else if (event.translationX > 0) {
      comicImageX.value = savedComicImageX.value + event.translationX;
    }
    if (event.translationY <= 0) {
      comicImageY.value = savedComicImageY.value + event.translationY;
    } else if (event.translationY > 0) {
      comicImageY.value = savedComicImageY.value + event.translationY;
    }
  }).onFinalize(() => {
    savedComicImageX.value = comicImageX.value;
    savedComicImageY.value = comicImageY.value;
  });
  const pinchGesture = Gesture2.Pinch().onUpdate((e) => {
    comicImageScale.value = savedComicImageScale.value * e.scale;
  }).onFinalize(() => {
    savedComicImageScale.value = comicImageScale.value;
    if (comicImageScale.value > 1) {
      runOnJS(handleFlatListScrollEnable)(false);
    }
  });
  const composedComicImageGestures = Gesture2.Simultaneous(
    pan,
    pinchGesture,
    doubleTap
  );
  return {
    footerInnerLineAnimation,
    footerLineCircleAnimation,
    footerBallonTranslateY,
    footerBallonScale,
    footerBallonRotateZ,
    footerBallonTranslateX,
    comicImageX,
    comicImageY,
    comicImageScale,
    savedComicImageX,
    savedComicImageY,
    savedComicImageScale,
    composedComicImageGestures,
    resetAnimation
  };
};

// src/ComicReader/icons/ArrowLeft.tsx
import React2 from "react";
import Svg, { Path } from "react-native-svg";
var ArrowLeft = (props) => /* @__PURE__ */ React2.createElement(Svg, { width: 24, height: 24, ...props, viewBox: "0 0 330 330" }, /* @__PURE__ */ React2.createElement(
  Path,
  {
    fill: props.color || "#fff",
    d: "M111.213 165.004 250.607 25.607c5.858-5.858 5.858-15.355 0-21.213-5.858-5.858-15.355-5.858-21.213.001l-150 150.004a15 15 0 0 0 0 21.212l150 149.996C232.322 328.536 236.161 330 240 330s7.678-1.464 10.607-4.394c5.858-5.858 5.858-15.355 0-21.213L111.213 165.004z"
  }
));
var ArrowLeft_default = ArrowLeft;

// src/ComicReader/icons/ArrowRight.tsx
import React3 from "react";
import Svg2, { Path as Path2 } from "react-native-svg";
var ArrowRight = (props) => /* @__PURE__ */ React3.createElement(Svg2, { width: 24, height: 24, ...props, viewBox: "-4.5 0 20 20" }, /* @__PURE__ */ React3.createElement(
  Path2,
  {
    fill: props?.color || "#fff",
    fillRule: "evenodd",
    d: "M.366 19.708c.405.39 1.06.39 1.464 0l8.563-8.264a1.95 1.95 0 0 0 0-2.827L1.768.292A1.063 1.063 0 0 0 .314.282a.976.976 0 0 0-.011 1.425l7.894 7.617a.975.975 0 0 1 0 1.414L.366 18.295a.974.974 0 0 0 0 1.413"
  }
));
var ArrowRight_default = ArrowRight;

// src/ComicReader/icons/Reverse.tsx
import React4 from "react";
import Svg3, { Path as Path3 } from "react-native-svg";
var Reverse = (props) => /* @__PURE__ */ React4.createElement(Svg3, { width: 24, height: 24, ...props, viewBox: "0 0 256 256" }, /* @__PURE__ */ React4.createElement(
  Path3,
  {
    fill: props.color || "#fff",
    fillRule: "evenodd",
    d: "M55.265 167.072c-.975-1.973-3.388-2.796-5.372-1.847L42 169s22.5 53.5 85.5 56c60-1.5 96.627-48.626 97-96.5.373-47.874-37-95.5-95.5-96-57.5-1-79.556 45.004-79.556 45.004-1.073 1.93-1.944 1.698-1.944-.501V51.997a4 4 0 0 0-4-3.997H37c-2.209 0-4 1.8-4 4.008v48.984A3.998 3.998 0 0 0 36.998 105h50.504a3.995 3.995 0 0 0 3.998-3.993v-6.014c0-2.205-1.79-4.02-4.008-4.053l-25.484-.38c-2.214-.033-3.223-1.679-2.182-3.628C59.826 86.932 78 45 128.5 45.5c49 .5 82.751 41.929 82.5 83.242C208 184 166 211 127.5 210c-54.5 0-72.235-42.928-72.235-42.928z"
  }
));
var Reverse_default = Reverse;

// src/ComicReader/icons/Zoom.tsx
import React5 from "react";
import Svg4, { Path as Path4 } from "react-native-svg";
var Zoom = (props) => /* @__PURE__ */ React5.createElement(Svg4, { width: 24, height: 24, ...props, viewBox: "0 0 32 32" }, /* @__PURE__ */ React5.createElement(
  Path4,
  {
    fill: props.color || "#fff",
    fillRule: "evenodd",
    d: "M13.46 24.45c-6.29 0-11.39-5.01-11.39-11.2 0-6.19 5.1-11.21 11.39-11.21 6.29 0 11.39 5.02 11.39 11.21 0 6.19-5.1 11.2-11.39 11.2Zm18.228 5.8-8.259-8.13c2.163-2.35 3.491-5.45 3.491-8.87C26.92 5.93 20.894 0 13.46 0 6.026 0 0 5.93 0 13.25c0 7.31 6.026 13.24 13.46 13.24a13.52 13.52 0 0 0 8.472-2.96l8.293 8.16c.404.4 1.059.4 1.463 0 .405-.39.405-1.04 0-1.44ZM18.519 12.41h-3.997v-4c0-.56-.447-1-.999-1a.995.995 0 0 0-.999 1v4H8.529c-.551 0-.999.18-.999.73 0 .56.448 1.27.999 1.27h3.995v4c0 .56.448 1 .999 1 .552 0 .999-.44.999-1v-4h3.997c.551 0 .999-.45.999-1s-.448-1-.999-1Z"
  }
));
var Zoom_default = Zoom;

// src/ComicReader/util.ts
import { Image } from "react-native";
import { useCallback } from "react";
var imageDimensionsCache = {};
var useOriginalImageDimensions = () => {
  const getOriginalImageDimensions = useCallback(
    async (imageSource) => {
      try {
        let originalImageWidth = 0;
        let originalImageHeight = 0;
        if (imageSource?.uri) {
          if (imageDimensionsCache[imageSource.uri]) {
            const { width, height } = imageDimensionsCache[imageSource.uri];
            originalImageWidth = width;
            originalImageHeight = height;
          } else {
            const { width, height } = await getImageSize(imageSource.uri);
            originalImageWidth = width;
            originalImageHeight = height;
            imageDimensionsCache[imageSource.uri] = { width, height };
          }
        } else {
          const { width, height } = Image.resolveAssetSource(imageSource);
          originalImageWidth = width;
          originalImageHeight = height;
        }
        return { originalImageWidth, originalImageHeight };
      } catch (error) {
        console.error("Error fetching image dimensions:", error);
        return { originalImageWidth: 0, originalImageHeight: 0 };
      }
    },
    []
  );
  return { getOriginalImageDimensions };
};
var getImageSize = async (uri) => {
  return new Promise((resolve, reject) => {
    Image.getSize(
      uri,
      (width, height) => {
        resolve({ width, height });
      },
      (error) => {
        reject(error);
      }
    );
  });
};

// src/ComicReader/ComicImageView.tsx
import React6, { useEffect as useEffect2, useState } from "react";
import { ActivityIndicator } from "react-native";
import Animated2, {
  useAnimatedStyle as useAnimatedStyle2,
  useSharedValue as useSharedValue3,
  withRepeat as withRepeat2,
  withTiming as withTiming3
} from "react-native-reanimated";
var ComicImageView = ({
  imageSource,
  animatedComicImageStyles
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const loading = useSharedValue3(0.3);
  const onLoadEnd = () => {
    setIsLoading(false);
  };
  useEffect2(() => {
    if (isLoading) {
      loading.value = withRepeat2(withTiming3(0.8, { duration: 1e3 }), 0, true);
    } else {
      loading.value = 0;
    }
  }, [isLoading]);
  const loadingAnimatedStyles = useAnimatedStyle2(() => ({
    opacity: loading.value
  }));
  return /* @__PURE__ */ React6.createElement(Animated2.View, { key: imageSource.toString() }, /* @__PURE__ */ React6.createElement(
    Animated2.Image,
    {
      source: imageSource,
      style: [
        styles.image,
        animatedComicImageStyles ? animatedComicImageStyles : null
      ],
      resizeMode: "contain",
      onLoadEnd
    }
  ), isLoading ? /* @__PURE__ */ React6.createElement(Animated2.View, { style: [styles.imageLoader, loadingAnimatedStyles] }, /* @__PURE__ */ React6.createElement(ActivityIndicator, null)) : null);
};
var ComicImageView_default = React6.memo(ComicImageView);

// src/ComicReader/footer.tsx
import React7 from "react";
import { Text, TouchableOpacity as TouchableOpacity2, View } from "react-native";
import Animated3, {
  FadeIn,
  interpolateColor as interpolateColor2,
  useAnimatedStyle as useAnimatedStyle3
} from "react-native-reanimated";
var AnimatedTouchableOpacity2 = Animated3.createAnimatedComponent(TouchableOpacity2);
var Footer = ({
  numberOfComics,
  currentComicIndex,
  onUpdateComicIndex,
  animations,
  primaryColor,
  secondaryColor,
  iconColor,
  textColor
}) => {
  const handleNextSlide = () => {
    if (currentComicIndex === numberOfComics - 1) {
      return;
    }
    onUpdateComicIndex(currentComicIndex + 1);
  };
  const handlePrevSlide = () => {
    if (currentComicIndex === 0) {
      return;
    }
    onUpdateComicIndex(currentComicIndex - 1);
  };
  const footerInnerLineAnimatedStyles = useAnimatedStyle3(() => ({
    width: animations.footerInnerLineAnimation.value
  }));
  const footerLineCircleAnimatedStyles = useAnimatedStyle3(() => ({
    transform: [{ scale: animations.footerLineCircleAnimation.value }],
    backgroundColor: interpolateColor2(
      animations.footerLineCircleAnimation.value,
      [1, 2],
      [secondaryColor, "black"]
    )
  }));
  const footerBallonAnimatedStyles = useAnimatedStyle3(() => {
    return {
      transform: [
        { translateX: animations.footerBallonTranslateX.value },
        { translateY: animations.footerBallonTranslateY.value },
        { rotate: `${animations.footerBallonRotateZ.value}deg` },
        { scale: animations.footerBallonScale.value }
      ]
    };
  });
  return /* @__PURE__ */ React7.createElement(Animated3.View, { style: styles.footer, entering: FadeIn.duration(500) }, /* @__PURE__ */ React7.createElement(
    AnimatedTouchableOpacity2,
    {
      style: styles.arrowWrapper,
      onPress: handlePrevSlide
    },
    /* @__PURE__ */ React7.createElement(ArrowLeft_default, { color: iconColor })
  ), /* @__PURE__ */ React7.createElement(View, null, /* @__PURE__ */ React7.createElement(
    Animated3.View,
    {
      style: [
        styles.footerCounterBallon,
        { backgroundColor: secondaryColor },
        footerBallonAnimatedStyles
      ]
    },
    /* @__PURE__ */ React7.createElement(Text, { style: [styles.currentComicIndexLabel, { color: textColor }] }, currentComicIndex + 1),
    /* @__PURE__ */ React7.createElement(
      View,
      {
        style: [
          styles.footerCounterBallonRope,
          { backgroundColor: secondaryColor }
        ]
      }
    )
  ), /* @__PURE__ */ React7.createElement(
    Animated3.View,
    {
      style: [styles.footerLine, { backgroundColor: primaryColor }]
    },
    /* @__PURE__ */ React7.createElement(
      Animated3.View,
      {
        style: [
          styles.footerInnerLine,
          { backgroundColor: secondaryColor },
          footerInnerLineAnimatedStyles
        ]
      }
    ),
    /* @__PURE__ */ React7.createElement(
      Animated3.View,
      {
        style: [
          styles.footerLineCircle,
          { borderColor: secondaryColor },
          footerLineCircleAnimatedStyles
        ]
      },
      /* @__PURE__ */ React7.createElement(
        Animated3.View,
        {
          style: [
            styles.footerLineInnerCircle,
            footerLineCircleAnimatedStyles,
            { backgroundColor: secondaryColor }
          ]
        }
      )
    )
  )), /* @__PURE__ */ React7.createElement(
    AnimatedTouchableOpacity2,
    {
      style: styles.arrowWrapper,
      onPress: handleNextSlide
    },
    /* @__PURE__ */ React7.createElement(ArrowRight_default, { color: iconColor })
  ));
};

// src/ComicReader/index.tsx
var ComicReader = ({
  data,
  zoomActionButtonColor = "#D84355",
  iconsColor = "#FFF",
  sliderPrimaryColor = "#E47886",
  sliderSecondaryColor = "#D84355",
  textColor = "#FFF"
}) => {
  const flatListRef = useRef(null);
  const numberOfItems = data.length;
  const [currentComicIndex, setCurrentComicIndex] = useState2(0);
  const [comicZoomButtonPressCount, setComicZoomButtonPressCount] = useState2(0);
  const comicBoundaries = useSharedValue4(
    data.map((_item, index) => {
      return screenWidth * index;
    })
  );
  const [containerDimensions, setContainerDimensions] = useState2({
    width: 0,
    height: 0
  });
  const originalImageDimensions = useSharedValue4({
    width: 0,
    height: 0
  });
  const onLayout = (event) => {
    setContainerDimensions({
      width: event.nativeEvent.layout.width,
      height: event.nativeEvent.layout.height
    });
  };
  const { getOriginalImageDimensions } = useOriginalImageDimensions();
  useEffect3(() => {
    const fetchImageDimensions = async () => {
      try {
        const dimensions = await getOriginalImageDimensions(
          // @ts-ignore
          data[currentComicIndex].imageSource
        );
        originalImageDimensions.value = {
          width: dimensions.originalImageWidth,
          height: dimensions.originalImageHeight
        };
      } catch (error) {
        console.error("Error fetching image dimensions:", error);
      }
    };
    fetchImageDimensions();
  }, [currentComicIndex]);
  const handleFlatListScrollEnable = (isEnabled) => {
    flatListRef.current.setNativeProps({
      scrollEnabled: isEnabled
    });
  };
  const {
    footerInnerLineAnimation,
    footerLineCircleAnimation,
    footerBallonTranslateY,
    footerBallonScale,
    footerBallonRotateZ,
    footerBallonTranslateX,
    comicImageX,
    comicImageY,
    savedComicImageX,
    savedComicImageY,
    comicImageScale,
    savedComicImageScale,
    composedComicImageGestures,
    resetAnimation
  } = useCustomAnimations({
    containerDimensions,
    handleFlatListScrollEnable
  });
  const handleComicZoomButton = async () => {
    if (comicZoomButtonPressCount > data[currentComicIndex]?.coordinates.length - 1) {
      setComicZoomButtonPressCount(0);
      comicImageX.value = withTiming4(0, { duration: 1e3 });
      comicImageY.value = withTiming4(0, { duration: 1e3 });
      comicImageScale.value = withTiming4(1, { duration: 1e3 }, () => {
        runOnJS2(handleFlatListScrollEnable)(true);
      });
      return;
    }
    const adjustedImageWidth = screenWidth;
    const adjustedImageHeight = screenHeight;
    let adjustedCoordinateX = adjustedImageWidth / originalImageDimensions.value.width * data[currentComicIndex].coordinates[comicZoomButtonPressCount].x;
    adjustedCoordinateX = -adjustedCoordinateX;
    const adjustedCoordinateY = adjustedImageHeight / originalImageDimensions.value.height * data[currentComicIndex].coordinates[comicZoomButtonPressCount].y;
    comicImageX.value = withTiming4(adjustedCoordinateX, {
      duration: 1e3
    });
    comicImageScale.value = withTiming4(2, { duration: 1e3 }, () => {
      runOnJS2(handleFlatListScrollEnable)(false);
    });
    comicImageY.value = withTiming4(
      adjustedCoordinateY,
      {
        duration: 1e3
      },
      () => {
        savedComicImageX.value = comicImageX.value;
        savedComicImageY.value = comicImageY.value;
        savedComicImageScale.value = comicImageScale.value;
      }
    );
    setComicZoomButtonPressCount(comicZoomButtonPressCount + 1);
  };
  const handleComicIndexUpdate = (index) => {
    if (comicImageScale.value > 1) {
      resetAnimation();
      setTimeout(() => {
        flatListRef.current && // @ts-ignore
        flatListRef?.current.scrollToIndex({
          animated: true,
          index
        });
      }, 1e3);
    } else {
      flatListRef.current && // @ts-ignore
      flatListRef?.current.scrollToIndex({
        animated: true,
        index
      });
    }
  };
  const buttonIcon = comicZoomButtonPressCount === 0 ? /* @__PURE__ */ React8.createElement(Zoom_default, { color: iconsColor }) : comicZoomButtonPressCount < data[currentComicIndex].coordinates.length ? /* @__PURE__ */ React8.createElement(ArrowRight_default, { color: iconsColor }) : /* @__PURE__ */ React8.createElement(Reverse_default, { color: iconsColor });
  const animatedComicImageStyles = useAnimatedStyle4(() => ({
    transform: [
      { scale: comicImageScale.value },
      { translateX: comicImageX.value },
      { translateY: comicImageY.value }
    ]
  }));
  const renderItem = ({ item, index }) => {
    const isAnimationAllowed = currentComicIndex === index;
    return /* @__PURE__ */ React8.createElement(
      ComicImageView_default,
      {
        animatedComicImageStyles: isAnimationAllowed ? animatedComicImageStyles : null,
        imageSource: item.imageSource
      }
    );
  };
  const OnScrollAnimationEnd = (offset) => {
    footerBallonTranslateX.value = withSpring(
      offset < comicBoundaries.value[1] ? 0 : offset / (data.length - 1) - HORIZONTAL_SPACING
    );
    footerBallonTranslateY.value = withDelay2(1e3, withSpring(15));
    footerLineCircleAnimation.value = withTiming4(1, {
      duration: 500
    });
    footerBallonScale.value = withDelay2(1e3, withSpring(0));
    footerBallonRotateZ.value = withSpring(0);
  };
  return /* @__PURE__ */ React8.createElement(GestureHandlerRootView, null, /* @__PURE__ */ React8.createElement(View2, { style: styles.container, onLayout }, /* @__PURE__ */ React8.createElement(GestureDetector2, { gesture: composedComicImageGestures }, /* @__PURE__ */ React8.createElement(
    FlatList,
    {
      ref: flatListRef,
      data,
      contentContainerStyle: styles.contentContainerStyle,
      renderItem,
      keyExtractor: (item) => item.id,
      snapToInterval: screenWidth,
      decelerationRate: "fast",
      scrollEnabled: true,
      horizontal: true,
      showsHorizontalScrollIndicator: false,
      onScroll: (e) => {
        if (e.nativeEvent.contentOffset.x < 0) {
          return;
        }
        footerBallonTranslateY.value = withSpring(-25);
        const currentOffsetX = e.nativeEvent.contentOffset.x / (data.length - 1) - HORIZONTAL_SPACING;
        const velocityX = e.nativeEvent.velocity?.x || 0;
        footerInnerLineAnimation.value = withSpring(currentOffsetX);
        if (Platform.OS === "ios") {
          footerBallonTranslateX.value = withSpring(
            e.nativeEvent.contentOffset.x < comicBoundaries.value[0] ? 0 : currentOffsetX
          );
        } else {
          footerBallonTranslateX.value = velocityX > 0 ? withSpring(currentOffsetX - 15) : withSpring(currentOffsetX + 15);
          footerBallonRotateZ.value = withSpring(
            velocityX > 0 ? -10 : 10
          );
        }
        footerBallonScale.value = withSpring(1);
        footerLineCircleAnimation.value = withTiming4(2, {
          duration: 500
        });
        if (comicBoundaries.value.includes(e.nativeEvent.contentOffset.x)) {
          const currentIndex = comicBoundaries.value.indexOf(
            e.nativeEvent.contentOffset.x
          );
          setCurrentComicIndex(currentIndex);
          setComicZoomButtonPressCount(0);
          OnScrollAnimationEnd(e.nativeEvent.contentOffset.x);
        }
      },
      onMomentumScrollEnd: (e) => {
        OnScrollAnimationEnd(e.nativeEvent.contentOffset.x);
      },
      initialNumToRender: 2,
      windowSize: 2,
      maxToRenderPerBatch: 2
    }
  ))), /* @__PURE__ */ React8.createElement(
    ComicZoomActionButton,
    {
      ...{
        containerDimensions,
        buttonIcon,
        handleButtonPress: handleComicZoomButton,
        zoomActionButtonColor
      }
    }
  ), data.length > 1 ? /* @__PURE__ */ React8.createElement(
    Footer,
    {
      numberOfComics: numberOfItems,
      onUpdateComicIndex: handleComicIndexUpdate,
      currentComicIndex,
      primaryColor: sliderPrimaryColor,
      secondaryColor: sliderSecondaryColor,
      iconColor: iconsColor,
      textColor,
      animations: {
        footerInnerLineAnimation,
        footerLineCircleAnimation,
        footerBallonTranslateY,
        footerBallonScale,
        footerBallonRotateZ,
        footerBallonTranslateX
      }
    }
  ) : null);
};

// src/ComicReader/types.ts
var types_exports = {};
export {
  ComicReader,
  types_exports as ComicReaderTypes
};
