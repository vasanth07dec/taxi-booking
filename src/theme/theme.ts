import { theme } from 'antd';
import type { ThemeConfig } from 'antd';

// Custom theme for Ant Design
export const antTheme: ThemeConfig = {
  token: {
    colorPrimary: '#1890FF',
    colorSuccess: '#52C41A',
    colorWarning: '#FAAD14',
    colorError: '#FF4D4F',
    colorInfo: '#1890FF',
    borderRadius: 8,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  components: {
    Button: {
      borderRadius: 8,
      controlHeight: 40,
    },
    Card: {
      borderRadius: 12,
    },
  },
  algorithm: theme.defaultAlgorithm,
};

// Color palette for custom styling
export const colors = {
  primary: {
    50: '#E6F7FF',
    100: '#BAE7FF',
    200: '#91D5FF',
    300: '#69C0FF',
    400: '#40A9FF',
    500: '#1890FF', // Primary
    600: '#096DD9',
    700: '#0050B3',
    800: '#003A8C',
    900: '#002766',
  },
  success: {
    50: '#F6FFED',
    100: '#D9F7BE',
    200: '#B7EB8F',
    300: '#95DE64',
    400: '#73D13D',
    500: '#52C41A', // Success
    600: '#389E0D',
    700: '#237804',
    800: '#135200',
    900: '#092B00',
  },
  warning: {
    50: '#FFF7E6',
    100: '#FFE7BA',
    200: '#FFD591',
    300: '#FFC069',
    400: '#FFA940',
    500: '#FAAD14', // Warning
    600: '#D48806',
    700: '#AD6800',
    800: '#874D00',
    900: '#613400',
  },
  error: {
    50: '#FFF1F0',
    100: '#FFCCC7',
    200: '#FFA39E',
    300: '#FF7875',
    400: '#FF4D4F', // Error
    500: '#F5222D',
    600: '#CF1322',
    700: '#A8071A',
    800: '#820014',
    900: '#5C0011',
  },
  neutral: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
};