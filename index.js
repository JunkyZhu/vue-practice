import { h } from './node_modules/snabbdom/build/package/h.js'
import { init } from './node_modules/snabbdom/build/package/init.js'
import { classModule } from './node_modules/snabbdom/build/package/modules/class.js'
import { propsModule } from './node_modules/snabbdom/build/package/modules/props.js'
import { styleModule } from './node_modules/snabbdom/build/package/modules/style.js'
import { eventListenersModule } from './node_modules/snabbdom/build/package/modules/eventlisteners.js'
import vue from 'vue'

const oldVnode = document.getElementById('app');
const patch = init([classModule, propsModule, styleModule, eventListenersModule]);
const newVnode = h('div#myApp', {
    on: {
        click() {
            console.log(222)
        }
    }
}, [
    h('div#a1', '222'),
    h('div#a2', '333'),
])
patch(oldVnode, newVnode)
console.log(vue)
document.getElementById('click').onclick = function() {
    const clickVnode = h('div#myApp', {
        on: {
            click() {
                console.log(111)
            }
        }
    }, [
        h('div#a1', null, ['123',123]),
        h('div#a2', '333'),
    ])
    patch(newVnode, clickVnode)
}