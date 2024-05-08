import { Dimensions, StyleSheet } from 'react-native';

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

export const ACTION_BUTTON_SIZE = 50;
export const FOOTER_LINE_WIDTH = screenWidth - 70;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    alignItems: 'center',
  },
  image: {
    width: screenWidth,
    height: screenHeight,
  },
  imageLoader: {
    position: 'absolute',
    top: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth,
    height: screenWidth,
    backgroundColor: '#CCCCCC',
  },
  actionButtonWrapper: {
    width: ACTION_BUTTON_SIZE,
    height: ACTION_BUTTON_SIZE,
    borderRadius: 50,
    marginBottom: 10,
    marginRight: 10,
    elevation: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonAnimatedWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    position: 'absolute',
  },
  actionButton: {
    width: ACTION_BUTTON_SIZE,
    height: ACTION_BUTTON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bounceAnimation: {
    position: 'absolute',
    width: ACTION_BUTTON_SIZE + 70,
    height: ACTION_BUTTON_SIZE + 70,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    height: 24,
  },
  arrowWrapper: {
    padding: 5,
  },
  footerCounterBallon: {
    padding: 10,
    width: 30,
    height: 50,
    borderRadius: 14,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    left: -10,
  },
  currentComicIndexLabel: {
    fontWeight: 'bold',
  },
  footerCounterBallonRope: {
    width: 2,
    height: 8,
    position: 'absolute',
    bottom: -7,
    borderRadius: 2,
    overflow: 'visible',
  },
  footerLine: {
    width: FOOTER_LINE_WIDTH,
    height: 8,
    borderRadius: 4,
    alignItems: 'center',
    flexDirection: 'row',
  },
  footerInnerLine: {
    height: 8,
    width: 50,
    borderRadius: 4,
  },
  footerLineCircle: {
    width: 14,
    height: 14,
    borderRadius: 12,
    borderWidth: 8,
    marginLeft: -2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerLineInnerCircle: {
    width: 6,
    height: 6,
    borderRadius: 10,
  },
});
