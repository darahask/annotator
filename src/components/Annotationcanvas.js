import { useEffect, useRef } from "react";
import "../styles/popup.css";

const Annotationcanvas = ({data}) => {
    let ref = useRef();
    let { annotations, setAnnotations } = data;

    useEffect(() => {
        

        let canvas = ref.current;
        let ctx = canvas.getContext("2d");
        var shapes = annotations;
        var tempShape = {};
        var isDragging = false;

        let image = new Image();
        image.src =
            "https://res.cloudinary.com/practicaldev/image/fetch/s--_7arERV2--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/ikkj6js77uyo7m0rd1ud.jpeg";
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

        canvas.onmousedown = handleMouseDown;
        canvas.onmousemove = handleMouseMove;
        canvas.onmouseup = handleMouseUp;
        canvas.onmouseout = handleMouseOut;

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

        function collides(x, y) {
            var isCollision = false;
            for (var i = 0, len = shapes.length; i < len; i++) {
                if (shapes[i].type === "rectangle") {
                    var left = shapes[i].x,
                        right = shapes[i].x + shapes[i].width;
                    var top = shapes[i].y,
                        bottom = shapes[i].y + shapes[i].height;
                    if (right >= x && left <= x && bottom >= y && top <= y) {
                        isCollision = i;
                    }
                }
            }
            return isCollision;
        }

        canvas.addEventListener("click", (e) => {
            console.log("click: " + e.offsetX + "/" + e.offsetY);
            var rect = collides(e.offsetX, e.offsetY);
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
            if(tempShape.width || tempShape.height)shapes.push(tempShape);
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
            if(tempShape.width || tempShape.height)shapes.push(tempShape);
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

        //pop up handlers
        let selectedRectangle;
        let popup = document.getElementById("pop");
        let popname = document.getElementById("pop-name");
        let popcheck = document.getElementById("pop-check");

        popname.onchange = (e) => {
            e.preventDefault();
            shapes[selectedRectangle].name = e.target.value;
        };

        popcheck.onclick = (e) => {
            shapes[selectedRectangle].isAntiPattern = e.target.checked;
        };

        document.getElementById("pop-save").onclick = (e) => {
            e.preventDefault();
            let lannotations = shapes.filter((shape) => {
                return (shape.type === "rectangle")? true : false;
            });
            setAnnotations(lannotations);
            popup.style.display = "none";
        };

        document.getElementById("pop-delete").onclick = (e) => {
            e.preventDefault();
            shapes.splice(selectedRectangle, 1);
            drawAll();
            let lannotations = shapes.filter((shape) => {
                return (shape.type === "rectangle")? true : false;
            });
            setAnnotations(lannotations);
            popup.style.display = "none";
        };

        document.getElementById("pop-close").onclick = (e) => {
            e.preventDefault();
            popup.style.top = 0;
            popup.style.left = 0;
            popup.style.display = "none";
        };

        function launchPopup(i, offx, offy) {
            selectedRectangle = i;
            let shape = shapes[i];
            popup.style.display = "block";
            popup.style.top = offy + shape.y + shape.height + "px";
            popup.style.left = offx + shape.x + shape.width + "px";
            console.log(shapes.name,shape.isAntiPattern)
            popname.value = shape.name ?? "";
            popcheck.checked = shape.isAntiPattern ?? false
        }
    }, [props.document]);

    return (
        <div>
            <div id="pop" className="canvas-popup">
                <div className="mb-3">
                    <label htmlFor="pop-name" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="pop-name"
                        aria-describedby="emailHelp"
                    ></input>
                </div>
                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="pop-check"
                    ></input>
                    <label className="form-check-label" htmlFor="pop-check">
                        Mark as anti-pattern
                    </label>
                </div>
                <button id="pop-save" className="btn btn-success">
                    Save
                </button>
                <button id="pop-delete" className="btn btn-danger">
                    Delete
                </button>
                <button id="pop-close" className="btn btn-primary">
                    Close
                </button>
            </div>
            <div
                style={{
                    float: "left",
                    width: "100%",
                    height: "800px",
                    overflow: "scroll",
                    border: "1px solid black",
                    margin: "15px",
                }}
            >
                <canvas ref={ref}></canvas>
            </div>
        </div>
    );
};

export default Annotationcanvas;
