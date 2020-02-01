import { createApp } from 'vue'

import Component from './fixtures/Basic.vue'
import TypeScript from './fixtures/TypeScript.vue'

beforeEach(() => {
  document.getElementsByTagName('html')[0].innerHTML = '';
  const el = document.createElement('div')
  el.id = 'app'
  document.body.appendChild(el)
})

const getComponentMarkup = () => document.querySelector('#app').innerHTML

test('Compiles a basic vue component', () => {
  createApp(Component).mount('#app')
  expect(getComponentMarkup()).toBe('<div>Hello</div>')
})

test('Compiles component with TypeScript', () => {
  createApp(TypeScript).mount('#app')
  expect(getComponentMarkup()).toBe('<div>TypeScript</div>')
})
