var cw = screen.width;
var ch = screen.height;
function draw() {
    var cand = document.getElementById('canv');
    cand.setAttribute("width", cw);
    cand.setAttribute("height", ch);

    var canvas = document.getElementById('canv');
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');

      for (var x = 0; x <= cw; x+=40) { //vertical line
        ctx.moveTo(x,0);
        ctx.lineTo(x,ch);
        ctx.stroke();
        ctx.strokeStyle = 'rgba(53, 53, 53,0.1)';
        ctx.lineWidth = 0.1;
      }
      for (var y = 0; y <= ch; y+=40) { // hori line
        ctx.moveTo(0,y);
        ctx.lineTo(cw,y);
        ctx.stroke()
      }
    }
  }
