import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { ComicImageViewProps } from "./types";
import { styles } from "./style";

const ComicImageView = ({
  imageSource,
  animatedComicImageStyles,
  currentComicIndex,
  onLayout,
}: ComicImageViewProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const loading = useSharedValue(0.3);

  const onLoadEnd = () => {
    setIsLoading(false);
  };
  const onLoadStart = () => {
    setIsLoading(true);
  };

  useEffect(() => {
    if (isLoading) {
      loading.value = withRepeat(withTiming(0.8, { duration: 1000 }), 0, true);
    } else {
      loading.value = 0;
    }
  }, [isLoading]);

  const loadingAnimatedStyles = useAnimatedStyle(() => ({
    opacity: loading.value,
  }));
  return (
    <Animated.View key={currentComicIndex}>
      <Animated.Image
        source={imageSource}
        style={[styles.image, animatedComicImageStyles]}
        resizeMode="contain"
        // @ts-ignore
        onLayout={onLayout}
        onLoadEnd={onLoadEnd}
        onLoadStart={onLoadStart}
      />
      {isLoading ? (
        <Animated.View style={[styles.imageLoader, loadingAnimatedStyles]}>
          <ActivityIndicator />
        </Animated.View>
      ) : null}
    </Animated.View>
  );
};

export default React.memo(ComicImageView);
