import { Dimensions, Platform, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base dimensions designed for a standard phone
const baseWidth = 375;
const baseHeight = 812;

// Check if device is a tablet based on screen dimensions and pixel density
export const isTablet = () => {
  const pixelDensity = PixelRatio.get();
  const adjustedWidth = SCREEN_WIDTH * pixelDensity;
  const adjustedHeight = SCREEN_HEIGHT * pixelDensity;

  // Common tablet detection - diagonal screen size in inches
  const deviceDiagonal = Math.sqrt(
    Math.pow(adjustedWidth, 2) + Math.pow(adjustedHeight, 2)
  ) / pixelDensity / 160; // 160 is the standard pixel density

  return deviceDiagonal >= 7; // Most 7"+ devices are considered tablets
};

// Scale dimensions based on screen size
export const scale = (size: number) => {
  const ratio = isTablet() 
    ? Math.min(SCREEN_WIDTH / baseWidth, SCREEN_HEIGHT / baseHeight)
    : SCREEN_WIDTH / baseWidth;
  
  return size * ratio;
};

// For text - handles different scaling on iOS and Android
export const scaleFont = (size: number) => {
  const newSize = scale(size);
  
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
};

// Horizontal scale - useful for padding/margins
export const horizontalScale = (size: number) => {
  return (SCREEN_WIDTH / baseWidth) * size;
};

// Vertical scale - useful for padding/margins
export const verticalScale = (size: number) => {
  return (SCREEN_HEIGHT / baseHeight) * size;
};

// Create custom layouts for tablet/phone
export const getDeviceBasedLayout = <T, K>(phone: T, tablet: K): T | K => {
  return isTablet() ? tablet : phone;
};

// Get current device type
export const getDeviceType = () => {
  return isTablet() ? 'tablet' : 'phone';
};

// Convert percentage to actual dimension
export const widthPercentage = (percentage: number) => {
  return (percentage / 100) * SCREEN_WIDTH;
};

export const heightPercentage = (percentage: number) => {
  return (percentage / 100) * SCREEN_HEIGHT;
};
