import Observe from './observe'
import Compiler from './compiler'
class Vue {
    /**
     * 
     * @param {*} options 
     */
    constructor(options) {
        this.$data = options.data;
        this.$props = options.props;
        // 当前的真实dom对象
        this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : el;
        // 代理data到this上到时候直接访问
        this._proxyData(this.$data);
        // 对data进行响应式监测
        new Observe(options.data)
        // 编译插值表达式 & 指令
        new Compiler(this)
    }
    /**
     * 
     * @param {将options的data全部代理到this实例上面} data 
     */
    _proxyData(data) {
        Object.keys(data).forEach(key => {
            Object.defineProperty(this, key, {
                enumerable: true,
                configurable: true,
                get() {
                    return data[key]
                },
                set(value) {
                    if(value === data[key]) {
                        return 
                    }
                    data[key] = value
                }
            })
        })
    }
}

window.vm = new Vue({
    el: '#app',
    data: {
      number: 0,
      msg: 'hello',
      person: {
        name: 'xxx'
      },
      content: '111',
      name: '123'
    },
    render() {
      document.getElementById('myApp').text = data.number
    }
  })
  console.log(vm)

export default Vue