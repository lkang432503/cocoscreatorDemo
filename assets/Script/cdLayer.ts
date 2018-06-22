
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Sprite)
    cdSprite:cc.Sprite = null;
    @property([cc.SpriteFrame])
    spriteFrams:cc.SpriteFrame[] = [];
    @property
    _index:number = 0;
    @property
    _gameLayer:any = null;
    onLoad () {
    //  this.init(0);
    };
    init(num:number){
        if(!this.cdSprite.node){
            this.cdSprite.node.active = true;
        }
        var index = 0;
        if(num == 3){
            index = 0;
        }else if(num==2){
            index = 1;
        }else if(num == 1){
            index = 2;
        }
        this.cdSprite.spriteFrame = this.spriteFrams[index];
    };
    updateSpriteFrame(){
        this._index++;
        if(this._index>= this.spriteFrams.length){
            this.unschedule(this.updateSpriteFrame);
            this.hideNodeStartGame();
            return;
        }else{
            this.cdSprite.spriteFrame = this.spriteFrams[this._index];
        }
    }
    /*倒计时结束逻辑 */
    hideNodeStartGame(){
        this._gameLayer.countDown321End();
    }
    start () {

    };
    update (dt) {

    };
}
