// 各属性的订阅者的收集者，一属性对应一收集者
class SubsAgent{
    constructor(){
        this.subscribers = []
    }

    addSubs(subs){
        this.subscribers.push(subs)
        // console.log(subs,'新订阅者加入啦','属性的订阅者队列：',this.subscribers);
    }

    notifyAllSubs(oldVal){
        this.subscribers.map(subs=>{
            subs.update(oldVal)
            // console.log(subs,'更新啦\n','属性的订阅者队列：',this.subscribers);
        })
    }
}

export default SubsAgent