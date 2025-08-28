import type { Circle, Point } from '../model'

export function containsPoint(circle: Circle, point: Point): boolean {
  const dx = circle.x - point.x
  const dy = circle.y - point.y

  return dx * dx + dy * dy <= circle.radius * circle.radius
}

export function createCircle(id: string, p: Point, radius: number): Circle {
  return { id, x: p.x, y: p.y, radius }
}
