import { createPinia, setActivePinia } from 'pinia'
import { mount } from '@vue/test-utils'
import type { ComponentMountingOptions } from '@vue/test-utils'
import type { Circle, Point } from '@/features/circle-drawer/model/types'
import { createRouter, createWebHistory } from 'vue-router'

export function setupPinia() {
  const pinia = createPinia()
  setActivePinia(pinia)
  return pinia
}

export function createMockCircle(overrides: Partial<Circle> = {}): Circle {
  return {
    id: 'test-circle-1',
    x: 100,
    y: 100,
    radius: 20,
    ...overrides,
  }
}

export function createMockPoint(overrides: Partial<Point> = {}): Point {
  return {
    x: 100,
    y: 100,
    ...overrides,
  }
}

export function createMockMouseEvent(overrides: Partial<MouseEvent> = {}): MouseEvent {
  return {
    clientX: 100,
    clientY: 100,
    currentTarget: {
      getBoundingClientRect: () => ({ left: 0, top: 0 }),
    },
    ...overrides,
  } as unknown as MouseEvent
}

export function createMockRouter() {
  return createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        name: 'home',
        component: { template: '<div>Home</div>' },
      },
      {
        path: '/circle-drawer',
        name: 'circle-drawer',
        component: { template: '<div>Circle Drawer</div>' },
      },
    ],
  })
}

export function mountWithPinia<T>(component: T, options: ComponentMountingOptions<T> = {}) {
  const pinia = setupPinia()

  return mount(component, {
    global: {
      plugins: [pinia],
    },
    ...options,
  })
}

export function mountWithRouter<T>(component: T, options: ComponentMountingOptions<T> = {}) {
  const pinia = setupPinia()
  const router = createMockRouter()

  return mount(component, {
    global: {
      plugins: [pinia, router],
    },
    ...options,
  })
}

export function waitForNextTick() {
  return new Promise((resolve) => setTimeout(resolve, 0))
}

export function createMockCanvasBoundingBox() {
  return {
    x: 0,
    y: 0,
    width: 400,
    height: 300,
    top: 0,
    left: 0,
    right: 400,
    bottom: 300,
    toJSON: () => ({}),
  }
}

export const testIds = {
  undoButton: 'undo-button',
  redoButton: 'redo-button',
  circleCanvas: 'circle-canvas',
  closeDialog: 'close-dialog',
  radiusSlider: 'radius-slider',
  applyButton: 'apply-button',
} as const
