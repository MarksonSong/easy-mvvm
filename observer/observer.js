import SubsAgent from '../subscriber/subsAgent.js'

class Observer {
    constructor(data) {
        this.observe(data)
    }

    observe(data) {
        // console.log(Object.getOwnPropertyDescriptors(data));
        Object.keys(data).map(key => {
            this.defineHijack(data, key, data[key])
        })
    }

    defineHijack(dataObj, key, value) {
        this.isObject(value) ? this.observe(value) : null
        // 初始化时每个属性都设置agent订阅者队列
        let agent = new SubsAgent()
        Object.defineProperty(dataObj, key, {
            enumerable: true,
            configurable: false,
            get() {
                // 初始化时，subscriber实例加入agent
                // 从而把属性的agent和一个或多个属性的subscriber绑定在一起
                SubsAgent.nowChangedSubs && agent.addSubs(SubsAgent.nowChangedSubs)

                return value
            },
            set: (newVal) => {
                const oldVal = value

                // 使用箭头让this能继承Observer的执行上下文,找到observe方法
                this.isObject(newVal) ? this.observe(newVal) : null
                value = newVal
                
                // 值改变后，触发属性的agent发布通知，进而属性的subscribers逐个更新
                // 传更新前的旧值value，使订阅者能和新值比较从而更新视图
                agent.notifyAllSubs(oldVal)

            }
        })
    }

    isObject(data) {
        return Object.prototype.toString.call(data) === "[object Object]"
    }

}

export default Observer