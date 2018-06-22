// Learn TypeScript:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/typescript/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Node)
    starNearNode:cc.Node = null;
    @property(cc.Node)
    starFarNode:cc.Node = null;
    @property
    nearSpeed:number = 0.01;
    @property
    farSpeed:number = 0.005;
    @property(cc.Node)
    leftLightNode:cc.Node = null;
    @property(cc.Node)
    rightLightNode:cc.Node = null;
    @property(cc.Node)
    leftLightAllNode:cc.Node = null;
    @property(cc.Node)
    rightLightAllNode:cc.Node = null;
    @property
    _isPause:boolean = true;
    @property([cc.Node])
    _nearNodes:cc.Node[] = [];
    @property([cc.Node])
    _farNodes:cc.Node[] = [];
    @property([cc.Animation])
    _leftAnimations:cc.Animation[] = [];
    @property([cc.Animation])
    _rightAnimations:cc.Animation[] = [];
    @property
    _canvasHeight:number = 0;
    
    // LIFE-CYCLE CALLBACKS:
    onLoad () {
    //  this.init();
    //  this.gameStart();
    };
    start () {
    
    };
    init(){
       if(this._nearNodes.length==0){
           this._canvasHeight = cc.find('Canvas').height;
           this._nearNodes[0] = this.starNearNode;
           this._nearNodes[1] = cc.instantiate(this.starNearNode);
           this._nearNodes[1].y = this._canvasHeight;
           this._nearNodes[1].parent = this.node;
           this._farNodes[0] = this.starFarNode;
           this._farNodes[1] = cc.instantiate(this.starFarNode);
           this._farNodes[1].y = this._canvasHeight;
           this._farNodes[1].parent = this.node;
           
           for(let i = 0;i<3;i++){
               var node:cc.Node = null;
               if(i == 0){
                 node = this.leftLightNode;
               }else{
                node =  cc.instantiate(this.leftLightNode);
                node.parent = this.node;
                node.y =cc.find('Canvas').height;
               }
              var anim = node.getComponent(cc.Animation);
              this._leftAnimations.push(anim);
           }
           for(let i = 0;i<2;i++){
                var node:cc.Node = null;
                if(i == 0){
                node = this.rightLightNode;
                }else{
                node =  cc.instantiate(this.rightLightNode);
                node.parent = this.node;
                node.y =cc.find('Canvas').height;
                }
                var anim = node.getComponent(cc.Animation);
                this._rightAnimations.push(anim);
           }
       }
    };
    gameStart(){
        this._isPause = false;
        this._leftAnimations.forEach((anim,index)=>{
            this.scheduleOnce(()=>{
                anim.play();
            },0.8*index);
        });
        this._rightAnimations.forEach((anim,index)=>{
            this.scheduleOnce(()=>{
                anim.play();
            },1*index);
        });
        this.leftLightAllNode.getComponent(cc.Animation).play();
        this.rightLightAllNode.getComponent(cc.Animation).play();
    };
    gameOver(){
        this._isPause  = true;
        this._leftAnimations.forEach((anim,index)=>{
           anim.pause();
        });
        this._rightAnimations.forEach((anim,index)=>{
           anim.pause();
        });
        this.leftLightAllNode.getComponent(cc.Animation).pause();
        this.rightLightAllNode.getComponent(cc.Animation).pause();
    };
    update (dt) {
      if(this._isPause) return ;
    //   this.starNearNode.y  -= this.nearSpeed*dt;
    //   this.starFarNode.y -= this.farSpeed*dt;
      for(let i = 0;i<this._nearNodes.length;i++){
          var node = this._nearNodes[i];
          if(node.y<=-this._canvasHeight){
              node.y = this._canvasHeight;
          }
          node.y -= this.nearSpeed*dt;
      }
      for(let i = 0;i<this._farNodes.length;i++){
        var node = this._farNodes[i];
        if(node.y<=-this._canvasHeight){
            node.y = this._canvasHeight;
        }
        node.y -= this.farSpeed*dt;
      }
    };
}
