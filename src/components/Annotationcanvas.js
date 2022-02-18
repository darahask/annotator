import { useEffect, useRef } from "react";
import "../styles/popup.css";

const Annotationcanvas = () => {
    let ref = useRef();

    useEffect(() => {
        let canvas = ref.current;
        let ctx = canvas.getContext("2d");
        var shapes = [];
        var tempShape = {};
        var isDragging = false;

        canvas.style.border = "1px solid black";

        let image = new Image();
        image.src = "https://cdn.pixabay.com/photo/2021/08/18/18/17/office-6556228_1280.png";
        image.onload = () => {
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);
            shapes.push({
                img: image,
                type: "image",
            });
            drawAll();
        };

        function reOffset() {
            var BB = canvas.getBoundingClientRect();
            offsetX = BB.left;
            offsetY = BB.top;
        }
        var offsetX, offsetY;
        reOffset();
        window.onscroll = function (e) {
            reOffset();
        };
        window.onresize = function (e) {
            reOffset();
        };
        canvas.onresize = function (e) {
            reOffset();
        };

        canvas.onmousedown = handleMouseDown;
        canvas.onmousemove = handleMouseMove;
        canvas.onmouseup = handleMouseUp;
        canvas.onmouseout = handleMouseOut;

        function collides(rects, x, y) {
            var isCollision = false;
            for (var i = 0, len = shapes.length; i < len; i++) {
                if (shapes[i].type === "rectangle") {
                    var left = shapes[i].x,
                        right = shapes[i].x + shapes[i].width;
                    var top = shapes[i].y,
                        bottom = shapes[i].y + shapes[i].height;
                    if (right >= x && left <= x && bottom >= y && top <= y) {
                        isCollision = shapes[i];
                    }
                }
            }
            return isCollision;
        }

        canvas.addEventListener("click", (e) => {
            console.log("click: " + e.offsetX + "/" + e.offsetY);
            var rect = collides(shapes, e.offsetX, e.offsetY);
            if (rect) {
                launchPopup(rect, offsetX, offsetY);
            } else {
                console.log("no collision");
            }
        });

        function handleMouseDown(e) {
            e.preventDefault();
            e.stopPropagation();

            reOffset();
            tempShape.x = parseInt(e.clientX - offsetX);
            tempShape.y = parseInt(e.clientY - offsetY);
            tempShape.type = "rectangle";

            isDragging = true;
        }

        function handleMouseUp(e) {
            reOffset();
            // return if we're not dragging
            if (!isDragging) {
                return;
            }
            // tell the browser we're handling this event
            e.preventDefault();
            e.stopPropagation();
            // the drag is over -- clear the isDragging flag
            shapes.push(tempShape);
            tempShape = {};
            isDragging = false;
        }

        function handleMouseOut(e) {
            reOffset();
            // return if we're not dragging
            if (!isDragging) {
                return;
            }
            // tell the browser we're handling this event
            e.preventDefault();
            e.stopPropagation();
            // the drag is over -- clear the isDragging flag
            shapes.push(tempShape);
            tempShape = {};
            isDragging = false;
        }

        function handleMouseMove(e) {
            reOffset();
            if (!isDragging) {
                return;
            }

            e.preventDefault();
            e.stopPropagation();
            drawAll();

            let mouseX = parseInt(e.clientX - offsetX);
            let mouseY = parseInt(e.clientY - offsetY);

            var dx = mouseX - tempShape.x;
            var dy = mouseY - tempShape.y;

            ctx.strokeRect(tempShape.x, tempShape.y, dx, dy);
            tempShape.width = dx;
            tempShape.height = dy;
        }

        let popup = document.getElementById("pop");
        document.getElementById("pop-close").onclick = (e) => {
            e.preventDefault();
            popup.style.top = 0;
            popup.style.left = 0;
            popup.style.display = "none";
        };

        function launchPopup(shape, offx, offy) {
            popup.style.display = "block";
            popup.style.top = offy + shape.y + shape.height + "px";
            popup.style.left = offx + shape.x + shape.width + "px";
        }

        function drawAll() {
            let cw = canvas.width;
            let ch = canvas.height;
            ctx.clearRect(0, 0, cw, ch);
            for (var i = 0; i < shapes.length; i++) {
                var shape = shapes[i];
                if (shape.type === "image") {
                    ctx.drawImage(shape.img, 0, 0);
                } else {
                    ctx.lineWidth = 2;
                    ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
                }
            }
        }
    }, []);

    return (
        <>
            <div id="pop" className="canvas-popup">
                <input type="text"></input>
                <br></br>
                <input type="checkbox" id="pop-check"></input>
                <label htmlFor="pop-check">Mark as antipattern</label>
                <br></br>
                <button>Save </button>
                <button>Delete </button>
                <button id="pop-close">Close</button>
            </div>
            <div id="Div1" style={{ float: "left", width: "100%", height: "800px", overflow:"scroll"}}>
                {/* <canvas id="myCanvas1" width="200" style="border:1px solid #ff0000;">
                    asdf asd as asfqwe asd asdfasdf asd as asfqwe asd asdfasdf asd as asfqwe asd asdf
                </canvas> */}
            <canvas ref={ref} ></canvas>
            </div>
        </>
    );
};

export default Annotationcanvas;
