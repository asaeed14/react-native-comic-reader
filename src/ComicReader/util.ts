import { Image } from "react-native";
import { GetActualImageDimensionsReturnProps, ImageSource } from "./types";

export const getActualImageDimensions = async (
  imageSource: ImageSource
): Promise<GetActualImageDimensionsReturnProps> => {
  let w = 0;
  let h = 0;

  // @ts-ignore
  if (imageSource?.uri) {
    await Image.getSize(
      //@ts-ignore
      imageSource.uri,
      (width, height) => {
        w = width;
        h = height;
      },
      (error) => console.error(error)
    );
    return {
      originalImageWidth: w,
      originalImageHeight: h,
    };
  } else {
    const { width, height } = Image.resolveAssetSource(imageSource);
    return {
      originalImageWidth: width,
      originalImageHeight: height,
    };
  }
};
