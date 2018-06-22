
const {ccclass, property} = cc._decorator;
interface configInfor{
    userName:string,
    selfScore:number,
    owerScore:number,
    teamIndex:number,
    rankIndex:number,
    userPhone:any,
    userRank:any
}
@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Node)
    resultNode:cc.Node = null;
    @property(cc.Node)
    waitingNode:cc.Node = null;
    @property(cc.Label)
    teamLabel:cc.Label = null;
    @property(cc.Label)
    userNameLabel:cc.Label = null;
    @property(cc.Label)
    selfScoreLabel:cc.Label = null;
    @property(cc.Label)
    owerScoreLabel:cc.Label = null;
    @property(cc.Sprite)
    teamCharacterSprite:cc.Sprite = null;
    @property(cc.Sprite)
    teamIconSprite:cc.Sprite = null;
    @property(cc.Sprite)
    rankIconSprite:cc.Sprite = null;
    @property(cc.Label)
    rankLabel:cc.Label = null; 
    @property([cc.SpriteFrame])
    characterSpriteFrams:cc.SpriteFrame[] = [];
    @property([cc.SpriteFrame])
    teamSpriteFrams:cc.SpriteFrame[] = [];
    @property([cc.SpriteFrame])
    rankSpriteFrams:cc.SpriteFrame[] = [];
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // this.init({
        //     selfScore:40,
        //     owerScore:50,
        //     teamIndex:1,
        //     rankIndex:3
        // });
    };
    init(config:configInfor){
        this.node.active = true;
        this.resultNode.active  = true;
        this.waitingNode.active = false;
        this.userNameLabel.string= config.userPhone;
        this.teamLabel.string = teamIndex[config.teamIndex]+'队战绩';
        this.selfScoreLabel.string = '分数：'+config.selfScore;
        this.owerScoreLabel.string = '分数：'+config.owerScore;
        this.teamCharacterSprite.spriteFrame = this.characterSpriteFrams[config.teamIndex];
        this.teamIconSprite.spriteFrame = this.teamSpriteFrams[config.teamIndex];
        this.rankIconSprite.spriteFrame = this.rankSpriteFrams[config.rankIndex];
        if(config.userRank == 0){
            this.rankLabel.node.active = false;
        }else{
            this.rankLabel.node.active = true;
            if(config.userRank == 1){
                this.rankLabel.string = '恭喜您获得个人第一名';
            }else if(config.userRank == 2){
                this.rankLabel.string = '恭喜您获得个人第二名';
            }else if(config.userRank == 3){
                this.rankLabel.string = '恭喜您获得个人第三名';
            }
        }
    }
    
    start () {

    };

    // update (dt) {},
}
