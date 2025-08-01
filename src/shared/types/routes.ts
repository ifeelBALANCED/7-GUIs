export const ROUTES = {
  HOME: '/',
  COUNTER: '/counter',
  TEMPERATURE_CONVERTER: '/temperature-converter',
  FLIGHT_BOOKER: '/flight-booker',
  TIMER: '/timer',
  CRUD: '/crud',
  CIRCLE_DRAWER: '/circle-drawer',
  CELLS: '/cells',
  NOT_FOUND: '/:pathMatch(.*)*',
}

export type RouteNames = (typeof ROUTES)[keyof typeof ROUTES]
