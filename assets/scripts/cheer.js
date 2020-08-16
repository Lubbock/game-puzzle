// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

var cheer=cc.Class({
    extends: cc.Component,

    properties: {
        b_index:0,
        b_show:true,
        game:null
    },



    setJumpAction:function(){
        var jumpUp=cc.moveBy(1,cc.v2(0,50)).easing(cc.easeCubicActionOut());
        var jumpDown = cc.moveBy(1, cc.v2(0, -50)).easing(cc.easeCubicActionIn());
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown));
    },

    registerEvent(){
        // this.node.on('touchstart',this.onEventStart,this)
         //touchmove 可以换成cc.Node.EventType.TOUCH_MOVE
         this.node.on('touchmove', this.onEventMove, this);
         //touchcancel 可以换成cc.Node.EventType.TOUCH_CANCEL
        //  this.node.on('touchcancel', this.onEventCancel, this);
         //touchend 可以换成cc.Node.EventType.TOUCH_END
        //  this.node.on('touchend', this.onEventEnd, this);
        // this.node.on('mousedown',this.onMouseDown,this)
        // this.node.on('mouseup',this.onMouseUp,this)
    },

    hideCheer:function(){
        this.b_show=false;
        this.node.opacity=100;
        this.node.scale=0.7;
    },

    showCheer:function(){
        this.b_show=true;
        this.node.opacity=255;
        this.node.scale=1;
    },

    onMouseDown(event){
    //世界坐标
        let worldPoint = event.getLocation();
        this.game.moveCheer(this.b_index,worldPoint)
        console.log('start Event \n worldPoint=', this.b_index);
    },
    onMouseUp(event){
         //世界坐标
         let worldPoint = event.getLocation();
         this.game.moveCheer(this.b_index,worldPoint)
         console.log('start Event \n worldPoint=', this.b_index);
    },
    /**
     * 触摸开始
     * @param {*} event 
     */
    onEventStart(event) {
        //世界坐标
        let worldPoint = event.getLocation();
        console.log('start Event \n worldPoint=', this.b_index);
 
    },
 
    /**
     * 触摸移动
     * @param {*} event 
     */
    onEventMove(event) {
        //世界坐标
        let worldPoint = event.getLocation();
        this.game.moveCheer(this.b_index,worldPoint)
        console.log('move Move \n worldPoint=', worldPoint);
    },
 
    /**
     * 触摸
     * 当手指在目标节点区域外离开屏幕时
     * 比如说，触摸node的size是200x200。
     * 当超过这个区域时，就是触发这个事件
     * @param {*} event 
     */
    onEventCancel(event) {
        //世界坐标
        let worldPoint = event.getLocation();
        this.game.checkCheer(this.b_index,worldPoint)
        console.log('cancel Event \n worldPoint=', worldPoint);
    },
 
    /**
     * 当手指在目标节点区域内离开屏幕时
     * @param {*} event 
     */
    onEventEnd(event) {
        //世界坐标
        let worldPoint = event.getLocation();
        this.game.displayActivate(this.b_index,worldPoint)
        console.log('end Event \n worldPoint=', worldPoint);
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // this.jumpAction = this.setJumpAction();
        // this.node.runAction(this.jumpAction);
        this.registerEvent();
    },

    start () {
       
    },

    // update (dt) {},
});
