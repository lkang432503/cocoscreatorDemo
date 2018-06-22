
const {ccclass, property} = cc._decorator;
interface lineVector{
    startVec:cc.Vec2,
    endVec:cc.Vec2,
    speedVec:cc.Vec2,
    sizeAccSpeed:number,
    sizeSpeed:number,
    length:number,
    accelSpeed:cc.Vec2,
    
}
import propTs from './prop';
import characterTs from './character';
@ccclass
export default class NewClass extends cc.Component {
    /**
     * sPoints 开始路径点
     */
    /**
     * ePoints 结束路径点
     */
    @property([cc.Vec2])
    sPoints:cc.Vec2[] = [];
    @property([cc.Vec2])
    ePoints:cc.Vec2[] = [];
    // @property(cc.Vec2)
    // leftRoadStartPos:cc.Vec2= null;
    // @property(cc.Vec2)
    // leftRoadEndPos:cc.Vec2 = null;
    // @property(cc.Vec2)
    // rightRoadStartPos:cc.Vec2 = null;
    // @property(cc.Vec2)
    // rightRoadEndPos:cc.Vec2 = null;
    @property(cc.Prefab)
    propPrefab:cc.Prefab = null;
    @property(cc.Node)
    characterNode:cc.Node = null;
    // @property(cc.Prefab)
    // roadPrefab:cc.Prefab = null;
    @property
    orignalSize:number = 0.2;
    /**
     * 完成路径所需要的时间
     * 根据时间来设定速度
     */
    @property
    times:number = 2;
    /**
     * 设置开始速度
     */
    @property
    startSpeed:number = 0.05;
    @property
    sizeSpeed:number =10;
    /**
     * 每次添加一个prop所需的时间
     */
    @property
    propNeedTimes:number = 0.05;
    @property
    _characterJs = null;
    @property
    _curTimes:number = 0;
    @property
    _isPause:boolean = true;
    @property([])
    /**
     * 道具在不同线上的数量
     */
    _propLines:any[] = [];
    @property([])
    _lineVector:lineVector[] = [];
    @property
    _propPools:cc.NodePool = null;
    @property
    _roadNodePools:cc.NodePool = null;
    @property
    _configShowIndex:number = 0;
    onLoad(){
      
    }
    init(_index:number){
        this._isPause = true;
        
        this._characterJs = this.characterNode.getComponent(characterTs);
        this._characterJs.init(_index,this);
        this.characterNode.setLocalZOrder(characterzIndex);
            /**
             * 初始化数据
             */
        for(let i = 0;i<this.sPoints.length;i++){
            var sPoint  =  this.sPoints[i];
            var ePoint = this.ePoints[i];
            var lVector =cc.pSub(ePoint,sPoint);
            var length = cc.pLength(lVector);
            var accelSpeed = (2*length-this.startSpeed*this.times)/Math.pow(this.times,2);         
            this._lineVector.push({
                    startVec:sPoint,
                    endVec:ePoint,
                    length:length,
                    speedVec:cc.pMult(cc.pNormalize(lVector),this.startSpeed),
                    accelSpeed:cc.pMult(cc.pNormalize(lVector),accelSpeed),
                    sizeAccSpeed:(2*(1-this.orignalSize)-this.sizeSpeed*this.times)/Math.pow(this.times,2),
                    sizeSpeed:this.sizeSpeed,
            });
                this._propLines.push([]);
            }
            if(!this._propPools){
                this._propPools = new cc.NodePool('prop_node_pool');
                this._roadNodePools = new cc.NodePool('road_node_pool');
                for(let i = 0;i<= 26;i++){
                    var newPropNode = cc.instantiate(this.propPrefab);
                    this._propPools.put(newPropNode);
                } 
            }
      
    };
    onDisable(){
        if(this._propLines.length>0&& this._propPools){
            for(let i=0;i<this._propLines.length;i++){
                var lineNodes = this._propLines[i];
                for(let j = 0;j<lineNodes.length;j++){
                    this._propPools.put(lineNodes[j]);
                }
                this._propLines[i] = [];
            }
        }
    }
    start () {
          
    };
    configurationProp(){
        function caculateIndex(index){
            if(index == 0){
                return 3;
            }
            if(index == 1){
                return 1;
            }
            if(index == 2){
                return 0;
            }
            if(index == 3){
                return 2;
            }
            if(index == 4){
                return 4;
            }
        }
        if(this._configShowIndex>=showContent.length){
              var length =this._propLines.length;
              //0，1为得分道具 ，2为掉分道具
              var randNum = Math.floor((Math.random()*3));
              if(randNum==0){
                this.addNewPropNode(Math.floor(Math.random()*length),Math.floor(Math.random()*4));   
              }else if(randNum == 1){
                this.addNewPropNode(Math.floor(Math.random()*length),Math.floor(Math.random()*(8-4)+4)); 
              }else if(randNum == 2){
                this.addNewPropNode(Math.floor(Math.random()*length),Math.floor(Math.random()*(propInfor.length-8)+8));
              }     
        }else{
          var curArr = showContent[showContent.length-this._configShowIndex-1];
          this._configShowIndex++
          for(let i = 0;i<curArr.length;i++){
              if(curArr[i] == 0){
                  
              }else{
                this.addNewPropNode(caculateIndex(i),curArr[i]-1);
              }
          }
        }
    }
    /**
     * 加入新道具node
     */
    addNewPropNode(curLineIndex:number,propIndex:number){
       var length = this._propLines.length;
       var index   = curLineIndex;
       var curLines = this._propLines[index];
       var newPropNode = null;
       if(this._propPools.size()>0){
        newPropNode = this._propPools.get();
       }else{
        newPropNode = cc.instantiate(this.propPrefab);
       }
       var propJS = newPropNode.getComponent(propTs);
       var lineVector = this._lineVector[index];
       this.node.addChild(newPropNode);
       propJS.init({
            index:propIndex,
            startPoint:lineVector.startVec.clone(),
            speedVec:lineVector.speedVec.clone(),
            accelSpeed:lineVector.accelSpeed.clone(),
            orignalSize:this.orignalSize,
            sizeAccSpeed:lineVector.sizeAccSpeed,
            sizeSpeed:lineVector.sizeSpeed
       },this);
      
       curLines.unshift(newPropNode);
       length  = curLines.length;
       /**
        * 设置节点深度
        */
       var depth = 50*(this._propLines.length-index);
       curLines.forEach((node,index) => {
           node.getComponent(propTs).setZindex(index+1+depth);
       });
    };
    /**
     * 计算所有线上的节点是否要被回收和是否发生碰撞
     */
    calculateAllNode(){
        for(let i = 0;i<this._propLines.length;i++){
            var curLines = this._propLines[i];
            var curLineEndPos = this._lineVector[i].endVec;
            var curLineLength = this._lineVector[i].length;
            for(let j = curLines.length-1;j>=0;j--){
                let node = curLines[j];
                let propJs = node.getComponent(propTs);
                let propLineLength  = propJs.getStartPosDistance();
                 var collisionIndex = this._characterJs.isCollision(propJs);
                if(propLineLength>=curLineLength){
                    curLines.splice(j,1);
                    j--;
                    this._propPools.put(node);
                }else if(collisionIndex == 0){
                    break;
                }else if(collisionIndex == 1){
                    curLines.splice(j,1);
                    j--;
                    this._propPools.put(node);
                }else if(collisionIndex == 2){
                    propJs.setIsExceedCharacter();
                }
            }
        }
    };
    getPauseStats(){
        return  this._isPause;
    };
    setPauseStats(isPause:boolean){
           this._isPause = isPause;
    };
    startGame(){
        this._isPause = false;
        this.characterNode.active = true;
    };
    update (dt) {
        if(this._isPause) return;
        if(this._curTimes == 0){
            this.configurationProp();
        }
        this._curTimes += dt;
        if(this._curTimes>=this.propNeedTimes){
            this._curTimes = 0;
        }
        this.calculateAllNode();
    };
}
