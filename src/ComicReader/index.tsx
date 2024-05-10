import React, { useEffect, useRef, useState } from "react";
import { LayoutChangeEvent, Platform, View } from "react-native";
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

import { HORIZONTAL_SPACING, screenWidth, styles } from "./style";
import { ComicZoomActionButton } from "./ComicZoomActionButton";
import { ArrowRightIcon, ReverseIcon, ZoomIcon } from "./icons";
import { ComicItem, ComicReaderProps } from "./types";
import { useOriginalImageDimensions } from "./util";
import { useCustomAnimations } from "./useCustomAnimations";
import ComicImageView from "./ComicImageView";
import { Footer } from "./footer";

export const ComicReader = ({
  data,
  zoomActionButtonColor = "#D84355",
  iconsColor = "#FFF",
  sliderPrimaryColor = "#E47886",
  sliderSecondaryColor = "#D84355",
  textColor = "#FFF",
}: ComicReaderProps) => {
  const flatListRef = useRef(null);

  const numberOfItems = data.length;
  const [comicZoomButtonPressCount, setComicZoomButtonPressCount] = useState(0);
  const [currentComicIndex, setCurrentComicIndex] = useState(0);
  const [isListScrollEnabled, setIsListScrollEnabled] = useState(true);
  const [comicBoundaries, setComicBoundaries] = useState<number[]>([]);

  const containerWidth = useSharedValue(0);
  const containerHeight = useSharedValue(0);

  const [originalImageDimensions, setOriginalImageDimensions] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  const [adjustedImageDimensions, setAdjustedImageDimensions] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  const onLayout = (event: any) => {
    containerWidth.value = event.nativeEvent.layout.width;
    containerHeight.value = event.nativeEvent.layout.height;
  };
  const { getOriginalImageDimensions } = useOriginalImageDimensions();

  useEffect(() => {
    setComicBoundaries(
      data.map((_item, index) => {
        return screenWidth * index;
      })
    );
  }, []);

  useEffect(() => {
    const fetchImageDimensions = async () => {
      try {
        const dimensions = await getOriginalImageDimensions(
          // @ts-ignore
          data[currentComicIndex].imageSource
        );
        setOriginalImageDimensions({
          width: dimensions.originalImageWidth,
          height: dimensions.originalImageHeight,
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
    resetAnimation,
  } = useCustomAnimations({
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

    const adjustedImageWidth = +adjustedImageDimensions.width;
    const adjustedImageHeight = +adjustedImageDimensions.height;

    let adjustedCoordinateX =
      (adjustedImageWidth / originalImageDimensions.width) *
      data[currentComicIndex].coordinates[comicZoomButtonPressCount].x;

    adjustedCoordinateX = -adjustedCoordinateX;

    const adjustedCoordinateY =
      (adjustedImageHeight / originalImageDimensions.height) *
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
    if (comicImageScale.value > 1) {
      resetAnimation();
      setTimeout(() => {
        flatListRef.current &&
          // @ts-ignore
          flatListRef?.current.scrollToIndex({
            animated: true,
            index: index,
          });
      }, 1000);
    } else {
      flatListRef.current &&
        // @ts-ignore
        flatListRef?.current.scrollToIndex({
          animated: true,
          index: index,
        });
    }
  };

  const onComicImageLayout = (event: LayoutChangeEvent) => {
    const w = event.nativeEvent.layout.width;
    const h = event.nativeEvent.layout.height;

    setAdjustedImageDimensions({
      width: w,
      height: h,
    });
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

  const renderItem = ({ item, index }: { item: ComicItem; index: number }) => {
    const isAnimationAllowed = currentComicIndex === index;
    return (
      <ComicImageView
        animatedComicImageStyles={
          isAnimationAllowed ? animatedComicImageStyles : null
        }
        imageSource={item.imageSource}
        currentComicIndex={currentComicIndex}
        onLayout={onComicImageLayout}
      />
    );
  };

  const debouncedOnScrollAnimationEnd = (offset: number) => {
    footerBallonTranslateX.value = withSpring(
      offset < comicBoundaries[1]
        ? 0
        : offset / (data.length - 1) - HORIZONTAL_SPACING
    );
    footerBallonTranslateY.value = withDelay(1000, withSpring(15));
    footerLineCircleAnimation.value = withTiming(1, {
      duration: 500,
    });
    footerBallonScale.value = withDelay(1000, withSpring(0));
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
            showsHorizontalScrollIndicator={false}
            onScroll={(e) => {
              if (e.nativeEvent.contentOffset.x < 0) {
                return;
              }
              footerBallonTranslateY.value = withSpring(-25);
              const currentOffsetX =
                e.nativeEvent.contentOffset.x / (data.length - 1) -
                HORIZONTAL_SPACING;

              const velocityX = e.nativeEvent.velocity?.x || 0;
              footerInnerLineAnimation.value = withSpring(currentOffsetX);
              if (Platform.OS === "ios") {
                footerBallonTranslateX.value = withSpring(
                  e.nativeEvent.contentOffset.x < comicBoundaries[0]
                    ? 0
                    : currentOffsetX
                );
              } else {
                footerBallonTranslateX.value =
                  velocityX > 0
                    ? withSpring(currentOffsetX - 15)
                    : withSpring(currentOffsetX + 15);
                footerBallonRotateZ.value = withSpring(
                  velocityX > 0 ? -10 : 10
                );
              }

              footerBallonScale.value = withSpring(1);
              footerLineCircleAnimation.value = withTiming(2, {
                duration: 500,
              });

              // this will run on each boundary reached
              if (comicBoundaries.includes(e.nativeEvent.contentOffset.x)) {
                const currentIndex = comicBoundaries.indexOf(
                  e.nativeEvent.contentOffset.x
                );

                setCurrentComicIndex(currentIndex);
                resetAnimation();
                setComicZoomButtonPressCount(0);
                debouncedOnScrollAnimationEnd(e.nativeEvent.contentOffset.x);
              }
            }}
            onMomentumScrollEnd={(e) => {
              debouncedOnScrollAnimationEnd(e.nativeEvent.contentOffset.x);
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
      {data?.length > 1 ? (
        <Footer
          numberOfComics={numberOfItems}
          onUpdateComicIndex={handleComicIndexUpdate}
          currentComicIndex={currentComicIndex}
          primaryColor={sliderPrimaryColor}
          secondaryColor={sliderSecondaryColor}
          iconColor={iconsColor}
          textColor={textColor}
          animations={{
            footerInnerLineAnimation,
            footerLineCircleAnimation,
            footerBallonTranslateY,
            footerBallonScale,
            footerBallonRotateZ,
            footerBallonTranslateX,
          }}
        />
      ) : null}
    </GestureHandlerRootView>
  );
};
