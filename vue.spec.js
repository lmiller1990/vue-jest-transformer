import * as vue from 'vue'
import * as Component from './Hello.vue'

test('It works', () => {
  console.log(Component.render)
  document.getElementsByTagName('html')[0].innerHTML = '';
  const el = document.createElement('div')
  el.id = 'app'
  document.body.appendChild(el)

  vue.createApp({ 
    render: Component.render
    // render: () => vue.h('div', 'HI!') 
  }).mount('#app')

  console.log(document.body.outerHTML)
})
