const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Color)
    outLineColor:cc.Color = null;
    @property
    outLineWidth:number = 4;

    onLoad() {
        // init logic
        var outline = this.node.addComponent(cc.LabelOutline);
        outline.color = this.outLineColor;
        outline.width = this.outLineWidth;
    }
}
