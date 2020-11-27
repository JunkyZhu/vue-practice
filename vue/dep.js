export default class Dep {
    constructor() {
        this.subs = []
    }
    addSub(sub) {
        // 有update属性, 就收集这个依赖
        sub && sub.update && this.subs.push(sub)
    }
    notify() {
        // 遍历所有依赖, 触发其update方法
        this.subs.forEach(sub => sub.update())
    }
}