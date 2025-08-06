import { Button, ButtonProps as AntdButtonProps, ConfigProvider } from 'antd'
import { ButtonThemeVariant, useTheme } from '../../../hooks/useTheme'


interface CustomButtonProps extends Omit<AntdButtonProps, 'color'> {
  /**
   * Color theme key for the button
   */
  color: ButtonThemeVariant
  /**
   * Special varient buttons
   */
  customVariant?: 'blue-linearGradient'
}

/**
 * Themed button component with Ant Design foundations
 *
 * @component
 * @example
 * <MyButton color="greenButton" htmlType="submit" className="h-11">
 *   Click me
 * </MyButton>
 */
const MyButton = ({
  type = 'primary',
  variant = 'solid',
  customVariant,
  color,
  children,
  ...rest
}: CustomButtonProps) => {
  const theme = useTheme()
  const colorTheme = theme[color]

  return (
    <ConfigProvider theme={colorTheme}>
      <div className={customVariant === 'blue-linearGradient' ? 'special-blue-btn' : ''}>
        <Button type={type} variant={variant} {...rest}>
          {children}
        </Button>
      </div>
    </ConfigProvider>
  )
}

export default MyButton
