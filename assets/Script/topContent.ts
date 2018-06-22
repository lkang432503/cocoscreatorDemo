import resultLayerTs from './resultLayer';
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    scoreLabel: cc.Label = null;
    @property(cc.Label)
    countDownLabel:cc.Label = null;
    @property(cc.Label)
    teamLabel:cc.Label = null;
    @property
    _score:number = 0;
    @property
    _cdTime:number = 60;
    @property
    _isEnd:boolean = true;
    @property
    _gameControl:any = null;

    // LIFE-CYCLE CALLBACKS:
    onLoad () {

    };
    init(team:number,gameControl:any){
        this._score = 0;
        this.scoreLabel.string = '分数:'+this._score.toString();
        this.countDownLabel.string = '倒计时：';
        this.teamLabel.string = teamIndex[team]+'队';
        this._gameControl = gameControl;
        this._isEnd = false;
    };
    setcdTime(times:string){
        this._cdTime = parseInt(times);
        this.countDownLabel.string = '倒计时：'+times.toString();
    }
    addScore(score:number){
        this._score += score;
        this.scoreLabel.string =  '分数:'+this._score.toString();
    };
    getScore(){
        return this._score;
    }
    setCountDownLabelString(){
        let cdnum = Math.floor(this._cdTime);
        if(cdnum <10){
            var cdnumStr = '0'+cdnum.toString();
        }else{
            var cdnumStr = cdnum.toString();
        }
        this.countDownLabel.string = '倒计时：'+cdnumStr;
    }
    start () {

    };
    update (dt) {
        if(this._isEnd||this._gameControl.getPauseStats()){
            return;
        }
       
        if(this._cdTime<=0){
            this._cdTime = 0;
            this._isEnd = true;
            this._gameControl.setPauseStats(true);
            this.node.parent.active = false;
            var resultLayer = cc.find('Canvas/resultLayer');
            resultLayer.active = true;
           //cc.find('Canvas/resultLayer').active = true;
          //demo修改测试
           resultLayer.getComponent(resultLayerTs).init( {
            userName:'TEST',
           selfScore:this._score,
           owerScore:this._score,
           rankIndex:1,
           teamIndex:1,
           userPhone:'test',
           userRank:1,

       });
            return;
        }
        this.setCountDownLabelString();
        this._cdTime -= dt;
    };
}
