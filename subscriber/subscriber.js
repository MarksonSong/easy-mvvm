import compileUtil from '../compiler/compileUtil.js'
import SubsAgent from './subsAgent.js'

// 订阅者--订阅属性，并收到每个属性变动的通知
// 执行指令绑定的相应回调函数，从而更新视图
class Subscriber {
    constructor(expr, vm, callback) {
        this.expr = expr
        this.vm = vm
        this.callback = callback
        // this.oldVal初始化之后值不再变化
        this.oldVal = this.getOldVal()
    }
    getOldVal() {
        SubsAgent.nowChangedSubs = this
        const oldValue = compileUtil.getExprVal(this.expr, this.vm)
        // 不设为null的话，普通的get也会push现在SubsAgent.nowChangedSubs指向的subs到非对应属性的队列
        SubsAgent.nowChangedSubs = null
        return oldValue
    }
    update(oldVal) {
        let newVal = compileUtil.getExprVal(this.expr, this.vm)
        if (newVal !== oldVal) {
            this.callback(newVal)
        }
    }
}

export default Subscriber