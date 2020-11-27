import Watcher from "./watcher";

export default class Compiler {
    constructor(vm) {
        this.el = vm.$el
        this.vm = vm
        this.compile(this.el)
    }

    compile(el) {
        // 获取当前元素所有的子'节点'
        let nodes = el.childNodes
        Array.from(nodes).forEach(node => {
            if(this.isElementNode(node)) { // 如果是element 节点; 编译 element
                this.compileElementNode(node)
            } else if (this.isTextNode(node)) { // 如果是文本节点, 编译文本
                this.compileTextNode(node)
            }
            if(node.childNodes && node.childNodes.length) { // 如果还有子节点,重复操作
                this.compile(node)
            }
        })
    }
    
    compileElementNode(node) {
        const attrs = node.attributes
        Array.from(attrs).forEach(attr => {
            const {name, value} = attr
            if(this.isDirective(name)) {
                const key = value;
                this.update(node, key, name.substr(2))
            }
        })
    }

    update(node, key, name) {
        
        const updaterFn = this[name + 'Updater'];
        console.log(node, key, name)
        updaterFn && updaterFn.call(this, node, this.vm[key], key)
    }
    
    textUpdater(node, value ,key) {
        node.textContent = value
        new Watcher(this.vm, key, (newVal) => {
            console.log(222, newVal)
            node.textContent = newVal
        })
    }

    modelUpdater(node, value ,key) {
        node.value = value
        new Watcher(this.vm, key, (newVal) => {
            node.value = newVal
        })
        node.addEventListener('input', (e) => {
            console.log(node.value)
            this.vm[key] = node.value
        })
    }

    ifUpdater(node, key, name) {

    }

    compileTextNode(node) {
        // console.dir(node.nodeValue)
        let key = node.nodeValue
        const reg = /\{\{(.+?)\}\}/
        if(reg.test(key)) {
            key = RegExp.$1.trim()
            // console.dir(node)
            node.nodeValue = this.vm[key]
            new Watcher(this.vm, key, (newVal) => {
                console.log(3333, newVal)
                node.nodeValue = newVal
            })
        } 
        // const text = node.
    }

    isTextNode(node) {
        return node.nodeType === 3
    }

    isElementNode(node) {
        return node.nodeType === 1
    }

    isDirective(attr) {
        return attr.startsWith('v-')
    }

}