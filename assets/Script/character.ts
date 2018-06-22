// Learn TypeScript:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/typescript/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
import topNodeTs from './topContent';
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property
    maxSpeed:number = 500;
    @property
    sizeWidth:number = 140;
    @property
    sizeHeight:number = 126;
    @property(cc.Prefab)
    boomPrefab:cc.Prefab = null;
    @property
    _rangeX:number = 0;
    @property
    _accX:number = 0;
    @property
    _gameControl:any = 0;
    @property(cc.Vec2)
    _topLeftPos:cc.Vec2=null;
    @property([cc.SpriteFrame])
    spriteFrams:cc.SpriteFrame[] = [];
    @property(cc.Prefab)
    scoreAddPrefab:cc.Prefab = null;
    @property(cc.Node)
    topNode:cc.Node = null;
    @property
    _topNodeJs:any = null;
    @property(cc.NodePool)
    _labelNodePool:cc.NodePool = null;
    @property(cc.NodePool)
    _boomNodePool:cc.NodePool = null;
    start () {

    };
    onLoad(){
       
    };
    init(index:number,gameControl:any){
       this._labelNodePool = new cc.NodePool('score_label');
       this._boomNodePool = new cc.NodePool('boom_node');
       this._topNodeJs = this.topNode.getComponent(topNodeTs);
       for(let i  = 0;i<5;i++){
           var newLabelNode = cc.instantiate(this.scoreAddPrefab);
           this._labelNodePool.put(newLabelNode);
       }
       for(let i = 0;i<2;i++){
           var newBoomNode = cc.instantiate(this.boomPrefab);
           this._boomNodePool.put(newBoomNode);
       }
       this._topLeftPos  = new cc.Vec2(0,0);
       this._gameControl = gameControl;
       this.setSpriteFrams(index);
     
       var screenSize = cc.view.getVisibleSize();
       this._rangeX = screenSize.width/2 - this.sizeWidth/2;
       cc.inputManager.setAccelerometerEnabled(true);
       cc.systemEvent.on(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
    };
    setSpriteFrams(index){
        this.node.getComponent(cc.Sprite).spriteFrame = this.spriteFrams[index];
        this.node.width = 192;
        this.node.height= 215;
    };
    onDeviceMotionEvent(event){
        this._accX = event.acc.x;
    };
    destroyTarget(){
        cc.inputManager.setAccelerometerEnabled(false);
        cc.systemEvent.off(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
    };
    //0代表道具在人物的上面，1代表道具与人物碰撞了，2代表道具在人物的下面，3代表在左边，4代表在右边
    isCollision(propTs){
        var target = this.node;
        var propNode:cc.Node = propTs.node;
        if(propTs._isExceedCharacter){
            /*表示前面那次已经检测过了在人物的下面*/
            return 2;
        }
        if(propNode.y>target.y+this.sizeHeight/2){
           return 0;
        }else if(propNode.y+propTs._boxSize.height<target.y-this.sizeHeight/2){
             return  2;
        }else if(propNode.x+propTs._boxSize.width/2<target.x-this.sizeWidth/2){
               //在左边
               return 3;

        }else if(propNode.x - propTs._boxSize.width/2>target.x+this.sizeWidth/2){
               //在右边
               return 4;
        }else{
            this.addScore(propTs._score);
            if(propTs._spec == 1){
                /*爆炸动画*/
               this.addBoomAnimate(propNode.position.clone());
            }
            return  1;
        }

    };
    addBoomAnimate(pos:cc.Vec2){
         var newBoomNode:cc.Node = null;
         if(this._boomNodePool.size()>0){
             newBoomNode = this._boomNodePool.get();
         }else{
             newBoomNode = cc.instantiate(this.boomPrefab);
         }
         newBoomNode.parent = this.node.parent;
         newBoomNode.position = pos;
         newBoomNode.setLocalZOrder(characterzIndex+1);
         var newBoomAnim = newBoomNode.getComponent(cc.Animation);
         newBoomAnim.play();
         this.scheduleOnce(()=>{
           this._boomNodePool.put(newBoomNode);
         },0.6);
    };
    //添加分数
    addScore(score){
        /*游戏暂停或者结束*/
        if(score ==0) return;
        if(this._gameControl.getPauseStats()){
            return;
        }
        let newLabelNode:cc.Node = null;
        if(this._labelNodePool.size()>0){
            newLabelNode = this._labelNodePool.get();
        }else{
            newLabelNode = cc.instantiate(this.scoreAddPrefab);
        }
        this._topNodeJs.addScore(score);
        newLabelNode.parent = this.node.parent;
        newLabelNode.setLocalZOrder(characterzIndex+2);
        newLabelNode.x = this.node.x;
        newLabelNode.y = this.node.y+50;
        newLabelNode.opacity = 100;
        newLabelNode.scale = 1;
        if(score>0){
            newLabelNode.getComponent(cc.Label).string = '+'+score;
            this.addScoreAnimate(newLabelNode);
        }else{
            newLabelNode.getComponent(cc.Label).string = score;
            this.subScoreAnimate(newLabelNode); 
        }

    };
    scoreAnimate(newLabelNode:cc.Node){
        var action_1 = cc.spawn(cc.moveBy(0.3,cc.p(0,80)),cc.fadeTo(0.3,255),cc.scaleBy(0.3,1.2));
        var action_2 = cc.sequence(action_1,cc.delayTime(0.1),cc.fadeTo(0.2,100),cc.callFunc((node)=>{
             this._labelNodePool.put(node);
        }));
        newLabelNode.runAction(action_2);
    };
    addScoreAnimate(node:cc.Node){
         node.color = cc.color(24,220,254);
         this.scoreAnimate(node);

    };
    subScoreAnimate(node:cc.Node){
         node.color = cc.color(255,192,254);
         this.scoreAnimate(node);
    };
    update(dt){
        if(!this._gameControl||this._gameControl.getPauseStats()) return;
        var target = this.node;
        target.x += this._accX*this.maxSpeed*dt;
        target.x = cc.clampf(target.x,-this._rangeX,this._rangeX);
        this._topLeftPos.x = target.x-this.sizeWidth/2;
        this._topLeftPos.y = target.y+this.sizeHeight/2;
    };

}
