export type Circle = {
  id: string
  x: number
  y: number
  radius: number
}

export type Point = { x: number; y: number }

export type IdFn = () => string
export type RadiusFn = () => number
export type MenuPos = { x: number; y: number }

export type CirclesDefineOptions = Partial<{
  idFn: IdFn
  radiusFn: RadiusFn
  historyCapacity: number
}>
