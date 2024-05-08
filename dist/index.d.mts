import { SharedValue } from 'react-native-reanimated';
import { ImageRequireSource, LayoutChangeEvent } from 'react-native';

type Coordinates = {
    x: number;
    y: number;
}[];
type ComicItem = {
    id: string;
    imageSource: {
        uri: string;
    } | number;
    coordinates: Coordinates;
};
type ComicReaderProps = {
    data: ComicItem[];
    sliderPrimaryColor?: string;
    sliderSecondaryColor?: string;
    iconsColor?: string;
    zoomActionButtonColor?: string;
};
type FooterProps = {
    numberOfComics: number;
    currentComicIndex: number;
    currentAnimationIndex: number;
    onUpdateComicIndex: (index: number) => void;
    animations: any;
    primaryColor: string;
    secondaryColor: string;
    iconColor: string;
};
type ComicZoomActionButtonProps = {
    containerWidth: SharedValue<number>;
    containerHeight: SharedValue<number>;
    handleButtonPress: () => void;
    buttonIcon: React.ReactElement;
    zoomActionButtonColor: string;
};
type LocalImageSource = ImageRequireSource;
type RemoteImageSource = {
    uri: string;
};
type ImageSource = LocalImageSource | RemoteImageSource;
type GetActualImageDimensionsReturnProps = {
    originalImageWidth: number;
    originalImageHeight: number;
};
type ComicImageViewProps = {
    imageSource: ImageSource;
    animatedComicImageStyles: {};
    currentComicIndex: number;
    onLayout: (event: LayoutChangeEvent) => void;
};
type useFooterAnimationsProps = {
    containerWidth: SharedValue<number>;
    containerHeight: SharedValue<number>;
    setIsListScrollEnabled: (e: boolean) => void;
};

type types_ComicImageViewProps = ComicImageViewProps;
type types_ComicItem = ComicItem;
type types_ComicReaderProps = ComicReaderProps;
type types_ComicZoomActionButtonProps = ComicZoomActionButtonProps;
type types_FooterProps = FooterProps;
type types_GetActualImageDimensionsReturnProps = GetActualImageDimensionsReturnProps;
type types_ImageSource = ImageSource;
type types_LocalImageSource = LocalImageSource;
type types_RemoteImageSource = RemoteImageSource;
type types_useFooterAnimationsProps = useFooterAnimationsProps;
declare namespace types {
  export type { types_ComicImageViewProps as ComicImageViewProps, types_ComicItem as ComicItem, types_ComicReaderProps as ComicReaderProps, types_ComicZoomActionButtonProps as ComicZoomActionButtonProps, types_FooterProps as FooterProps, types_GetActualImageDimensionsReturnProps as GetActualImageDimensionsReturnProps, types_ImageSource as ImageSource, types_LocalImageSource as LocalImageSource, types_RemoteImageSource as RemoteImageSource, types_useFooterAnimationsProps as useFooterAnimationsProps };
}

declare const ComicReader: ({ data, zoomActionButtonColor, iconsColor, sliderPrimaryColor, sliderSecondaryColor, }: ComicReaderProps) => JSX.Element;

export { ComicReader, types as ComicReaderTypes };
