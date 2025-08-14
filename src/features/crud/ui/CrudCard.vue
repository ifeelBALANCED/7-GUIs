<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useCrudStore, type Person } from '../model'

import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { Card, CardContent } from '@/shared/ui/card'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/shared/ui/table'
import { ScrollArea } from '@/shared/ui/scroll-area'

const prefix = ref('')
const selectedId = ref<string | null>(null)
const personForm = reactive<Omit<Person, 'id'>>({
  firstName: '',
  surname: '',
})

const crud = useCrudStore()

const filteredPersons = computed(() => crud.filteredByPrefix(prefix.value))

const isCreateEnabled = computed(() => !!personForm.firstName.trim() && !!personForm.surname.trim())
const isUpdateEnabled = computed(() => !!selectedId.value)
const isDeleteEnabled = computed(() => !!selectedId.value)

const setActivePerson = (id: string) => {
  selectedId.value = id
  const current = crud.sorted.find((p) => p.id === id)
  if (current) {
    personForm.firstName = current.firstName
    personForm.surname = current.surname
  }
}

const clearSelection = () => {
  personForm.firstName = ''
  personForm.surname = ''
  selectedId.value = null
}

const createPerson = () => {
  crud.create(personForm.firstName, personForm.surname)
  clearSelection()
}

const updatePerson = () => {
  if (!selectedId.value) return
  crud.update(selectedId.value, personForm.firstName, personForm.surname)
  clearSelection()
}

const deletePerson = () => {
  if (!selectedId.value) return
  crud.remove(selectedId.value)
  clearSelection()
}
</script>

<template>
  <Card class="bg-slate-800 border-slate-700">
    <CardContent>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-white">Person Details</h3>

          <div class="space-y-2">
            <Label for="prefix" class="text-white">Filter by surname prefix</Label>
            <Input
              id="prefix"
              v-model="prefix"
              placeholder="e.g., Li"
              class="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
              autocomplete="off"
            />
          </div>

          <div class="space-y-2">
            <Label for="surname" class="text-white">Surname</Label>
            <Input
              id="surname"
              v-model="personForm.surname"
              placeholder="Enter surname"
              class="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
              autocomplete="off"
            />
          </div>

          <div class="space-y-2">
            <Label for="firstName" class="text-white">First Name</Label>
            <Input
              id="firstName"
              v-model="personForm.firstName"
              placeholder="Enter first name"
              class="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
              autocomplete="off"
            />
          </div>

          <div class="flex gap-3">
            <Button
              :disabled="!isCreateEnabled"
              class="flex-1 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-600 disabled:cursor-not-allowed"
              @click="createPerson"
            >
              Create
            </Button>

            <Button
              :disabled="!isUpdateEnabled"
              class="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed"
              @click="updatePerson"
            >
              Update
            </Button>

            <Button
              variant="destructive"
              :disabled="!isDeleteEnabled"
              class="flex-1 disabled:bg-slate-600 disabled:text-white disabled:cursor-not-allowed"
              @click="deletePerson"
            >
              Delete
            </Button>
          </div>
        </div>

        <div>
          <h3 class="text-lg font-semibold mb-4 text-white">People</h3>

          <ScrollArea class="h-[340px] rounded-md border border-slate-700">
            <Table>
              <TableHeader class="bg-slate-700">
                <TableRow>
                  <TableHead class="text-white">Full name</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                <TableRow
                  v-for="{ id, firstName, surname } in filteredPersons"
                  :key="id"
                  class="border-slate-700 hover:bg-slate-700/70 cursor-pointer"
                  :class="{ 'bg-slate-700/90': selectedId === id }"
                  @click="setActivePerson(id)"
                >
                  <TableCell class="text-white">{{ `${firstName} ${surname}` }}</TableCell>
                </TableRow>

                <TableRow v-if="!filteredPersons.length">
                  <TableCell class="text-slate-300 italic">No results</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
