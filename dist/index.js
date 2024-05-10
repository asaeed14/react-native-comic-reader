"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  ComicReader: () => ComicReader,
  ComicReaderTypes: () => types_exports
});
module.exports = __toCommonJS(src_exports);

// src/ComicReader/index.tsx
var import_react9 = __toESM(require("react"));
var import_react_native6 = require("react-native");
var import_react_native_gesture_handler3 = require("react-native-gesture-handler");
var import_react_native_reanimated5 = require("react-native-reanimated");

// src/ComicReader/style.ts
var import_react_native = require("react-native");
var screenWidth = import_react_native.Dimensions.get("window").width;
var screenHeight = import_react_native.Dimensions.get("window").height;
var ACTION_BUTTON_SIZE = 50;
var HORIZONTAL_SPACING = 70;
var FOOTER_LINE_WIDTH = screenWidth - HORIZONTAL_SPACING;
var styles = import_react_native.StyleSheet.create({
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
var import_react = __toESM(require("react"));
var import_react_native2 = require("react-native");
var import_react_native_gesture_handler = require("react-native-gesture-handler");
var import_react_native_reanimated = __toESM(require("react-native-reanimated"));
var AnimatedTouchableOpacity = import_react_native_reanimated.default.createAnimatedComponent(import_react_native2.TouchableOpacity);
var ComicZoomActionButton = ({
  containerWidth,
  containerHeight,
  handleButtonPress,
  buttonIcon,
  zoomActionButtonColor
}) => {
  const buttonX = (0, import_react_native_reanimated.useSharedValue)(screenWidth - ACTION_BUTTON_SIZE - 20);
  const buttonY = (0, import_react_native_reanimated.useSharedValue)(-40);
  const buttonScale = (0, import_react_native_reanimated.useSharedValue)(1);
  const bounceAnimation = (0, import_react_native_reanimated.useSharedValue)(0);
  const bounceWithDelay = (0, import_react_native_reanimated.useSharedValue)(0);
  (0, import_react.useEffect)(() => {
    bounceAnimation.value = (0, import_react_native_reanimated.withRepeat)(
      (0, import_react_native_reanimated.withTiming)(1.5, { duration: 2e3 }),
      0,
      true
    );
    bounceWithDelay.value = (0, import_react_native_reanimated.withDelay)(
      1e3,
      (0, import_react_native_reanimated.withRepeat)((0, import_react_native_reanimated.withTiming)(1.3, { duration: 2e3 }), 0, true)
    );
  }, []);
  const movingGesture = import_react_native_gesture_handler.Gesture.Pan().onBegin(() => {
    buttonScale.value = (0, import_react_native_reanimated.withTiming)(2, { duration: 1e3 });
  }).onChange((event) => {
    buttonX.value += event.changeX;
    buttonY.value += event.changeY;
  }).onFinalize((event) => {
    buttonX.value = (0, import_react_native_reanimated.withDecay)({
      velocity: event.velocityX,
      rubberBandEffect: true,
      clamp: [0, containerWidth.value - ACTION_BUTTON_SIZE]
    });
    buttonY.value = (0, import_react_native_reanimated.withDecay)({
      velocity: event.velocityY,
      rubberBandEffect: true,
      clamp: [0, -containerHeight.value]
    });
    buttonScale.value = (0, import_react_native_reanimated.withTiming)(1, { duration: 1e3 });
  });
  const buttonAnimatedStyles = (0, import_react_native_reanimated.useAnimatedStyle)(() => ({
    transform: [
      { translateX: buttonX.value },
      { translateY: buttonY.value },
      { scale: buttonScale.value }
    ]
  }));
  const bounceAnimatedStyles = (0, import_react_native_reanimated.useAnimatedStyle)(() => ({
    opacity: bounceAnimation.value - 1,
    backgroundColor: (0, import_react_native_reanimated.interpolateColor)(
      bounceAnimation.value,
      [0, 1, 1.5],
      ["transparent", "transparent", zoomActionButtonColor]
    ),
    transform: [{ scale: bounceAnimation.value }]
  }));
  const bounceWithDelayAnimatedStyles = (0, import_react_native_reanimated.useAnimatedStyle)(() => ({
    opacity: bounceWithDelay.value - 1,
    backgroundColor: (0, import_react_native_reanimated.interpolateColor)(
      bounceWithDelay.value,
      [0, 1.3],
      ["transparent", zoomActionButtonColor]
    ),
    transform: [{ scale: bounceWithDelay.value }]
  }));
  return /* @__PURE__ */ import_react.default.createElement(import_react_native_gesture_handler.GestureDetector, { gesture: movingGesture }, /* @__PURE__ */ import_react.default.createElement(
    AnimatedTouchableOpacity,
    {
      style: [
        styles.actionButtonWrapper,
        { backgroundColor: zoomActionButtonColor },
        buttonAnimatedStyles
      ]
    },
    /* @__PURE__ */ import_react.default.createElement(
      import_react_native_reanimated.default.View,
      {
        style: [
          styles.actionButtonAnimatedWrapper,
          bounceWithDelayAnimatedStyles
        ]
      }
    ),
    /* @__PURE__ */ import_react.default.createElement(
      import_react_native_reanimated.default.View,
      {
        style: [styles.actionButtonAnimatedWrapper, bounceAnimatedStyles]
      }
    ),
    /* @__PURE__ */ import_react.default.createElement(
      import_react_native2.TouchableOpacity,
      {
        style: [styles.actionButton],
        onPress: handleButtonPress
      },
      buttonIcon
    )
  ));
};

// src/ComicReader/icons/ArrowLeft.tsx
var import_react2 = __toESM(require("react"));
var import_react_native_svg = __toESM(require("react-native-svg"));
var ArrowLeft = (props) => /* @__PURE__ */ import_react2.default.createElement(import_react_native_svg.default, { width: 24, height: 24, ...props, viewBox: "0 0 330 330" }, /* @__PURE__ */ import_react2.default.createElement(
  import_react_native_svg.Path,
  {
    fill: props.color || "#fff",
    d: "M111.213 165.004 250.607 25.607c5.858-5.858 5.858-15.355 0-21.213-5.858-5.858-15.355-5.858-21.213.001l-150 150.004a15 15 0 0 0 0 21.212l150 149.996C232.322 328.536 236.161 330 240 330s7.678-1.464 10.607-4.394c5.858-5.858 5.858-15.355 0-21.213L111.213 165.004z"
  }
));
var ArrowLeft_default = ArrowLeft;

// src/ComicReader/icons/ArrowRight.tsx
var import_react3 = __toESM(require("react"));
var import_react_native_svg2 = __toESM(require("react-native-svg"));
var ArrowRight = (props) => /* @__PURE__ */ import_react3.default.createElement(import_react_native_svg2.default, { width: 24, height: 24, ...props, viewBox: "-4.5 0 20 20" }, /* @__PURE__ */ import_react3.default.createElement(
  import_react_native_svg2.Path,
  {
    fill: props?.color || "#fff",
    fillRule: "evenodd",
    d: "M.366 19.708c.405.39 1.06.39 1.464 0l8.563-8.264a1.95 1.95 0 0 0 0-2.827L1.768.292A1.063 1.063 0 0 0 .314.282a.976.976 0 0 0-.011 1.425l7.894 7.617a.975.975 0 0 1 0 1.414L.366 18.295a.974.974 0 0 0 0 1.413"
  }
));
var ArrowRight_default = ArrowRight;

// src/ComicReader/icons/Reverse.tsx
var import_react4 = __toESM(require("react"));
var import_react_native_svg3 = __toESM(require("react-native-svg"));
var Reverse = (props) => /* @__PURE__ */ import_react4.default.createElement(import_react_native_svg3.default, { width: 24, height: 24, ...props, viewBox: "0 0 256 256" }, /* @__PURE__ */ import_react4.default.createElement(
  import_react_native_svg3.Path,
  {
    fill: props.color || "#fff",
    fillRule: "evenodd",
    d: "M55.265 167.072c-.975-1.973-3.388-2.796-5.372-1.847L42 169s22.5 53.5 85.5 56c60-1.5 96.627-48.626 97-96.5.373-47.874-37-95.5-95.5-96-57.5-1-79.556 45.004-79.556 45.004-1.073 1.93-1.944 1.698-1.944-.501V51.997a4 4 0 0 0-4-3.997H37c-2.209 0-4 1.8-4 4.008v48.984A3.998 3.998 0 0 0 36.998 105h50.504a3.995 3.995 0 0 0 3.998-3.993v-6.014c0-2.205-1.79-4.02-4.008-4.053l-25.484-.38c-2.214-.033-3.223-1.679-2.182-3.628C59.826 86.932 78 45 128.5 45.5c49 .5 82.751 41.929 82.5 83.242C208 184 166 211 127.5 210c-54.5 0-72.235-42.928-72.235-42.928z"
  }
));
var Reverse_default = Reverse;

// src/ComicReader/icons/Zoom.tsx
var import_react5 = __toESM(require("react"));
var import_react_native_svg4 = __toESM(require("react-native-svg"));
var Zoom = (props) => /* @__PURE__ */ import_react5.default.createElement(import_react_native_svg4.default, { width: 24, height: 24, ...props, viewBox: "0 0 32 32" }, /* @__PURE__ */ import_react5.default.createElement(
  import_react_native_svg4.Path,
  {
    fill: props.color || "#fff",
    fillRule: "evenodd",
    d: "M13.46 24.45c-6.29 0-11.39-5.01-11.39-11.2 0-6.19 5.1-11.21 11.39-11.21 6.29 0 11.39 5.02 11.39 11.21 0 6.19-5.1 11.2-11.39 11.2Zm18.228 5.8-8.259-8.13c2.163-2.35 3.491-5.45 3.491-8.87C26.92 5.93 20.894 0 13.46 0 6.026 0 0 5.93 0 13.25c0 7.31 6.026 13.24 13.46 13.24a13.52 13.52 0 0 0 8.472-2.96l8.293 8.16c.404.4 1.059.4 1.463 0 .405-.39.405-1.04 0-1.44ZM18.519 12.41h-3.997v-4c0-.56-.447-1-.999-1a.995.995 0 0 0-.999 1v4H8.529c-.551 0-.999.18-.999.73 0 .56.448 1.27.999 1.27h3.995v4c0 .56.448 1 .999 1 .552 0 .999-.44.999-1v-4h3.997c.551 0 .999-.45.999-1s-.448-1-.999-1Z"
  }
));
var Zoom_default = Zoom;

// src/ComicReader/util.ts
var import_react_native3 = require("react-native");
var import_react6 = require("react");
var imageDimensionsCache = {};
var useOriginalImageDimensions = () => {
  const getOriginalImageDimensions = (0, import_react6.useCallback)(
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
          const { width, height } = import_react_native3.Image.resolveAssetSource(imageSource);
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
    import_react_native3.Image.getSize(
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

// src/ComicReader/useCustomAnimations.ts
var import_react_native_reanimated2 = require("react-native-reanimated");
var import_react_native_gesture_handler2 = require("react-native-gesture-handler");
var useCustomAnimations = ({
  containerWidth,
  containerHeight,
  setIsListScrollEnabled
}) => {
  const isDoubleTaped = (0, import_react_native_reanimated2.useSharedValue)(false);
  const footerInnerLineAnimation = (0, import_react_native_reanimated2.useSharedValue)(0);
  const footerLineCircleAnimation = (0, import_react_native_reanimated2.useSharedValue)(1);
  const footerBallonTranslateX = (0, import_react_native_reanimated2.useSharedValue)(0);
  const footerBallonTranslateY = (0, import_react_native_reanimated2.useSharedValue)(0);
  const footerBallonRotateZ = (0, import_react_native_reanimated2.useSharedValue)(0);
  const footerBallonScale = (0, import_react_native_reanimated2.useSharedValue)(0);
  const comicImageX = (0, import_react_native_reanimated2.useSharedValue)(0);
  const comicImageY = (0, import_react_native_reanimated2.useSharedValue)(0);
  const comicImageScale = (0, import_react_native_reanimated2.useSharedValue)(1);
  const savedComicImageX = (0, import_react_native_reanimated2.useSharedValue)(0);
  const savedComicImageY = (0, import_react_native_reanimated2.useSharedValue)(0);
  const savedComicImageScale = (0, import_react_native_reanimated2.useSharedValue)(1);
  const centerX = containerWidth.value / 2;
  const centerY = containerHeight.value / 2;
  const resetAnimation = () => {
    comicImageX.value = (0, import_react_native_reanimated2.withTiming)(0, { duration: 1e3 });
    comicImageY.value = (0, import_react_native_reanimated2.withTiming)(0, { duration: 1e3 });
    comicImageScale.value = (0, import_react_native_reanimated2.withTiming)(1, { duration: 1e3 }, () => {
      savedComicImageX.value = comicImageX.value;
      savedComicImageY.value = comicImageY.value;
      savedComicImageScale.value = comicImageScale.value;
      (0, import_react_native_reanimated2.runOnJS)(setIsListScrollEnabled)(true);
    });
  };
  const doubleTap = import_react_native_gesture_handler2.Gesture.Tap().maxDuration(250).numberOfTaps(2).onStart((event) => {
    if (isDoubleTaped.value || savedComicImageScale.value >= 2 || savedComicImageScale.value > 1) {
      (0, import_react_native_reanimated2.runOnJS)(resetAnimation)();
      isDoubleTaped.value = false;
      return;
    }
    comicImageX.value = (0, import_react_native_reanimated2.withTiming)(-(event.x - centerX), { duration: 1e3 });
    comicImageY.value = (0, import_react_native_reanimated2.withTiming)(-(event.y - centerY), { duration: 1e3 });
    comicImageScale.value = (0, import_react_native_reanimated2.withTiming)(2, { duration: 1e3 }, () => {
      savedComicImageX.value = comicImageX.value;
      savedComicImageY.value = comicImageY.value;
      savedComicImageScale.value = comicImageScale.value;
      (0, import_react_native_reanimated2.runOnJS)(setIsListScrollEnabled)(false);
    });
    isDoubleTaped.value = true;
  });
  const pan = import_react_native_gesture_handler2.Gesture.Pan().onChange((event) => {
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
  const pinchGesture = import_react_native_gesture_handler2.Gesture.Pinch().onUpdate((e) => {
    comicImageScale.value = savedComicImageScale.value * e.scale;
  }).onFinalize(() => {
    savedComicImageScale.value = comicImageScale.value;
    if (comicImageScale.value > 1) {
      (0, import_react_native_reanimated2.runOnJS)(setIsListScrollEnabled)(false);
    }
  });
  const composedComicImageGestures = import_react_native_gesture_handler2.Gesture.Simultaneous(
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

// src/ComicReader/ComicImageView.tsx
var import_react7 = __toESM(require("react"));
var import_react_native4 = require("react-native");
var import_react_native_reanimated3 = __toESM(require("react-native-reanimated"));
var ComicImageView = ({
  imageSource,
  animatedComicImageStyles,
  currentComicIndex,
  onLayout
}) => {
  const [isLoading, setIsLoading] = (0, import_react7.useState)(false);
  const loading = (0, import_react_native_reanimated3.useSharedValue)(0.3);
  const onLoadEnd = () => {
    setIsLoading(false);
  };
  const onLoadStart = () => {
    setIsLoading(true);
  };
  (0, import_react7.useEffect)(() => {
    if (isLoading) {
      loading.value = (0, import_react_native_reanimated3.withRepeat)((0, import_react_native_reanimated3.withTiming)(0.8, { duration: 1e3 }), 0, true);
    } else {
      loading.value = 0;
    }
  }, [isLoading]);
  const loadingAnimatedStyles = (0, import_react_native_reanimated3.useAnimatedStyle)(() => ({
    opacity: loading.value
  }));
  return /* @__PURE__ */ import_react7.default.createElement(import_react_native_reanimated3.default.View, { key: currentComicIndex }, /* @__PURE__ */ import_react7.default.createElement(
    import_react_native_reanimated3.default.Image,
    {
      source: imageSource,
      style: [
        styles.image,
        animatedComicImageStyles ? animatedComicImageStyles : null
      ],
      resizeMode: "contain",
      onLayout,
      onLoadEnd,
      onLoadStart
    }
  ), isLoading ? /* @__PURE__ */ import_react7.default.createElement(import_react_native_reanimated3.default.View, { style: [styles.imageLoader, loadingAnimatedStyles] }, /* @__PURE__ */ import_react7.default.createElement(import_react_native4.ActivityIndicator, null)) : null);
};
var ComicImageView_default = import_react7.default.memo(ComicImageView);

// src/ComicReader/footer.tsx
var import_react8 = __toESM(require("react"));
var import_react_native5 = require("react-native");
var import_react_native_reanimated4 = __toESM(require("react-native-reanimated"));
var AnimatedTouchableOpacity2 = import_react_native_reanimated4.default.createAnimatedComponent(import_react_native5.TouchableOpacity);
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
  const footerInnerLineAnimatedStyles = (0, import_react_native_reanimated4.useAnimatedStyle)(() => ({
    width: animations.footerInnerLineAnimation.value
  }));
  const footerLineCircleAnimatedStyles = (0, import_react_native_reanimated4.useAnimatedStyle)(() => ({
    transform: [{ scale: animations.footerLineCircleAnimation.value }],
    backgroundColor: (0, import_react_native_reanimated4.interpolateColor)(
      animations.footerLineCircleAnimation.value,
      [1, 2],
      [secondaryColor, "black"]
    )
  }));
  const footerBallonAnimatedStyles = (0, import_react_native_reanimated4.useAnimatedStyle)(() => {
    return {
      transform: [
        { translateX: animations.footerBallonTranslateX.value },
        { translateY: animations.footerBallonTranslateY.value },
        { rotate: `${animations.footerBallonRotateZ.value}deg` },
        { scale: animations.footerBallonScale.value }
      ]
    };
  });
  return /* @__PURE__ */ import_react8.default.createElement(import_react_native_reanimated4.default.View, { style: styles.footer, entering: import_react_native_reanimated4.FadeIn.duration(500) }, /* @__PURE__ */ import_react8.default.createElement(
    AnimatedTouchableOpacity2,
    {
      style: styles.arrowWrapper,
      onPress: handlePrevSlide
    },
    /* @__PURE__ */ import_react8.default.createElement(ArrowLeft_default, { color: iconColor })
  ), /* @__PURE__ */ import_react8.default.createElement(import_react_native5.View, null, /* @__PURE__ */ import_react8.default.createElement(
    import_react_native_reanimated4.default.View,
    {
      style: [
        styles.footerCounterBallon,
        { backgroundColor: secondaryColor },
        footerBallonAnimatedStyles
      ]
    },
    /* @__PURE__ */ import_react8.default.createElement(import_react_native5.Text, { style: [styles.currentComicIndexLabel, { color: textColor }] }, currentComicIndex + 1),
    /* @__PURE__ */ import_react8.default.createElement(
      import_react_native5.View,
      {
        style: [
          styles.footerCounterBallonRope,
          { backgroundColor: secondaryColor }
        ]
      }
    )
  ), /* @__PURE__ */ import_react8.default.createElement(
    import_react_native_reanimated4.default.View,
    {
      style: [styles.footerLine, { backgroundColor: primaryColor }]
    },
    /* @__PURE__ */ import_react8.default.createElement(
      import_react_native_reanimated4.default.View,
      {
        style: [
          styles.footerInnerLine,
          { backgroundColor: secondaryColor },
          footerInnerLineAnimatedStyles
        ]
      }
    ),
    /* @__PURE__ */ import_react8.default.createElement(
      import_react_native_reanimated4.default.View,
      {
        style: [
          styles.footerLineCircle,
          { borderColor: secondaryColor },
          footerLineCircleAnimatedStyles
        ]
      },
      /* @__PURE__ */ import_react8.default.createElement(
        import_react_native_reanimated4.default.View,
        {
          style: [
            styles.footerLineInnerCircle,
            footerLineCircleAnimatedStyles,
            { backgroundColor: secondaryColor }
          ]
        }
      )
    )
  )), /* @__PURE__ */ import_react8.default.createElement(
    AnimatedTouchableOpacity2,
    {
      style: styles.arrowWrapper,
      onPress: handleNextSlide
    },
    /* @__PURE__ */ import_react8.default.createElement(ArrowRight_default, { color: iconColor })
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
  const flatListRef = (0, import_react9.useRef)(null);
  const numberOfItems = data.length;
  const [comicZoomButtonPressCount, setComicZoomButtonPressCount] = (0, import_react9.useState)(0);
  const [currentComicIndex, setCurrentComicIndex] = (0, import_react9.useState)(0);
  const [isListScrollEnabled, setIsListScrollEnabled] = (0, import_react9.useState)(true);
  const [comicBoundaries, setComicBoundaries] = (0, import_react9.useState)([]);
  const containerWidth = (0, import_react_native_reanimated5.useSharedValue)(0);
  const containerHeight = (0, import_react_native_reanimated5.useSharedValue)(0);
  const [originalImageDimensions, setOriginalImageDimensions] = (0, import_react9.useState)({
    width: 0,
    height: 0
  });
  const [adjustedImageDimensions, setAdjustedImageDimensions] = (0, import_react9.useState)({
    width: 0,
    height: 0
  });
  const onLayout = (event) => {
    containerWidth.value = event.nativeEvent.layout.width;
    containerHeight.value = event.nativeEvent.layout.height;
  };
  const { getOriginalImageDimensions } = useOriginalImageDimensions();
  (0, import_react9.useEffect)(() => {
    setComicBoundaries(
      data.map((_item, index) => {
        return screenWidth * index;
      })
    );
  }, []);
  (0, import_react9.useEffect)(() => {
    const fetchImageDimensions = async () => {
      try {
        const dimensions = await getOriginalImageDimensions(
          // @ts-ignore
          data[currentComicIndex].imageSource
        );
        setOriginalImageDimensions({
          width: dimensions.originalImageWidth,
          height: dimensions.originalImageHeight
        });
      } catch (error) {
        console.error("Error fetching image dimensions:", error);
      }
    };
    fetchImageDimensions();
  }, [currentComicIndex]);
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
    containerWidth,
    containerHeight,
    setIsListScrollEnabled
  });
  const handleComicZoomButton = async () => {
    if (comicZoomButtonPressCount > data[currentComicIndex]?.coordinates.length - 1) {
      setComicZoomButtonPressCount(0);
      comicImageX.value = (0, import_react_native_reanimated5.withTiming)(0, { duration: 1e3 });
      comicImageY.value = (0, import_react_native_reanimated5.withTiming)(0, { duration: 1e3 });
      comicImageScale.value = (0, import_react_native_reanimated5.withTiming)(1, { duration: 1e3 }, () => {
        (0, import_react_native_reanimated5.runOnJS)(setIsListScrollEnabled)(true);
      });
      return;
    }
    const adjustedImageWidth = +adjustedImageDimensions.width;
    const adjustedImageHeight = +adjustedImageDimensions.height;
    let adjustedCoordinateX = adjustedImageWidth / originalImageDimensions.width * data[currentComicIndex].coordinates[comicZoomButtonPressCount].x;
    adjustedCoordinateX = -adjustedCoordinateX;
    const adjustedCoordinateY = adjustedImageHeight / originalImageDimensions.height * data[currentComicIndex].coordinates[comicZoomButtonPressCount].y;
    comicImageX.value = (0, import_react_native_reanimated5.withTiming)(adjustedCoordinateX, {
      duration: 1e3
    });
    comicImageScale.value = (0, import_react_native_reanimated5.withTiming)(2, { duration: 1e3 }, () => {
      (0, import_react_native_reanimated5.runOnJS)(setIsListScrollEnabled)(false);
    });
    comicImageY.value = (0, import_react_native_reanimated5.withTiming)(
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
  const onComicImageLayout = (event) => {
    const w = event.nativeEvent.layout.width;
    const h = event.nativeEvent.layout.height;
    setAdjustedImageDimensions({
      width: w,
      height: h
    });
  };
  const buttonIcon = comicZoomButtonPressCount === 0 ? /* @__PURE__ */ import_react9.default.createElement(Zoom_default, { color: iconsColor }) : comicZoomButtonPressCount < data[currentComicIndex].coordinates.length ? /* @__PURE__ */ import_react9.default.createElement(ArrowRight_default, { color: iconsColor }) : /* @__PURE__ */ import_react9.default.createElement(Reverse_default, { color: iconsColor });
  const animatedComicImageStyles = (0, import_react_native_reanimated5.useAnimatedStyle)(() => ({
    transform: [
      { scale: comicImageScale.value },
      { translateX: comicImageX.value },
      { translateY: comicImageY.value }
    ]
  }));
  const renderItem = ({ item, index }) => {
    const isAnimationAllowed = currentComicIndex === index;
    return /* @__PURE__ */ import_react9.default.createElement(
      ComicImageView_default,
      {
        animatedComicImageStyles: isAnimationAllowed ? animatedComicImageStyles : null,
        imageSource: item.imageSource,
        currentComicIndex,
        onLayout: onComicImageLayout
      }
    );
  };
  const debouncedOnScrollAnimationEnd = (offset) => {
    footerBallonTranslateX.value = (0, import_react_native_reanimated5.withSpring)(
      offset < comicBoundaries[1] ? 0 : offset / (data.length - 1) - HORIZONTAL_SPACING
    );
    footerBallonTranslateY.value = (0, import_react_native_reanimated5.withDelay)(1e3, (0, import_react_native_reanimated5.withSpring)(15));
    footerLineCircleAnimation.value = (0, import_react_native_reanimated5.withTiming)(1, {
      duration: 500
    });
    footerBallonScale.value = (0, import_react_native_reanimated5.withDelay)(1e3, (0, import_react_native_reanimated5.withSpring)(0));
    footerBallonRotateZ.value = (0, import_react_native_reanimated5.withSpring)(0);
  };
  return /* @__PURE__ */ import_react9.default.createElement(import_react_native_gesture_handler3.GestureHandlerRootView, null, /* @__PURE__ */ import_react9.default.createElement(import_react_native6.View, { style: styles.container, onLayout }, /* @__PURE__ */ import_react9.default.createElement(import_react_native_gesture_handler3.GestureDetector, { gesture: composedComicImageGestures }, /* @__PURE__ */ import_react9.default.createElement(
    import_react_native_gesture_handler3.FlatList,
    {
      ref: flatListRef,
      data,
      contentContainerStyle: styles.contentContainerStyle,
      renderItem,
      keyExtractor: (item) => item.id,
      snapToInterval: screenWidth,
      decelerationRate: "fast",
      scrollEnabled: isListScrollEnabled,
      horizontal: true,
      showsHorizontalScrollIndicator: false,
      onScroll: (e) => {
        if (e.nativeEvent.contentOffset.x < 0) {
          return;
        }
        footerBallonTranslateY.value = (0, import_react_native_reanimated5.withSpring)(-25);
        const currentOffsetX = e.nativeEvent.contentOffset.x / (data.length - 1) - HORIZONTAL_SPACING;
        const velocityX = e.nativeEvent.velocity?.x || 0;
        footerInnerLineAnimation.value = (0, import_react_native_reanimated5.withSpring)(currentOffsetX);
        if (import_react_native6.Platform.OS === "ios") {
          footerBallonTranslateX.value = (0, import_react_native_reanimated5.withSpring)(
            e.nativeEvent.contentOffset.x < comicBoundaries[0] ? 0 : currentOffsetX
          );
        } else {
          footerBallonTranslateX.value = velocityX > 0 ? (0, import_react_native_reanimated5.withSpring)(currentOffsetX - 15) : (0, import_react_native_reanimated5.withSpring)(currentOffsetX + 15);
          footerBallonRotateZ.value = (0, import_react_native_reanimated5.withSpring)(
            velocityX > 0 ? -10 : 10
          );
        }
        footerBallonScale.value = (0, import_react_native_reanimated5.withSpring)(1);
        footerLineCircleAnimation.value = (0, import_react_native_reanimated5.withTiming)(2, {
          duration: 500
        });
        if (comicBoundaries.includes(e.nativeEvent.contentOffset.x)) {
          const currentIndex = comicBoundaries.indexOf(
            e.nativeEvent.contentOffset.x
          );
          setCurrentComicIndex(currentIndex);
          resetAnimation();
          setComicZoomButtonPressCount(0);
          debouncedOnScrollAnimationEnd(e.nativeEvent.contentOffset.x);
        }
      },
      onMomentumScrollEnd: (e) => {
        debouncedOnScrollAnimationEnd(e.nativeEvent.contentOffset.x);
      }
    }
  ))), /* @__PURE__ */ import_react9.default.createElement(
    ComicZoomActionButton,
    {
      ...{
        containerHeight,
        containerWidth,
        buttonIcon,
        handleButtonPress: handleComicZoomButton,
        zoomActionButtonColor
      }
    }
  ), data?.length > 1 ? /* @__PURE__ */ import_react9.default.createElement(
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ComicReader,
  ComicReaderTypes
});
