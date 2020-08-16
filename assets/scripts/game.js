// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        cheerPrefab:{
            default:null ,
            type:cc.Prefab
        },
        ground:{
            default: null,
            type:cc.Node
        },
        reloadItem:{
            default:null,
            type:cc.Node
        },
        beforeItem:{
            default:null,
            type:cc.Node
        },
           // 跳跃音效资源
        jumpAudio: {
            default: null,
            type: cc.AudioClip
        },
        successFul: {
            default: null,
            type: cc.AudioClip
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.groudY=this.ground.y+this.ground.height/2;
        this.spawnNewCheer();
        this.firstStart = true;
        this.roadMap=[]
        this.hideMap=[]
        this.roadMap.push([2,9]);
        this.hideMap.push([1,5]);
        this.roadMap.push([3,10]);
        this.hideMap.push([2,6]);
        this.roadMap.push([0,4,9,11]);
        this.hideMap.push([1,3,6,7]);
        this.roadMap.push([1,10]);
        this.hideMap.push([2,7]);
        this.roadMap.push([2,11]);
        this.hideMap.push([3,8]);

        this.roadMap.push([7,12]);
        this.hideMap.push([6,9]);
        this.roadMap.push([8,13]);
        this.hideMap.push([7,10]);
        this.roadMap.push([5,12]);
        this.hideMap.push([6,10]);
        this.roadMap.push([6,13]);
        this.hideMap.push([7,11]);
    
        this.roadMap.push([0,14,11,2])
        this.hideMap.push([5,12,10,6]);

        this.roadMap.push([1,3]);
        this.hideMap.push([6,7]);

        this.roadMap.push([2,4,9,14]);
        this.hideMap.push([7,8,10,13]);

        this.roadMap.push([5,7]);
        this.hideMap.push([9,10]);

        this.roadMap.push([6,8]);
        this.hideMap.push([10,11]);

        this.roadMap.push([9,11]);
        this.hideMap.push([12,13]);
    },

    spawnNewCheer:function(){
        this.cheers_x=[]
        this.cheers_y=[]
        var j=0
        var cheerCache=[];
        for(var line=0;line<5;line++){
            for (var col=0;col<5-line;col++){
                var itemCheer=cc.instantiate(this.cheerPrefab);
                this.node.addChild(itemCheer);
                itemCheer.setPosition(cc.v2(-150+col*70+35*line,-200+line*60))
                itemCheer.getComponent('cheer').game=this;
                itemCheer.getComponent('cheer').b_index=j++;
                this.cheers_x.push(-150+col*70+35*line);
                this.cheers_y.push(-200+line*60);
                cheerCache.push(true);
            }
        }
        this.cheerCaches=[];
        this.cheerCaches.push(cheerCache);
    },

    saveCheerCache:function(){
        var nodeInfos = this.node.getChildren();
        var cheerCache=[];
        for (var i in nodeInfos){
            cheerCache.push(nodeInfos[i].getComponent('cheer').b_show);
        }
        this.cheerCaches.push(cheerCache);
    },

    reloadCheer:function(){
        cc.director.loadScene("puzzle001");
    },
    playJumpSound:function(){
         // 调用声音引擎播放声音
         cc.audioEngine.playEffect(this.jumpAudio, false);
    },
    loadBeforeStep:function(){
       var cheerCache =  this.cheerCaches.pop();
       var nodeInfos = this.node.getChildren();
       var isFirst = true;
       for (var i in nodeInfos){
            var it= cheerCache[i];
            if(it){
                nodeInfos[i].getComponent('cheer').showCheer();
            }else{
                nodeInfos[i].getComponent('cheer').hideCheer();
            }
            isFirst=isFirst&&cheerCache[i];
        }
        if(isFirst){
            this.firstStart=true;
        }
    },

    displayActivate:function(b_index,worldPoint){
        var x= worldPoint.x;
        var y= worldPoint.y;
        console.log("开始消失棋子 x="+x+" y="+y)
        // this.node.getChildren()[b_index].active=false
        var mroadMap = this.roadMap[b_index];
        var displayActivate= false;
        for (var i in mroadMap){
           var c_x=this.cheers_x[mroadMap[i]];
           var c_y=this.cheers_y[mroadMap[i]];
            if(((c_x-x)<70)&&((c_x-x)>-70)){
                if(((c_y-y)<80)&&((c_y-y)>-80)){
                    var isShow = this.node.getChildren()[mroadMap[i]].getComponent('cheer').b_show;
                    if(!isShow){
                        var pathShow = this.node.getChildren()[this.hideMap[b_index][i]].getComponent('cheer').b_show;
                        if(pathShow){
                            this.saveCheerCache();
                            this.node.getChildren()[b_index].getComponent('cheer').hideCheer();
                            this.node.getChildren()[mroadMap[i]].getComponent('cheer').showCheer();
                            this.node.getChildren()[this.hideMap[b_index][i]].getComponent('cheer').hideCheer();
                            // this.playJumpSound();
                            displayActivate=true;
                            break;
                        }
                    }
                   
                }
            }
        }
        return displayActivate;
    },
    moveCheer:function(b_index,worldPoint){
        var worldPoint=this.node.convertToNodeSpaceAR(worldPoint)
        if(this.firstStart){
            this.saveCheerCache();
            this.firstStart=false;
            this.node.getChildren()[b_index].getComponent("cheer").hideCheer();
        }
        var displayActivate=this.displayActivate(b_index,worldPoint)
    },
    checkCheer:function(b_index,worldPoint){
        console.log(worldPoint.x)
        var displayActivate=this.displayActivate(b_index,worldPoint)
        if(!displayActivate){
            this.node.getChildren()[b_index].setPosition(cc.v2(this.cheers_x[b_index],this.cheers_y[b_index]))
        }
    },

    toLeaveGame:function(){
        cc.director.end()
    },
    start () {

    },

    // update (dt) {},
});
