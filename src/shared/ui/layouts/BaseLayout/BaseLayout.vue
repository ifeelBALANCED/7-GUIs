<template>
  <div class="min-h-screen bg-slate-900 text-white">
    <header class="bg-teal-600 px-6 py-4 flex justify-between items-center">
      <h1 class="text-2xl font-bold">Seven GUIs</h1>
      <slot name="header" />
    </header>

    <main class="px-6 py-8 max-w-4xl mx-auto">
      <slot />
    </main>
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1e293b;
}

::-webkit-scrollbar-thumb {
  background: #475569;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}
</style>
