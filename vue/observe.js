import Dep from './dep'
export default class Observer {
    constructor(data) {
        this.walk(data)
    }
    walk(data) {
        // 如果data是个对象;遍历data所有的key进行响应式观测
        if (data && typeof data === 'object') {
            Object.keys(data).forEach(key => {
                this.defineReactive(data, key, data[key])
            }) 
        }
        
    }
    defineReactive(data, key ,value) {
        // 如果value是个对象,调用walk
        this.walk(value)
        const dep = new Dep()

        const that = this
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get() {
                // 如果Dep的静态属性当前状态有target属性(watcher实例) 添加依赖; 
                Dep.target && dep.addSub(Dep.target)
                return value
            },
            set(newValue) {
                if(value === newValue) return 
                
                value = newValue
                // 对新的值进行依赖监听
                that.walk(newValue)
                // 通知所有依赖
                dep.notify()
            }
        })
    }
}