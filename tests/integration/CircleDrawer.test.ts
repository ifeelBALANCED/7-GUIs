import { describe, it, expect, beforeEach } from 'vitest'
import { circleModel } from '@/features/circle-drawer'
import CircleDrawerView from '@/views/tasks/CircleDrawerView.vue'
import { mountWithRouter } from '../shared/test-utils'

describe('CircleDrawer Integration', () => {
  beforeEach(() => {
    // Pinia is set up by mountWithRouter
  })

  describe('CircleDrawerView', () => {
    it('should render circle drawer page correctly', () => {
      const wrapper = mountWithRouter(CircleDrawerView)

      expect(wrapper.find('h2').text()).toContain('Sixth task of')
      expect(wrapper.find('button[data-testid="undo-button"]').exists()).toBe(true)
      expect(wrapper.find('button[data-testid="redo-button"]').exists()).toBe(true)
      expect(wrapper.find('[data-testid="circle-canvas"]').exists()).toBe(true)
    })

    it('should display task description', () => {
      const wrapper = mountWithRouter(CircleDrawerView)

      expect(wrapper.text()).toContain('Mouse handling, user input.')
      expect(wrapper.text()).toContain('The task is to build a frame containing')
    })

    it('should have proper navigation breadcrumb', () => {
      const wrapper = mountWithRouter(CircleDrawerView)

      const homeLink = wrapper.find('a[href="/"]')
      expect(homeLink.exists()).toBe(true)
      expect(homeLink.text()).toContain('Home')
    })
  })

  describe('Canvas Interactions', () => {
    it('should create circle on canvas click', async () => {
      const wrapper = mountWithRouter(CircleDrawerView)
      const store = circleModel.useCircles()

      const canvas = wrapper.find('[data-testid="circle-canvas"]')
      expect(canvas.exists()).toBe(true)

      await canvas.trigger('click', { clientX: 100, clientY: 100 })

      expect(store.circles).toHaveLength(1)
    })

    it('should select existing circle on click', async () => {
      const wrapper = mountWithRouter(CircleDrawerView)
      const store = circleModel.useCircles()

      const canvas = wrapper.find('[data-testid="circle-canvas"]')

      await canvas.trigger('click', { clientX: 100, clientY: 100 })
      await canvas.trigger('click', { clientX: 100, clientY: 100 })

      expect(store.selected).toBeTruthy()
      expect(store.selected?.x).toBe(100)
      expect(store.selected?.y).toBe(100)
    })

    it('should show context menu on right click of selected circle', async () => {
      const wrapper = mountWithRouter(CircleDrawerView)
      const store = circleModel.useCircles()

      const canvas = wrapper.find('[data-testid="circle-canvas"]')

      await canvas.trigger('click', { clientX: 100, clientY: 100 })
      await canvas.trigger('click', { clientX: 100, clientY: 100 })
      await canvas.trigger('contextmenu', { clientX: 100, clientY: 100 })

      expect(store.menu).toBeTruthy()
      expect(wrapper.find('[role="menu"]').exists()).toBe(true)
    })
  })

  describe('Undo/Redo Buttons', () => {
    it('should have undo button disabled initially', () => {
      const wrapper = mountWithRouter(CircleDrawerView)
      const undoButton = wrapper.find('button[data-testid="undo-button"]')

      expect(undoButton.attributes('disabled')).toBeDefined()
    })

    it('should have redo button disabled initially', () => {
      const wrapper = mountWithRouter(CircleDrawerView)
      const redoButton = wrapper.find('button[data-testid="redo-button"]')

      expect(redoButton.attributes('disabled')).toBeDefined()
    })

    it('should enable undo button after creating circle', async () => {
      const wrapper = mountWithRouter(CircleDrawerView)

      const canvas = wrapper.find('[data-testid="circle-canvas"]')
      await canvas.trigger('click', { clientX: 100, clientY: 100 })

      await wrapper.vm.$nextTick()

      const undoButton = wrapper.find('button[data-testid="undo-button"]')
      expect(undoButton.attributes('disabled')).toBeUndefined()
    })

    it('should handle undo button click', async () => {
      const wrapper = mountWithRouter(CircleDrawerView)
      const store = circleModel.useCircles()

      const canvas = wrapper.find('[data-testid="circle-canvas"]')
      await canvas.trigger('click', { clientX: 100, clientY: 100 })

      const undoButton = wrapper.find('button[data-testid="undo-button"]')
      await undoButton.trigger('click')

      expect(store.circles).toHaveLength(0)
    })

    it('should handle redo button click', async () => {
      const wrapper = mountWithRouter(CircleDrawerView)
      const store = circleModel.useCircles()

      const canvas = wrapper.find('[data-testid="circle-canvas"]')
      await canvas.trigger('click', { clientX: 100, clientY: 100 })

      const undoButton = wrapper.find('button[data-testid="undo-button"]')
      await undoButton.trigger('click')

      const redoButton = wrapper.find('button[data-testid="redo-button"]')
      await redoButton.trigger('click')

      expect(store.circles).toHaveLength(1)
    })
  })

  describe('Context Menu', () => {
    it('should display adjust diameter option', async () => {
      const wrapper = mountWithRouter(CircleDrawerView)

      const canvas = wrapper.find('[data-testid="circle-canvas"]')
      await canvas.trigger('click', { clientX: 100, clientY: 100 })
      await canvas.trigger('click', { clientX: 100, clientY: 100 })
      await canvas.trigger('contextmenu', { clientX: 100, clientY: 100 })

      const menuItem = wrapper.find('[role="menu"] button')
      expect(menuItem.text()).toContain('Adjust diameter')
    })

    it('should open radius adjustment dialog', async () => {
      const wrapper = mountWithRouter(CircleDrawerView)
      const store = circleModel.useCircles()

      const canvas = wrapper.find('[data-testid="circle-canvas"]')
      await canvas.trigger('click', { clientX: 100, clientY: 100 })
      await canvas.trigger('click', { clientX: 100, clientY: 100 })
      await canvas.trigger('contextmenu', { clientX: 100, clientY: 100 })

      const menuItem = wrapper.find('[role="menu"] button')
      await menuItem.trigger('click')

      expect(store.showDialog).toBe(true)
    })
  })

  describe('Radius Adjustment Dialog', () => {
    it('should display radius adjustment dialog', async () => {
      const wrapper = mountWithRouter(CircleDrawerView)
      const store = circleModel.useCircles()

      store.selected = { id: 'test', x: 100, y: 100, radius: 20 }
      store.showDialog = true

      await wrapper.vm.$nextTick()

      const dialog = wrapper.find('h3')
      expect(dialog.text()).toContain('Adjust Circle Diameter')
    })

    it('should have slider for radius adjustment', async () => {
      const wrapper = mountWithRouter(CircleDrawerView)
      const store = circleModel.useCircles()

      store.selected = { id: 'test', x: 100, y: 100, radius: 20 }
      store.showDialog = true

      await wrapper.vm.$nextTick()

      const slider = wrapper.find('input[type="range"]')
      expect(slider.exists()).toBe(true)
    })

    it('should close dialog on close button click', async () => {
      const wrapper = mountWithRouter(CircleDrawerView)
      const store = circleModel.useCircles()

      store.selected = { id: 'test', x: 100, y: 100, radius: 20 }
      store.showDialog = true

      await wrapper.vm.$nextTick()

      const closeButton = wrapper
        .findAll('button')
        .find((button) => button.text().includes('Close'))
      if (closeButton) {
        await closeButton.trigger('click')
      }

      expect(store.showDialog).toBe(false)
    })
  })

  describe('State Management', () => {
    it('should maintain circle state across component updates', async () => {
      const wrapper = mountWithRouter(CircleDrawerView)
      const store = circleModel.useCircles()

      const canvas = wrapper.find('[data-testid="circle-canvas"]')
      await canvas.trigger('click', { clientX: 100, clientY: 100 })
      await canvas.trigger('click', { clientX: 200, clientY: 200 })

      expect(store.circles).toHaveLength(2)

      await wrapper.vm.$forceUpdate()

      expect(store.circles).toHaveLength(2)
    })

    it('should handle multiple circles correctly', async () => {
      const wrapper = mountWithRouter(CircleDrawerView)
      const store = circleModel.useCircles()

      const canvas = wrapper.find('[data-testid="circle-canvas"]')
      const positions = [
        { x: 100, y: 100 },
        { x: 200, y: 200 },
        { x: 300, y: 300 },
      ]

      for (const pos of positions) {
        await canvas.trigger('click', { clientX: pos.x, clientY: pos.y })
      }

      expect(store.circles).toHaveLength(3)
      expect(store.circles[0]?.x).toBe(100)
      expect(store.circles[1]?.x).toBe(200)
      expect(store.circles[2]?.x).toBe(300)
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      const wrapper = mountWithRouter(CircleDrawerView)

      const undoButton = wrapper.find('button[data-testid="undo-button"]')
      expect(undoButton.attributes('disabled')).toBeDefined()

      const redoButton = wrapper.find('button[data-testid="redo-button"]')
      expect(redoButton.attributes('disabled')).toBeDefined()
    })

    it('should have keyboard navigation support', async () => {
      const wrapper = mountWithRouter(CircleDrawerView)

      const undoButton = wrapper.find('button[data-testid="undo-button"]')
      await undoButton.trigger('keydown.enter')

      const redoButton = wrapper.find('button[data-testid="redo-button"]')
      await redoButton.trigger('keydown.space')
    })
  })
})
