import Dep from "./dep";

export default class Watcher {
    constructor(vm, key, callback) {
        this.vm = vm;
        this.key = key;
        this.callback = callback;
        // 创建的时候自身赋值给 Dep.target
        Dep.target = this;
        // 保存当前的value ; 并触发value 的getter方法
        this.oldVal = vm[key];
        // 清空Dep.target
        Dep.target = null
    }
    update() {
        if(this.oldVal !== this.vm[this.key]) {
            this.callback(this.vm[this.key])
        }
    }
}