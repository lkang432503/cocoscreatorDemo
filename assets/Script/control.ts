
const {ccclass, property} = cc._decorator;
import gameLayerTs from './gameLayer'
import resultLayerTs from './resultLayer'
import animateBGTs from './gameBgAnimate'
@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Node)
    readyLayer:cc.Node = null;
    @property(cc.Node)
    gameLayer:cc.Node = null;
    @property(cc.Node)
    resultGameLayer:cc.Node = null;
    @property(cc.Node)
    bgAnimateNode:cc.Node = null;
    @property(cc.Label)
    titleLabel:cc.Label = null;
    // @property
    // isbgMusicPlay:boolean = true;
    @property
    _gameLayerJs:any = null;
    @property
    _teamIndex:number = 0;
    @property
    _userName:string = null;
    @property
    _isCloseSocket:boolean = false;
    @property
    _isGameStart:boolean = false;
    // @property
    // _$bgMusic:any = null;
    // @property(cc.Node)
    // bgMusicBtnNode:cc.Node = null;
    // @property([cc.SpriteFrame])
    // bgMusicSpriteFrams:cc.SpriteFrame[] = [];
    onLoad () {
         this.getTitle();
         this._isCloseSocket = false;
         this._gameLayerJs = this.gameLayer.getComponent(gameLayerTs);
         this.getUserData();
         this.bgAnimateNode.getComponent(animateBGTs).init();
         if(gameControl){
             this.demoInit();
         }else{
            gameControl = this;
         }
         
        //  this.demoInit();
         /*---去掉socket设置---*/

         //this.webSocketconnect();
         //

        //  this.initMusic();
    };
   demoInit(){
        // let self = this;
        setTimeout(()=>{
            this._isGameStart = true;
            // hideRulePage();
            this.hideAll();
            var INDEX = 3;
            this._gameLayerJs.init(INDEX);
            var interval = setInterval(()=>{
                if(INDEX<=1){
                    clearInterval(interval);
                    this._isGameStart = true;
                    // hideRulePage();
                    this.hideAll();
                    this._gameLayerJs.countDown321End(80);
                    this.bgAnimateNode.getComponent(animateBGTs).gameStart();
                    return;
                }
                INDEX--;
                this._gameLayerJs.init(INDEX);
            },1000);
        },1000);
      
   }
    start () {

    };
    // initMusic(){
    //     var self = this;
    //     document.addEventListener('WeixinJSBridgeReady', function () {
    //         self._$bgMusic = document.createElement('audio');
    //         self._$bgMusic.loop = true;
    //         self._$bgMusic.src = 'Public/Home/weChatGame/bgMusic.wav';
    //         self._$bgMusic.play();
    //         if(!self.isbgMusicPlay){
    //             self._$bgMusic.pause();
    //         }  
    //     });
    //     this.bgMusicBtnNode.on(cc.Node.EventType.TOUCH_END,this.toggleMusic,this);
    // }
    // toggleMusic(){
    //     console.log(this);
    //     if(!this._$bgMusic){
    //         return;
    //     }
    //     if(this.isbgMusicPlay){
    //         this._$bgMusic.pause();
    //     }else{
    //         this._$bgMusic.play();
    //     }
    //     this.isbgMusicPlay = !this.isbgMusicPlay;
    //     if(this.isbgMusicPlay){
    //        this.bgMusicBtnNode.getComponent(cc.Sprite).spriteFrame = this.bgMusicSpriteFrams[0];
    //     }else{
    //        this.bgMusicBtnNode.getComponent(cc.Sprite).spriteFrame = this.bgMusicSpriteFrams[1];
    //     }
    // }
    getTitle(){
        // var self = this;
        // ajax({
        //     url: HttpUrl + '/',
        //     type: "GET",
        //     data: {},
        //     dataType: "json",
        //     success: function (response, xml) {
        //         var response = JSON.parse(response);
        //         self.titleLabel.string = response[0];
        //     },
        //     fail:function(){
        //         self.getTitle();
        //     }
        // });
    };
    getUserData(){
        var self = this;
        // ajax({
        //     url: HttpUrl + '/',
        //     type: "POST",
        //     data: {},
        //     dataType: "json",
        //     success: function (response, xml) {
        //         var data = JSON.parse(response);
        //         if(data.scode){
        //             var _teamIndex = 0;
        //             for(let i = 0;i<teamIndex.length;i++){
        //                 if(teamIndex[i] == data.sdata.user_team){
        //                     _teamIndex = i;
        //                 }
        //             }
        //             self._teamIndex = _teamIndex;
        //             self._userName = data.sdata.user_name;
        //             self._gameLayerJs.setTeam(self._teamIndex);
        //         }else{
        //             alert('无法获取用户信息！');
        //         }
              
        //     },
        //     fail:function(){
        //         self.getUserData();
        //     }
        // });
        self._teamIndex = Math.floor(Math.random()*4);
        self._userName = '测试...';
        self._gameLayerJs.setTeam(self._teamIndex);
    };
    getResultData(level){
        // this._isCloseSocket = true;
        // var self = this;
        // ajax({
        //     url: HttpUrl + '',
        //     type: "POST",
        //     data: {gnamelevel:level},
        //     dataType: "json",
        //     success: function (response, xml) {
        //         var data = JSON.parse(response);
        //         if(data.scode){
        //             self.resultGameLayer.getComponent(resultLayerTs).init(
        //                 {
        //                     userName:self._userName,
        //                     selfScore:data.user_point,
        //                     owerScore:data.team_point,
        //                     rankIndex:data.team_rank,
        //                     teamIndex:self._teamIndex,
        //                     userPhone:data.user_phone,
        //                     userRank:data.user_rank,

        //                 }
        //             );
        //         }else{
        //             self.getResultData(level);
        //         }
              
        //     },
        //     fail:function(){
        //         self.getResultData(level);
        //     }
        // });
    }
    hideAll(){
        if(this.readyLayer.active){
            this.readyLayer.active = false;
        }
        if(this.gameLayer.active){
            this.gameLayer.active = false;
        }
        if(this.gameLayer.active){
            this.resultGameLayer.active = false;
        }
        
    }
    webSocketconnect() {
        var socket_interval = null;
        var socket = null;
        var self = this;
        // _webSocketConnect();
        function _webSocketConnect() {
            if (socket_interval) {
                clearInterval(socket_interval);
                socket_interval = null;
            }
            socket = new WebSocket(SocketUrl);
            socket.onopen = function (event) {
                socket.send(JSON.stringify({
                    type: 'uJoinroom',
                }));
            };
            socket.onmessage = function (event) {
                var _data = JSON.parse(event.data);
                if(self._isCloseSocket) return ;
                console.log(event.data);
                switch (_data.type) {
                    case 'ping':
                        socket.send(JSON.stringify({
                            type: 'pong'
                        }));
                        break;
                    case 'gameCountdown':
                         self._isGameStart = true;
                         hideRulePage();
                         self.hideAll();
                         self._gameLayerJs.init(_data.times);
                        break;    
                    case 'gameStart':
                          self._isGameStart = true;
                          hideRulePage();
                          self.hideAll();
                          self._gameLayerJs.countDown321End(_data.times);
                          self.bgAnimateNode.getComponent(animateBGTs).gameStart();
                        break;
                    case 'gameEnd':
                          if(!self._isGameStart) return;
                          hideRulePage();
                          self.hideAll();
                          self.resultGameLayer.active = true;
                          self.bgAnimateNode.getComponent(animateBGTs).gameOver();
                          self.getResultData(_data.level);
                        break;
                }
            };
            socket.onerror = function (event) {
                socket.close();
            };
            socket.onclose = function (event) {
                if (socket_interval) {
                    clearInterval(socket_interval);
                    socket_interval = null;
                }
                socket_interval = setInterval(function () {
                    _webSocketConnect();
                }, 1500);
            };
        }
    }
    update (dt) {

    };
}
