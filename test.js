


$(document).ready(function() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        height: h,
        width: w,
    }
});

// create two boxes and a ground
let bodiesArray = []
var boxA = Bodies.rectangle(400, 200, 80, 80);
var boxB = Bodies.rectangle(450, 50, 80, 80);
for(let i = 0; i < 400; i++){
    bodiesArray.push(Bodies.rectangle(Math.round(Math.random() * 800), Math.round(Math.random() * 200), 20, 20))
}

let i = 0;
World.add(engine.world, Bodies.rectangle(400, 610, 810, 60, { isStatic: true }))
World.add(engine.world, Bodies.rectangle(-410, 250, 810, 1000, { isStatic: true }))
World.add(engine.world, Bodies.rectangle(850, 450, 100, 1000, { isStatic: true }))
setInterval(() => {
    if(i < bodiesArray.length){
        World.add(engine.world, bodiesArray[i]);
        i++;
    }
    else {
        return;
    }
}, 5);



// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);
});