import { Image, ImageURISource } from "react-native";
import { GetOriginalImageDimensionsReturnProps } from "./types";

type RemoteImageSource = ImageURISource;
export type ImageSource = RemoteImageSource;

import { useCallback } from "react";

const imageDimensionsCache: {
  [uri: string]: { width: number; height: number };
} = {};

export const useOriginalImageDimensions = () => {
  const getOriginalImageDimensions = useCallback(
    async (
      imageSource: ImageSource
    ): Promise<GetOriginalImageDimensionsReturnProps> => {
      try {
        let originalImageWidth = 0;
        let originalImageHeight = 0;

        if (imageSource?.uri) {
          // Check if dimensions are already cached
          if (imageDimensionsCache[imageSource.uri]) {
            const { width, height } = imageDimensionsCache[imageSource.uri];
            originalImageWidth = width;
            originalImageHeight = height;
          } else {
            // Fetch dimensions if not cached
            const { width, height } = await getImageSize(imageSource.uri);
            originalImageWidth = width;
            originalImageHeight = height;
            // Cache the dimensions for future use
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

const getImageSize = async (
  uri: string
): Promise<{ width: number; height: number }> => {
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
