// Learn TypeScript:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/typescript/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
/**
 * 道具节点
 * _index 序号
 * 
 */
interface propConfig {
    index:number,
    startPoint:cc.Vec2;
    speedVec:cc.Vec2,
    orignalSize:number,
    sizeAccSpeed:number,
    sizeSpeed:number,
    accelSpeed:cc.Vec2,
    
}
const {ccclass, property} = cc._decorator;
@ccclass
export default class NewClass extends cc.Component {
     @property([cc.SpriteFrame])
     spriteFrame:cc.SpriteFrame[] = [];
     @property
     _index:number = 0;
     @property
     _score:number = 0;
     @property
     _control:any = null;
     @property
     _speedVec:cc.Vec2 = new cc.Vec2(0,0);
     @property
     _accelVec:cc.Vec2 = new cc.Vec2(0,0);
     @property
     _startPos:cc.Vec2 = new cc.Vec2(0,0);
     @property
     _spec:number = 0;

     @property
     _sizeSpeed = 0;
     @property
     _sizeAccSpeed = 0;
     @property
     _boxSize:cc.Size = null;
     @property
     _isExceedCharacter:boolean = false;
     @property
     _currentSetZindex:number = 0;
     onLoad () {
     };
     init(config:propConfig,control:any){
         this._isExceedCharacter = false;
         this._control = control;
         this.setSpriteFrameIndex(config.index);
         this._score= propInfor[this._index].score;
         this._spec = propInfor[this._index].spec;
         this._boxSize = propInfor[this._index].size;
         this._speedVec = config.speedVec;
         this._accelVec = config.accelSpeed;
         this.setStartPos(config.startPoint);
         this._sizeSpeed = config.sizeSpeed;
         this._sizeAccSpeed = config.sizeAccSpeed;
         this.setorignalSize(config.orignalSize);
     };
     setSpriteFrameIndex(index){
         this._index = index;
         this.node.getComponent(cc.Sprite).spriteFrame = this.spriteFrame[index];
         this.node.anchorX = 0.5;
         this.node.anchorY = 0;
     };
     setStartPos(vec:cc.Vec2){
        this.node.x = vec.x;
        this.node.y = vec.y;
        this._startPos = vec;
     };
     setZindex(index:number){
         if(this._isExceedCharacter){
            index =characterzIndex+index;
         }
         this._currentSetZindex = index;
         this.node.setLocalZOrder(index);
     };
     setIsExceedCharacter(){
         if(this._isExceedCharacter) return;
          this._isExceedCharacter = true;
          this._currentSetZindex  += characterzIndex;
          this.node.setLocalZOrder(this._currentSetZindex);
     };
     setorignalSize(size){
        this.node.scale = size;
     };
     unuse(){
        
     };
     reuse(){
        
     };
     getStartPosDistance():number{
         return cc.pDistance(this.node.position,this._startPos);
     };
     start () {};
     update (dt) {
        if(!this._control||this._control.getPauseStats()) return;
            this._speedVec.x += this._accelVec.x*dt;
            this._speedVec.y += this._accelVec.y*dt;
            this.node.x += this._speedVec.x*dt;
            this.node.y += this._speedVec.y*dt;
            this._sizeSpeed += this._sizeAccSpeed*dt;
            this.node.scale += this._sizeSpeed*dt;
            this.node.scale   =  cc.clampf(this.node.scale,0,1);
     };
}
