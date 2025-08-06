import type { ThemeConfig } from 'antd'

/**
 * Custom Hook - useTheme
 * Provides theme configurations for different parts of the application.
 *
 * @returns {{ themeConfig: ThemeConfig, loginTheme: ThemeConfig,  greenButton: ThemeConfig, }} Theme configurations.
 */

export const useTheme = () => {
  // Main theme configuration
  const themeConfig: ThemeConfig = {
    token: {
      fontFamily: 'Red Hat Text',
      borderRadius: 4,
    },
    components: {
      Layout: {
        siderBg: 'rgb(250, 251, 255)',
        headerBg: 'rgb(255, 255, 255)',
      },
      Input: {
        activeShadow: `1px -1px 2px 0 rgba(0, 0, 0, 0.05), 
        0 1px 2px 0 rgba(0, 0, 0, 0.05), 
        0 2px 4px rgba(0, 0, 0, 0.1)`,
        colorPrimaryActive: 'rgb(0,0,0)',
        colorPrimaryHover: '#bdc1c6',
        activeBorderColor: 'rgba(0,0,0,0)',
        colorTextPlaceholder: '#5F6368',
      },
      Menu: {
        controlHeightLG: 24,
      },
      Card: {
        paddingLG: 0
      }
    },
  }

  return {
    themeConfig,
  }
}

export type ButtonThemeVariant = keyof Omit<ReturnType<typeof useTheme>, "themeConfig" | "login">;

