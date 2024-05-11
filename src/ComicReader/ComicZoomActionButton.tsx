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
  withTiming,
} from "react-native-reanimated";

import { ACTION_BUTTON_SIZE, screenWidth, styles } from "./style";
import { ComicZoomActionButtonProps } from "./types";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

export const ComicZoomActionButton = ({
  containerDimensions,
  handleButtonPress,
  buttonIcon,
  zoomActionButtonColor,
}: ComicZoomActionButtonProps) => {
  const buttonX = useSharedValue(screenWidth - ACTION_BUTTON_SIZE - 20);
  const buttonY = useSharedValue(-40);
  const buttonScale = useSharedValue(1);

  const bounceAnimation = useSharedValue(0);
  const bounceWithDelay = useSharedValue(0);

  useEffect(() => {
    bounceAnimation.value = withRepeat(
      withTiming(1.5, { duration: 2000 }),
      0,
      true
    );
    bounceWithDelay.value = withDelay(
      1000,
      withRepeat(withTiming(1.3, { duration: 2000 }), 0, true)
    );
  }, []);

  const movingGesture = Gesture.Pan()
    .onBegin(() => {
      buttonScale.value = withTiming(2, { duration: 1000 });
    })
    .onChange((event) => {
      buttonX.value += event.changeX;
      buttonY.value += event.changeY;
    })
    .onFinalize((event) => {
      buttonX.value = withDecay({
        velocity: event.velocityX,
        rubberBandEffect: true,
        clamp: [0, containerDimensions.width - ACTION_BUTTON_SIZE],
      });
      buttonY.value = withDecay({
        velocity: event.velocityY,
        rubberBandEffect: true,
        clamp: [0, -containerDimensions.height],
      });
      buttonScale.value = withTiming(1, { duration: 1000 });
    });

  const buttonAnimatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: buttonX.value },
      { translateY: buttonY.value },
      { scale: buttonScale.value },
    ],
  }));
  const bounceAnimatedStyles = useAnimatedStyle(() => ({
    opacity: bounceAnimation.value - 1,
    backgroundColor: interpolateColor(
      bounceAnimation.value,
      [0, 1, 1.5],
      ["transparent", "transparent", zoomActionButtonColor]
    ),
    transform: [{ scale: bounceAnimation.value }],
  }));

  const bounceWithDelayAnimatedStyles = useAnimatedStyle(() => ({
    opacity: bounceWithDelay.value - 1,
    backgroundColor: interpolateColor(
      bounceWithDelay.value,
      [0, 1.3],
      ["transparent", zoomActionButtonColor]
    ),
    transform: [{ scale: bounceWithDelay.value }],
  }));

  return (
    <GestureDetector gesture={movingGesture}>
      <AnimatedTouchableOpacity
        style={[
          styles.actionButtonWrapper,
          { backgroundColor: zoomActionButtonColor },
          buttonAnimatedStyles,
        ]}
      >
        <Animated.View
          style={[
            styles.actionButtonAnimatedWrapper,
            bounceWithDelayAnimatedStyles,
          ]}
        />
        <Animated.View
          style={[styles.actionButtonAnimatedWrapper, bounceAnimatedStyles]}
        />

        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleButtonPress}
        >
          {buttonIcon}
        </TouchableOpacity>
      </AnimatedTouchableOpacity>
    </GestureDetector>
  );
};
