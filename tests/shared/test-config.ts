export const TEST_TIMEOUT = 10000
export const ANIMATION_DELAY = 100

export const mockCircles = [
  { id: 'circle-1', x: 100, y: 100, radius: 20 },
  { id: 'circle-2', x: 200, y: 200, radius: 30 },
  { id: 'circle-3', x: 300, y: 300, radius: 25 },
]

export const mockPoints = [
  { x: 100, y: 100 },
  { x: 200, y: 200 },
  { x: 300, y: 300 },
]

export const testSelectors = {
  canvas: '[data-testid="circle-canvas"]',
  undoButton: '[data-testid="undo-button"]',
  redoButton: '[data-testid="redo-button"]',
  contextMenu: '[role="menu"]',
  dialog: '[role="dialog"]',
  slider: 'input[type="range"]',
  closeButton: '[data-testid="close-dialog"]',
  applyButton: '[data-testid="apply-button"]',
} as const

export const accessibilitySelectors = {
  ariaDisabled: '[aria-disabled="true"]',
  ariaExpanded: '[aria-expanded="true"]',
  ariaHidden: '[aria-hidden="true"]',
  ariaLabel: '[aria-label]',
  ariaLabelledBy: '[aria-labelledby]',
} as const

export const keyboardShortcuts = {
  undo: 'Control+z',
  redo: 'Control+y',
  escape: 'Escape',
  enter: 'Enter',
  space: ' ',
  tab: 'Tab',
} as const

export const viewportSizes = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1920, height: 1080 },
} as const

export const testUrls = {
  home: '/',
  counter: '/counter',
  temperatureConverter: '/temperature-converter',
  flightBooker: '/flight-booker',
  timer: '/timer',
  crud: '/crud',
  circleDrawer: '/circle-drawer',
  cells: '/cells',
} as const
