import { computed, ref } from 'vue'
import { useRefHistory } from '@vueuse/core'
import type { Circle, IdFn, MenuPos, Point, RadiusFn } from './types'
import { containsPoint, createCircle } from '../lib'
import { defineStore } from 'pinia'

export const useCircles = defineStore('circle-drawer', () => {
  const idFn: IdFn = () => crypto.randomUUID?.() ?? Date.now().toString()
  const radiusFn: RadiusFn = () => Math.floor(Math.random() * 20) + 10
  const historyCapacity = 50

  const circles = ref<Circle[]>([])

  const { undo, redo, canUndo, canRedo } = useRefHistory(circles, {
    deep: true,
    capacity: historyCapacity,
  })

  const selected = ref<Circle | null>(null)
  const menu = ref<MenuPos | null>(null)
  const showDialog = ref(false)

  const isUndoDisabled = computed(() => !canUndo.value || selected.value !== null)
  const isRedoDisabled = computed(() => !canRedo.value || selected.value !== null)

  function hitTest(p: Point): Circle | undefined {
    return circles.value.find((c) => containsPoint(c, p))
  }

  function addOrSelectCircle(p: Point) {
    const hit = hitTest(p)
    if (hit) {
      selected.value = hit
      return
    }
    circles.value.push(createCircle(idFn(), p, radiusFn()))
    selected.value = null
  }

  function clearSelection() {
    selected.value = null
    closeMenu()
  }

  function openMenuAt(e: MouseEvent) {
    if (!selected.value) return
    menu.value = { x: e.clientX, y: e.clientY }
  }

  function closeMenu() {
    menu.value = null
  }

  function openAdjustDialog() {
    if (!selected.value) return
    showDialog.value = true
    closeMenu()
  }

  function closeAdjustDialog() {
    showDialog.value = false
    clearSelection()
  }

  function setSelectedRadius(newRadius: number) {
    if (!selected.value) return
    const idx = circles.value.findIndex((c) => c.id === selected.value!.id)
    if (idx >= 0 && circles.value[idx]) {
      circles.value[idx] = { ...circles.value[idx], radius: newRadius }
      selected.value = circles.value[idx]
    }
  }

  function handleUndo() {
    if (!canUndo.value) return
    undo()
    clearSelection()
  }

  function handleRedo() {
    if (!canRedo.value) return
    redo()
    clearSelection()
  }

  function eventPoint(e: MouseEvent): Point {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  function onCanvasClick(e: MouseEvent) {
    addOrSelectCircle(eventPoint(e))
  }

  return {
    circles,
    selected,
    menu,
    showDialog,
    canUndo,
    canRedo,
    isUndoDisabled,
    isRedoDisabled,

    onCanvasClick,
    openMenuAt,
    closeMenu,
    openAdjustDialog,
    closeAdjustDialog,
    setSelectedRadius,
    handleUndo,
    handleRedo,

    clearSelection,
  }
})
