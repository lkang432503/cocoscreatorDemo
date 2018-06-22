const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    start () {

    };
    onLoad(){};
    init(score:number){
        var times = 2;
        var label = this.node.getComponent(cc.Label);
        if(score = 0) return ;
        if(score>0){
            label.string = '+'+score.toString();
        }else{
            label.string = score.toString();
        }
        // var action = cc.sequence(cc.spawn(cc.moveBy(times,cc.p(0,120)).easing(cc.es),cc.fadeTo(times,255)));
        // var action =  cc.sequence(
        //     cc.spawn(
        //         cc.moveBy(,cc.p(0,0)).easing(cc.easeOut(2)),
        //         cc.fadeIn(this.times),
        //         cc.scaleTo(this.times,2),
        //         cc.rotateTo(this.times,720)
        //     ),
        //     cc.delayTime(1),
        //     cc.callFunc(function(node){
        //         node.runAction(backAction);     
        //     })
        // );
        // node.runAction(action);
    }
}
