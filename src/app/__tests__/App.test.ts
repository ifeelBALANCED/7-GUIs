import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import Application from '../App.vue'
import { HomeView } from '@/views'

describe('Integration Test Example', () => {
  it('should render app with router and display home content', async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: '/',
          name: 'home',
          component: HomeView,
        },
      ],
    })

    const wrapper = mount(Application, {
      global: {
        plugins: [router],
      },
    })

    await router.isReady()
    await router.push('/')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('h1').text()).toBe('Home')
  })
})
