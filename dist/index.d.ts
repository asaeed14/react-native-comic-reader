import { ImageRequireSource } from 'react-native';

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
    textColor?: string;
};
type FooterProps = {
    numberOfComics: number;
    currentComicIndex: number;
    onUpdateComicIndex: (index: number) => void;
    animations: any;
    primaryColor: string;
    secondaryColor: string;
    iconColor: string;
    textColor: string;
};
type ComicZoomActionButtonProps = {
    containerDimensions: {
        width: number;
        height: number;
    };
    handleButtonPress: () => void;
    buttonIcon: React.ReactElement;
    zoomActionButtonColor: string;
};
type LocalImageSource = ImageRequireSource;
type RemoteImageSource = {
    uri: string;
};
type ImageSource = LocalImageSource | RemoteImageSource;
type GetOriginalImageDimensionsReturnProps = {
    originalImageWidth: number;
    originalImageHeight: number;
};
type ComicImageViewProps = {
    imageSource: ImageSource;
    animatedComicImageStyles: {} | null;
};
type useCustomAnimationsProps = {
    containerDimensions: {
        width: number;
        height: number;
    };
    handleFlatListScrollEnable: (isEnabled: boolean) => void;
};

type types_ComicImageViewProps = ComicImageViewProps;
type types_ComicItem = ComicItem;
type types_ComicReaderProps = ComicReaderProps;
type types_ComicZoomActionButtonProps = ComicZoomActionButtonProps;
type types_FooterProps = FooterProps;
type types_GetOriginalImageDimensionsReturnProps = GetOriginalImageDimensionsReturnProps;
type types_ImageSource = ImageSource;
type types_LocalImageSource = LocalImageSource;
type types_RemoteImageSource = RemoteImageSource;
type types_useCustomAnimationsProps = useCustomAnimationsProps;
declare namespace types {
  export type { types_ComicImageViewProps as ComicImageViewProps, types_ComicItem as ComicItem, types_ComicReaderProps as ComicReaderProps, types_ComicZoomActionButtonProps as ComicZoomActionButtonProps, types_FooterProps as FooterProps, types_GetOriginalImageDimensionsReturnProps as GetOriginalImageDimensionsReturnProps, types_ImageSource as ImageSource, types_LocalImageSource as LocalImageSource, types_RemoteImageSource as RemoteImageSource, types_useCustomAnimationsProps as useCustomAnimationsProps };
}

declare const ComicReader: ({ data, zoomActionButtonColor, iconsColor, sliderPrimaryColor, sliderSecondaryColor, textColor, }: ComicReaderProps) => JSX.Element;

export { ComicReader, types as ComicReaderTypes };
