import { SharedValue } from "react-native-reanimated";
import { ImageRequireSource, LayoutChangeEvent } from "react-native";

type Coordinates = {
  x: number;
  y: number;
}[];

export type ComicItem = {
  id: string;
  imageSource:
    | {
        uri: string;
      }
    | number;
  coordinates: Coordinates;
};

export type ComicReaderProps = {
  data: ComicItem[];
  sliderPrimaryColor?: string;
  sliderSecondaryColor?: string;
  iconsColor?: string;
  zoomActionButtonColor?: string;
  textColor?: string;
};

export type FooterProps = {
  numberOfComics: number;
  currentComicIndex: number;
  onUpdateComicIndex: (index: number) => void;
  animations: any;
  primaryColor: string;
  secondaryColor: string;
  iconColor: string;
  textColor: string;
};

export type ComicZoomActionButtonProps = {
  containerWidth: SharedValue<number>;
  containerHeight: SharedValue<number>;
  handleButtonPress: () => void;
  buttonIcon: React.ReactElement;
  zoomActionButtonColor: string;
};

export type LocalImageSource = ImageRequireSource;
export type RemoteImageSource = { uri: string };
export type ImageSource = LocalImageSource | RemoteImageSource;

export type GetOriginalImageDimensionsReturnProps = {
  originalImageWidth: number;
  originalImageHeight: number;
};

export type ComicImageViewProps = {
  imageSource: ImageSource;
  animatedComicImageStyles: {} | null;
  currentComicIndex: number;
  onLayout: (event: LayoutChangeEvent) => void;
};

export type useCustomAnimationsProps = {
  containerWidth: SharedValue<number>;
  containerHeight: SharedValue<number>;
  setIsListScrollEnabled: (e: boolean) => void;
};
