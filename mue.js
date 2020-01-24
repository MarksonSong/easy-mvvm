import Compiler from './compiler/compiler.js'
import Observer from './observer/observer.js'

// vue of Mark
class Mue {
    constructor(options) {
        this.$el = options.el
        this.$data = options.data
        this.$options = options
        if (this.$el) {
            // 劫持各属性的set，get
            new Observer(this.$data)
            // 第二个参数——Mue的实例，下文的vm，传vm主要是为了拿options（data）
            new Compiler(this.$el, this)
            // this代理this.$data
            this.proxyData(this.$data)
        }
    }
    proxyData(data) {
        // Object.keys(data);for(const prop in data);试试其他遍历方式
        Object.getOwnPropertyNames(data).forEach((prop) => {
            Object.defineProperty(this, prop, {
                get() {
                    return data[prop]
                },
                set(val) {
                    data[prop] = val
                }
            })
        })
        // 需要开变量赋值为proxy实例，但只能使用this.变量名来代理
        // return new Proxy(data, {
        //     get(target, property) {
        //         return target[property]
        //     },
        //     set(target, property, newVal) {
        //         target[property] = newVal
        //     }
        // })
    }
}

// 测试
const app = new Mue({
    el: '#app',
    data: {
        msg: 'haha',
        msg2: `<h1>what</h1>`,
        obj: {
            name: 'obj1',
            value: 'test'
        }
    },
    methods: {
        testFn1() {
            this.obj.name = 'obj.name变了'
        },
        testFn2() {
            this.msg = 'msg也变了'
        }
    }
})
console.log(app)

// 使控制台能通过vm访问Mue实例
window.vm = app
