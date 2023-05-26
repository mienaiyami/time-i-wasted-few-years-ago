var myFood = []
$(document).ready(function(){
    myGamePlayer = new component(20,20,40,40,"red","player");
    myScore = new component(20, 20,"Score: ","20px Arial","black","text");
    myGameArea.start();
    infoP = document.createElement("p");
    infoP.className = "infoP"
    document.body.appendChild(infoP)
})
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function(){
        this.canvas.width = 500;
        this.canvas.height = 500;
        this.context = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
        this.frameNu = 1;
        this.interval = setInterval(updateGameArea,17);
        $(window).keydown(function(e){
            myGameArea.keys = (myGameArea.keys || [])
            myGameArea.keys[e.keyCode] = (e.type == 'keydown')
        })
        $(window).keyup(function(e){
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
    },
    clear : function(){
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
        
    },
    stop : function(){
        clearInterval(this.interval);
    }

}

function component(x,y,w,h,color,type){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.type = type;
    this.speedX = 0;
    this.speedY = 0;
    this.display = true;
    this.initial = this.w
    this.update = function(){
        context = myGameArea.context;
        if(this.display == true){
            if (type == 'player'){
                context.save();
                context.fillStyle = this.color;
                context.fillRect(this.x,this.y,this.w,this.h)
                context.restore();
            } 
            if (type == 'food'){
                context.fillRect(this.x,this.y,this.w,this.h)
            }
            if (type == 'text'){;
                context.fillStyle = this.color;
                context.font = this.h;
                context.fillText(this.w,this.x,this.y);
            }
        }
    }
    this.newPos = function(){
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x >= myGameArea.canvas.width-this.w){this.x = myGameArea.canvas.width-this.w};
        if (this.y >= myGameArea.canvas.height-this.h){this.y = myGameArea.canvas.height-this.h};
        if (this.x <= 0){this.x = 0};
        if (this.y <= 0){this.y = 0};
        
        infoP.innerHTML = "player location x: "+this.x+" y : "+ this.y+ "<br> speed x: " + myGamePlayer.speedX+" speed y: " +myGamePlayer.speedY + "<br>frame number : <p class='lolp'></p>";
    }
    this.onCollision = function(obj){
        var top = this.y;
        var bottom = this.y + this.h;
        var left = this.x;
        var right = this.x + this.w   
        var objTop = obj.y;
        var objBottom = obj.y + obj.h;
        var objLeft = obj.x;
        var objRight = obj.x + obj.w;
        crash = true;
        if ((bottom < objTop) || (top > objBottom) || (right < objLeft) || (left > objRight)) {
            crash = false;
        }
        return crash;
    }
    
}
function updateGameArea(){
    for (let i = 0; i < myFood.length; i++) {
        // myScore.w = 0;
        if(myGamePlayer.onCollision(myFood[i])){
            myFood[i].display = false
            console.log('loll ')
        }
    }
    scoreCount = 0
    for (let i = 0; i < myFood.length; i++) {
        if(myFood[i].display == false){
            scoreCount++
        }
    myScore.w = myScore.initial + scoreCount    
    }
    myGameArea.clear();
    if(myGameArea.frameNu == 1 || everyTime(60)){
        console.log('lol')
        width = 30;
        maxX = myGameArea.canvas.width - width;
        maxY = myGameArea.canvas.height - width;
        posx = Math.floor(Math.random() * maxX);
        posy = Math.floor(Math.random() * maxY);
        myFood.push(new component(posx,posy,width,width,'yellow','food'))
    }
    for (let i = 0; i < myFood.length; i++) {
        myFood[i].update()
    }
    myGamePlayer.speedX = 0;
    myGamePlayer.speedY = 0;
    speedConst = 5
    playerCtrl();
    function playerCtrl(){
        if (myGameArea.keys && myGameArea.keys[65]) {myGamePlayer.speedX = -speedConst;}
        if (myGameArea.keys && myGameArea.keys[68]) {myGamePlayer.speedX = speedConst; }
        if (myGameArea.keys && myGameArea.keys[87]) {myGamePlayer.speedY = -speedConst; }
        if (myGameArea.keys && myGameArea.keys[83]) {myGamePlayer.speedY = speedConst; }
        if (myGameArea.keys && myGameArea.keys[80]) {myGameArea.stop() } //p
        if (myGameArea.keys && myGameArea.keys[79]) {myGameArea.start() } //o doesnt work properly
    }
    myGamePlayer.newPos()
    $(".lolp").html(myGameArea.frameNu)
    myGamePlayer.update();
    myScore.update();
    myGameArea.frameNu++;

}
function everyTime(n){
    if((myGameArea.frameNu / n) % 1 == 0){return true;}
}