var cw = screen.width;
var ch = screen.height;
var colorPicker = document.querySelector(".color-input");
var thicknessPicker = document.querySelector(".stroke-width");
var capChanger = document.querySelector(".cap-changer");
var canvasCleaner = document.querySelector(".clear-canvas");
var writeType = document.querySelector(".pen-eraser");
var thickness = thicknessPicker.value;
function draw() {
    var canvas = document.getElementById("canv");
    canvas.setAttribute("width", cw);
    canvas.setAttribute("height", ch);
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        var isMouseDown = false;
        var mouseposx_ini = 0;
        var mouseposy_ini = 0;
        ctx.lineWidth = "20";
        ctx.lineCap = "round";
        ctx.strokeStyle = "#ffffff";
        colorPicker.addEventListener("change", function () {
            var color = colorPicker.value;
            ctx.strokeStyle = color;
        });

        capChanger.addEventListener("change", function () {
            ctx.lineCap = capChanger.value;
        });
        canvasCleaner.addEventListener("click", function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            grid();
        });
        canvas.onmousedown = function (e) {
            mouseposx_ini = e.clientX;
            mouseposy_ini = e.clientY;
            isMouseDown = true;
            //ctx.beginPath();
            //ctx.lineTo(mouseposx_ini,mouseposy_ini);
            //ctx.stroke();
        };
        canvas.onmouseup = function () {
            isMouseDown = false;
        };
        canvas.onmouseout = function () {
            isMouseDown = false;
        };
        canvas.onmousemove = function () {
            if (isMouseDown) {
                startWrite(event);
            }
        };

        function startWrite() {
            ctx.save();
            thicknessPicker.addEventListener("change", function () {
                ctx.lineCap = "round";
            });
            ctx.beginPath();
            if (isMouseDown) {
                if ((writeType.value = "eraser")) {
                    mouseposx = event.clientX;
                    mouseposy = event.clientY;
                    ctx.lineWidth = thickness;
                    ctx.beginPath();
                    ctx.moveTo(mouseposx_ini, mouseposy_ini);
                    ctx.lineTo(mouseposx, mouseposy);
                    mouseposx_ini = mouseposx;
                    mouseposy_ini = mouseposy;
                    ctx.stroke();
                } else {
                    mouseposx = event.clientX;
                    mouseposy = event.clientY;
                    ctx.lineWidth = thickness;
                    ctx.globalCompositeOperation = "destination-out";
                    ctx.arc(
                        mouseposx,
                        mouseposy,
                        thickness,
                        0,
                        Math.PI * 2,
                        true
                    );
                    mouseposx_ini = mouseposx;
                    mouseposy_ini = mouseposy;
                    ctx.fill();
                }
                //if (writeType.value = 'eraser') {
                //  ctx.clearRect(mouseposx - thickness/2, mouseposy- thickness/2, thickness, thickness);
                //}
            }
            console.log(writeType.value);
            ctx.restore();
        }

        grid();
        function grid() {
            ctx.save();
            for (var x = 0; x <= cw; x += 40) {
                //vertical line
                ctx.moveTo(x, 0);
                ctx.lineTo(x, ch);
                ctx.stroke();
                ctx.strokeStyle = "rgba(255,255,255,0.2)";
                ctx.lineWidth = 0.1;
            }
            for (var y = 0; y <= ch; y += 40) {
                // hori line
                ctx.moveTo(0, y);
                ctx.lineTo(cw, y);
                ctx.stroke();
            }
            ctx.restore();
        }
    }
}
