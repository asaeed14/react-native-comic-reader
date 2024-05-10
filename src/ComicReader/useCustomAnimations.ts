import { runOnJS, useSharedValue, withTiming } from "react-native-reanimated";
import { Gesture } from "react-native-gesture-handler";

import { useCustomAnimationsProps } from "./types";

export const useCustomAnimations = ({
  containerWidth,
  containerHeight,
  setIsListScrollEnabled,
}: useCustomAnimationsProps) => {
  const isDoubleTaped = useSharedValue(false);
  const footerInnerLineAnimation = useSharedValue(0);
  const footerLineCircleAnimation = useSharedValue(1);

  const footerBallonTranslateX = useSharedValue(0);
  const footerBallonTranslateY = useSharedValue(0);
  const footerBallonRotateZ = useSharedValue(0);
  const footerBallonScale = useSharedValue(0);

  const comicImageX = useSharedValue(0);
  const comicImageY = useSharedValue(0);
  const comicImageScale = useSharedValue(1);

  const savedComicImageX = useSharedValue(0);
  const savedComicImageY = useSharedValue(0);
  const savedComicImageScale = useSharedValue(1);

  const centerX = containerWidth.value / 2;
  const centerY = containerHeight.value / 2;

  const resetAnimation = () => {
    comicImageX.value = withTiming(0, { duration: 1000 });
    comicImageY.value = withTiming(0, { duration: 1000 });
    comicImageScale.value = withTiming(1, { duration: 1000 }, () => {
      savedComicImageX.value = comicImageX.value;
      savedComicImageY.value = comicImageY.value;
      savedComicImageScale.value = comicImageScale.value;
      runOnJS(setIsListScrollEnabled)(true);
    });
  };

  const doubleTap = Gesture.Tap()
    .maxDuration(250)
    .numberOfTaps(2)
    .onStart((event) => {
      if (
        isDoubleTaped.value ||
        savedComicImageScale.value >= 2 ||
        savedComicImageScale.value > 1
      ) {
        runOnJS(resetAnimation)();
        isDoubleTaped.value = false;
        return;
      }
      comicImageX.value = withTiming(-(event.x - centerX), { duration: 1000 });
      comicImageY.value = withTiming(-(event.y - centerY), { duration: 1000 });
      comicImageScale.value = withTiming(2, { duration: 1000 }, () => {
        savedComicImageX.value = comicImageX.value;
        savedComicImageY.value = comicImageY.value;
        savedComicImageScale.value = comicImageScale.value;
        runOnJS(setIsListScrollEnabled)(false);
      });
      isDoubleTaped.value = true;
    });

  const pan = Gesture.Pan()
    .onChange((event) => {
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
    })
    .onFinalize(() => {
      savedComicImageX.value = comicImageX.value;
      savedComicImageY.value = comicImageY.value;
    });

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      comicImageScale.value = savedComicImageScale.value * e.scale;
    })
    .onFinalize(() => {
      savedComicImageScale.value = comicImageScale.value;
      if (comicImageScale.value > 1) {
        runOnJS(setIsListScrollEnabled)(false);
      }
    });

  const composedComicImageGestures = Gesture.Simultaneous(
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
    resetAnimation,
  };
};
