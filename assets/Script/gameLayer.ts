
const {ccclass, property} = cc._decorator;
import topcTs from './topContent';
import cdTs from './cdLayer';
import gameCoreTs from './core_move';
interface configInfor{
    teamIndex:number,
    countDownTimes:number,
}

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Node)
    gameCoreNode:cc.Node = null;
    @property(cc.Node)
    topNarNode:cc.Node = null;
    @property(cc.Node)
    cdLayer:cc.Node = null;
    @property
    _topcJs:any = null;
    @property
    _cdJs:any = null;
    @property
    _gameCoreJs:any = null;
    @property
    _score:number = 0;
    init(num){
        this.setJsContent();
        this._cdJs.init(num);
        this.node.active = true;
    };
    setJsContent(){
        if(!this._topcJs){
            this._topcJs = this.topNarNode.getComponent(topcTs);
            this._cdJs = this.cdLayer.getComponent(cdTs);
            this._gameCoreJs = this.gameCoreNode.getComponent(gameCoreTs);
        }
    }
    setTeam(_teamIndex:number){
        this.setJsContent();
        this._gameCoreJs.init(_teamIndex);
        this._topcJs.init(_teamIndex,this._gameCoreJs);
    }
    countDown321End(times:string){
         this.node.active = true;
         this._topcJs.setcdTime(times);
         this._gameCoreJs.startGame();
         this.cdLayer.active = false;
         this.schedule(this.scoreHttpAjax,1);
    };
    onDisable(){
        this.scoreHttpAjax();
        this.unschedule(this.scoreHttpAjax);
    }
    scoreHttpAjax(){
        var curScore = this.getScore();
        if(this._score != curScore){
            this._score = curScore;
            /**
             * ajax分数发送
             */
            // var self = this;
            // ajax({
            //     url: HttpUrl + '',
            //     type: "POST",
            //     data: {point:self._score},
            //     dataType: "json",
            //     success: function (response, xml) {
            //     },
            //     fail:function(){
            //     }
            // });
        }
    };
    getScore(){
        return this._topcJs.getScore();
    };
    onLoad () {
      
    };

    start () {

    };

    // update (dt) {},
}
