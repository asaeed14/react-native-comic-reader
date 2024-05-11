import React, { useEffect, useRef, useState } from "react";
import { Platform, View } from "react-native";
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

import { HORIZONTAL_SPACING, screenHeight, screenWidth, styles } from "./style";
import { ComicZoomActionButton } from "./ComicZoomActionButton";
import { useCustomAnimations } from "./useCustomAnimations";
import { ArrowRightIcon, ReverseIcon, ZoomIcon } from "./icons";
import { ComicItem, ComicReaderProps } from "./types";
import { useOriginalImageDimensions } from "./util";
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
  const [currentComicIndex, setCurrentComicIndex] = useState(0);
  const [comicZoomButtonPressCount, setComicZoomButtonPressCount] = useState(0);
  const comicBoundaries = useSharedValue<number[]>(
    data.map((_item, index) => {
      return screenWidth * index;
    })
  );
  const [containerDimensions, setContainerDimensions] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  const originalImageDimensions = useSharedValue({
    width: 0,
    height: 0,
  });

  const onLayout = (event: any) => {
    setContainerDimensions({
      width: event.nativeEvent.layout.width,
      height: event.nativeEvent.layout.height,
    });
  };
  const { getOriginalImageDimensions } = useOriginalImageDimensions();

  useEffect(() => {
    const fetchImageDimensions = async () => {
      try {
        const dimensions = await getOriginalImageDimensions(
          // @ts-ignore
          data[currentComicIndex].imageSource
        );
        originalImageDimensions.value = {
          width: dimensions.originalImageWidth,
          height: dimensions.originalImageHeight,
        };
      } catch (error) {
        console.error("Error fetching image dimensions:", error);
      }
    };

    fetchImageDimensions();
  }, [currentComicIndex]);

  const handleFlatListScrollEnable = (isEnabled: boolean) => {
    //@ts-ignore
    flatListRef.current.setNativeProps({
      scrollEnabled: isEnabled,
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
    resetAnimation,
  } = useCustomAnimations({
    containerDimensions,
    handleFlatListScrollEnable,
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
        runOnJS(handleFlatListScrollEnable)(true);
      });
      return;
    }

    const adjustedImageWidth = screenWidth;
    const adjustedImageHeight = screenHeight;

    let adjustedCoordinateX =
      (adjustedImageWidth / originalImageDimensions.value.width) *
      data[currentComicIndex].coordinates[comicZoomButtonPressCount].x;

    adjustedCoordinateX = -adjustedCoordinateX;

    const adjustedCoordinateY =
      (adjustedImageHeight / originalImageDimensions.value.height) *
      data[currentComicIndex].coordinates[comicZoomButtonPressCount].y;

    comicImageX.value = withTiming(adjustedCoordinateX, {
      duration: 1000,
    });

    comicImageScale.value = withTiming(2, { duration: 1000 }, () => {
      runOnJS(handleFlatListScrollEnable)(false);
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
      />
    );
  };

  const OnScrollAnimationEnd = (offset: number) => {
    footerBallonTranslateX.value = withSpring(
      offset < comicBoundaries.value[1]
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
            scrollEnabled={true}
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
                  e.nativeEvent.contentOffset.x < comicBoundaries.value[0]
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
              if (
                comicBoundaries.value.includes(e.nativeEvent.contentOffset.x)
              ) {
                const currentIndex = comicBoundaries.value.indexOf(
                  e.nativeEvent.contentOffset.x
                );
                setCurrentComicIndex(currentIndex);
                setComicZoomButtonPressCount(0);
                OnScrollAnimationEnd(e.nativeEvent.contentOffset.x);
              }
            }}
            onMomentumScrollEnd={(e) => {
              OnScrollAnimationEnd(e.nativeEvent.contentOffset.x);
            }}
            initialNumToRender={2}
            windowSize={2}
            maxToRenderPerBatch={2}
          />
        </GestureDetector>
      </View>
      <ComicZoomActionButton
        {...{
          containerDimensions,
          buttonIcon,
          handleButtonPress: handleComicZoomButton,
          zoomActionButtonColor: zoomActionButtonColor,
        }}
      />
      {data.length > 1 ? (
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
