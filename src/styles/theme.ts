export const theme = {
  blank: 'white',
  primaryColor: '#8050c7',
  secondaryColor: '#5292ff',
  primaryTextColor: '#585858',
  successColor: '#1cbf6c',
  errorColor: '#ED0E52',
  secondaryHoverColor: 'rgba(82, 146, 255, 0.1)',
  primaryTint: '#f2edfa',
  primaryHoverColor: '#723BC3',
  lightTextColor: '#A6A6A6',
  borderColor: '#F0F0F0',
  borderRadiusLarge: '8px',
  borderRadius: '4px',
  inputBackgroundColor: '#F7F7F7',
  maxContentWidth: 1100,
  maxEditorWidth: 680,
  navShadow: '0px 0px 6px 0px rgba(0, 0, 0, 0.15)',
} as const;

export type Theme = typeof theme;
