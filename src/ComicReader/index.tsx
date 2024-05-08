import React, { useRef, useState } from "react";
import { LayoutChangeEvent, View } from "react-native";
import {
  FlatList,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { ComicZoomActionButton } from "./ComicZoomActionButton";
import { useFooterAnimations } from "./animations";
import { getActualImageDimensions } from "./util";
import ComicImageView from "./ComicImageView";
import { Footer } from "./footer";
import { ArrowRightIcon, ReverseIcon, ZoomIcon } from "./icons";
import { screenWidth, styles } from "./style";
import { ComicItem, ComicReaderProps } from "./types";

export const ComicReader = ({
  data,
  zoomActionButtonColor = "#D84355",
  iconsColor = "#FFF",
  sliderPrimaryColor = "#E47886",
  sliderSecondaryColor = "#D84355",
}: ComicReaderProps) => {
  const flatListRef = useRef(null);

  const numberOfItems = data.length;
  const [comicZoomButtonPressCount, setComicZoomButtonPressCount] = useState(0);
  const [currentComicIndex, setCurrentComicIndex] = useState(0);
  const [currentAnimationIndex, setCurrentAnimationIndex] = useState(0);
  const [isListScrollEnabled, setIsListScrollEnabled] = useState(true);

  const containerWidth = useSharedValue(0);
  const containerHeight = useSharedValue(0);
  const [adjustedImageDimensions, setAdjustedImageDimensions] = useState("");

  const onLayout = (event: any) => {
    containerWidth.value = event.nativeEvent.layout.width;
    containerHeight.value = event.nativeEvent.layout.height;
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
    resetAnimation,
  } = useFooterAnimations({
    containerWidth,
    containerHeight,
    setIsListScrollEnabled,
  });

  const handleComicZoomButton = async () => {
    if (
      comicZoomButtonPressCount >
      data[currentComicIndex]?.coordinates.length - 1
    ) {
      setComicZoomButtonPressCount(0);
      comicImageX.value = withTiming(0, { duration: 1000 });
      comicImageY.value = withTiming(0, { duration: 1000 });
      comicImageScale.value = withTiming(1, { duration: 1000 }, () => {
        runOnJS(setIsListScrollEnabled)(true);
      });
      return;
    }

    const { originalImageWidth, originalImageHeight } =
      await getActualImageDimensions(data[currentComicIndex].imageSource);
    const adjustedImageWidth = +adjustedImageDimensions.split(",")[0];
    const adjustedImageHeight = +adjustedImageDimensions.split(",")[1];

    let adjustedCoordinateX =
      (adjustedImageWidth / originalImageWidth) *
      data[currentComicIndex].coordinates[comicZoomButtonPressCount].x;

    adjustedCoordinateX = -adjustedCoordinateX;

    const adjustedCoordinateY =
      (adjustedImageHeight / originalImageHeight) *
      data[currentComicIndex].coordinates[comicZoomButtonPressCount].y;

    comicImageX.value = withTiming(adjustedCoordinateX, {
      duration: 1000,
    });

    comicImageScale.value = withTiming(2, { duration: 1000 }, () => {
      runOnJS(setIsListScrollEnabled)(false);
    });

    comicImageY.value = withTiming(
      adjustedCoordinateY,
      {
        duration: 1000,
      },
      () => {
        savedComicImageX.value = comicImageX.value;
        savedComicImageY.value = comicImageY.value;
        savedComicImageScale.value = comicImageScale.value;
      }
    );

    setComicZoomButtonPressCount(comicZoomButtonPressCount + 1);
  };

  const handleComicIndexUpdate = (index: number) => {
    flatListRef.current &&
      // @ts-ignore
      flatListRef?.current.scrollToIndex({
        animated: true,
        index: index,
      });

    if (index < currentComicIndex) {
      setTimeout(() => {
        onScrollAnimationEnd(screenWidth * index);
      }, 1000);
    }
  };

  const onComicImageLayout = (event: LayoutChangeEvent) => {
    const w = event.nativeEvent.layout.width;
    const h = event.nativeEvent.layout.height;

    setAdjustedImageDimensions(`${w},${h}`);
  };

  const buttonIcon =
    comicZoomButtonPressCount === 0 ? (
      <ZoomIcon color={iconsColor} />
    ) : comicZoomButtonPressCount <
      data[currentComicIndex].coordinates.length ? (
      <ArrowRightIcon color={iconsColor} />
    ) : (
      <ReverseIcon color={iconsColor} />
    );

  const animatedComicImageStyles = useAnimatedStyle(() => ({
    transform: [
      { scale: comicImageScale.value },
      { translateX: comicImageX.value },
      { translateY: comicImageY.value },
    ],
  }));

  const renderItem = ({ item }: { item: ComicItem }) => (
    <ComicImageView
      animatedComicImageStyles={animatedComicImageStyles}
      imageSource={item.imageSource}
      currentComicIndex={currentComicIndex}
      onLayout={onComicImageLayout}
    />
  );

  const onScrollAnimationEnd = (offset: number) => {
    footerBallonTranslateX.value = withSpring(offset / 5);
    footerBallonTranslateY.value = withDelay(500, withSpring(15));
    footerLineCircleAnimation.value = withTiming(1, {
      duration: 500,
    });
    footerBallonScale.value = withDelay(500, withSpring(0));
    footerBallonRotateZ.value = withSpring(0);
  };

  return (
    <GestureHandlerRootView>
      <View style={styles.container} onLayout={onLayout}>
        <GestureDetector gesture={composedComicImageGestures}>
          <FlatList
            ref={flatListRef}
            data={data}
            contentContainerStyle={styles.contentContainerStyle}
            // @ts-ignore
            renderItem={renderItem}
            keyExtractor={(item: any) => item.id}
            snapToInterval={screenWidth}
            decelerationRate="fast"
            scrollEnabled={isListScrollEnabled}
            horizontal
            onViewableItemsChanged={(e) => {
              if (currentAnimationIndex === e.viewableItems[0]?.index) return;
              resetAnimation();
              setComicZoomButtonPressCount(0);
              setCurrentComicIndex(e.viewableItems[0]?.index || 0);
              setCurrentAnimationIndex(e.viewableItems[0]?.index || 0);
              setTimeout(() => {
                if (e.viewableItems?.[0].index) {
                  onScrollAnimationEnd(
                    screenWidth * e.viewableItems[0].index || 1
                  );
                }
              }, 500);
            }}
            onScroll={(e) => {
              footerBallonTranslateY.value = withSpring(-25);
              const currentOffsetX = e.nativeEvent.contentOffset.x / 5;
              const velocityX = e.nativeEvent.velocity?.x || 0;
              footerInnerLineAnimation.value = currentOffsetX;
              footerBallonTranslateX.value =
                velocityX > 0
                  ? withSpring(currentOffsetX - 15)
                  : withSpring(currentOffsetX + 15);
              footerBallonRotateZ.value = withSpring(velocityX > 0 ? -10 : 10);
              footerBallonScale.value = withSpring(1);
              footerLineCircleAnimation.value = withTiming(2, {
                duration: 1000,
              });
            }}
            onMomentumScrollEnd={(e) => {
              onScrollAnimationEnd(e.nativeEvent.contentOffset.x);
            }}
          />
        </GestureDetector>
      </View>
      <ComicZoomActionButton
        {...{
          containerHeight,
          containerWidth,
          buttonIcon,
          handleButtonPress: handleComicZoomButton,
          zoomActionButtonColor: zoomActionButtonColor,
        }}
      />
      <Footer
        numberOfComics={numberOfItems}
        onUpdateComicIndex={handleComicIndexUpdate}
        currentComicIndex={currentComicIndex}
        currentAnimationIndex={currentAnimationIndex}
        primaryColor={sliderPrimaryColor}
        secondaryColor={sliderSecondaryColor}
        iconColor={iconsColor}
        animations={{
          footerInnerLineAnimation,
          footerLineCircleAnimation,
          footerBallonTranslateY,
          footerBallonScale,
          footerBallonRotateZ,
          footerBallonTranslateX,
        }}
      />
    </GestureHandlerRootView>
  );
};
