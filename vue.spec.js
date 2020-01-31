import { createApp } from 'vue'
import Component from './Hello.vue'

test('It works', () => {
  console.log(Component)
  document.getElementsByTagName('html')[0].innerHTML = '';
  const el = document.createElement('div')
  el.id = 'app'
  document.body.appendChild(el)

  createApp(Component).mount('#app')

  console.log(document.body.outerHTML)
})
