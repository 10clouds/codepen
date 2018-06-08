import React from 'react'
import logoDark from './assets/cc-logo--dark.svg'
import logoLight from './assets/cc-logo--light.svg'
import MoonIcon from './components/icons/MoonIcon'
import SunIcon from './components/icons/SunIcon'

export const themes = {
  light: {
    background: '#f5f5f5',
    text: '#333333',
    success: '#22cd9a',
    warning: '#e85b99',
    accent: 'blue', //?
    logo: logoDark,
    menuItemShadow: 'pink',
    changeThemeIcon: MoonIcon,
    changeThemeText: 'Dark',
    changeThemeBackground: '#1b1d1f',
    barColor: '#f0f0f0',
    filterBackground: '#e6e6e6',
    tableGrid: '#e6e6e6',
  },
  dark: {
    background: '#1b1d1f',
    text: '#ffffff',
    success: '#53fbc9',
    warning: '#d34583',
    accent: '#3d45a4',
    logo: logoLight,
    menuItemShadow: 'rgba(0, 0, 0, .42)',
    changeThemeIcon: SunIcon,
    changeThemeText: 'Light',
    changeThemeBackground: '#f5f5f5',
    barColor: '#2f3033',
    filterBackground: '#26292c',
    tableGrid: '#2f3033'
  },
}

export const ThemeContext = React.createContext(
  themes.dark, // default value
)
