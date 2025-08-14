import { defineStore } from 'pinia'
import { computed, readonly, ref } from 'vue'

export type Person = {
  id: string
  firstName: string
  surname: string
}

export const useCrudStore = defineStore('crud', () => {
  const people = ref<Person[]>([])

  const nextId = () => {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      return crypto.randomUUID()
    }
    const nums = people.value.map((p) => Number(p.id)).filter(Number.isFinite)
    const max = nums.length ? Math.max(...nums) : 0
    return String(max + 1)
  }

  const sorted = computed(() =>
    [...people.value].sort((a, b) => {
      const s = a.surname.localeCompare(b.surname)
      return s || a.firstName.localeCompare(b.firstName)
    }),
  )

  const filteredByPrefix = (prefix: string) => {
    const p = prefix.trim().toLowerCase()
    if (!p) return sorted.value
    return sorted.value.filter((x) => x.surname.toLowerCase().startsWith(p))
  }

  const create = (firstName: string, surname: string) => {
    const fn = firstName.trim()
    const sn = surname.trim()
    if (!fn || !sn) return
    people.value = [...people.value, { id: nextId(), firstName: fn, surname: sn }]
  }

  const update = (id: string, firstName: string, surname: string) => {
    const fn = firstName.trim()
    const sn = surname.trim()
    if (!id || !fn || !sn) return
    people.value = people.value.map((p) => (p.id === id ? { ...p, firstName: fn, surname: sn } : p))
  }

  const remove = (id: string) => {
    if (!id) return
    people.value = people.value.filter((p) => p.id !== id)
  }

  return {
    people,
    sorted: readonly(sorted),
    filteredByPrefix,
    create,
    update,
    remove,
  }
})
