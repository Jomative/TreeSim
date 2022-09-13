/**@type {HTMLCanvasElement} */
const can = document.getElementById("can");
can.width *= 2;
can.height *= 2;
const ctx = can.getContext("2d");
const nob = new NobsinCtx(ctx);

const brown = convert("brown");

class Branch{
    constructor(w,l){
        this.w = w;
        this.l = l;
        let times = 6;
        while(w > 1){
            times--;
            w *= 0.95;
            l *= 0.96;
            let maxAng = Math.PI/8;
            this.ang.push((Math.random()-0.5)*maxAng);
        }
    }
    w;
    l;
    /**@type {Number[]}] */
    ang = [];
    /**@type {Branch[]} */
    branches = [];
    render(x,y,ang){
        let l = this.l;
        let w = this.w;
        for(let i = 0; i < this.ang.length; i++){
            w *= 0.95;
            l *= 0.96;
            ang += this.ang[i];
            let tx = Math.sin(ang)*l+x;
            let ty = -Math.cos(ang)*l+y;
            nob.drawLine_smart_dep(x,y,tx,ty,brown,w,1);
            x = tx;
            y = ty;
        }
    }
}

class Tree{
    constructor(x,y,w,l){
        this.x = x;
        this.y = y;
        this.main = new Branch(w,l);
    }
    x = 0;
    y = 0;
    /**@type {Branch} */
    main;
    render(){
        this.main.render(this.x,this.y,0);
    }
}

let tree = new Tree(nob.centerX,nob.height-20,10,14);

function update(){
    requestAnimationFrame(update);
    nob.pixelCount = 0;
    nob.buf = new Uint8ClampedArray(nob.size);
    nob.dep = new Uint8ClampedArray(nob.ssize);

    tree.render();

    ctx.putImageData(new ImageData(nob.buf,nob.width,nob.height),0,0);
}
update();
document.addEventListener("keydown", e=>{
    if(e.key.toLowerCase()=="r")location.reload();
});