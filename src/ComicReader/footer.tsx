import { Text, TouchableOpacity, View } from "react-native";
import Animated, {
  FadeIn,
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";

import { ArrowLeftIcon, ArrowRightIcon } from "./icons";
import { FooterProps } from "./types";
import { styles } from "./style";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

export const Footer = ({
  numberOfComics,
  currentComicIndex,
  onUpdateComicIndex,
  animations,
  primaryColor,
  secondaryColor,
  iconColor,
}: FooterProps) => {
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

  const footerInnerLineAnimatedStyles = useAnimatedStyle(() => ({
    width: animations.footerInnerLineAnimation.value,
  }));

  const footerLineCircleAnimatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: animations.footerLineCircleAnimation.value }],
    backgroundColor: interpolateColor(
      animations.footerLineCircleAnimation.value,
      [1, 2],
      [secondaryColor, "black"]
    ),
  }));

  const footerBallonAnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: animations.footerBallonTranslateX.value },
        { translateY: animations.footerBallonTranslateY.value },
        { rotate: `${animations.footerBallonRotateZ.value}deg` },
        { scale: animations.footerBallonScale.value },
      ],
    };
  });

  return (
    <Animated.View style={styles.footer} entering={FadeIn.duration(500)}>
      <AnimatedTouchableOpacity
        style={styles.arrowWrapper}
        onPress={handlePrevSlide}
      >
        <ArrowLeftIcon color={iconColor} />
      </AnimatedTouchableOpacity>

      <View>
        <Animated.View
          style={[
            styles.footerCounterBallon,
            { backgroundColor: secondaryColor },
            footerBallonAnimatedStyles,
          ]}
        >
          <Text style={styles.currentComicIndexLabel}>
            {currentComicIndex + 1}
          </Text>
          <View
            style={[
              styles.footerCounterBallonRope,
              { backgroundColor: secondaryColor },
            ]}
          />
        </Animated.View>

        <Animated.View
          style={[styles.footerLine, { backgroundColor: primaryColor }]}
        >
          <Animated.View
            style={[
              styles.footerInnerLine,
              { backgroundColor: secondaryColor },
              footerInnerLineAnimatedStyles,
            ]}
          />
          <Animated.View
            style={[
              styles.footerLineCircle,
              { borderColor: secondaryColor },
              footerLineCircleAnimatedStyles,
            ]}
          >
            <Animated.View
              style={[
                styles.footerLineInnerCircle,
                footerLineCircleAnimatedStyles,
                { backgroundColor: secondaryColor },
              ]}
            />
          </Animated.View>
        </Animated.View>
      </View>
      <AnimatedTouchableOpacity
        style={styles.arrowWrapper}
        onPress={handleNextSlide}
      >
        <ArrowRightIcon color={iconColor} />
      </AnimatedTouchableOpacity>
    </Animated.View>
  );
};
