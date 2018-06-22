
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    // LIFE-CYCLE CALLBACKS:
    /**
     * 实现适配方案 
     * 本游戏是对齐底部
     * 初级方案大于设计设计分别率的高宽比，缩放主游戏场景的高度
     * */
    onLoad () {
        window.onresize = this.changeSize.bind(this);
        this.changeSize();
    };
    changeSize(){
        var curHeight = this.node.height/2;
        if(cc.winSize.height/cc.winSize.width>1206/750){
            var scaleY = cc.winSize.height/1206;
                this.node.scaleY=scaleY;
                curHeight = this.node.height*scaleY/2;
        }
        this.node.y =   curHeight- cc.winSize.height/2;
    };
    start () {

    };
    update (dt) {

    };
}
