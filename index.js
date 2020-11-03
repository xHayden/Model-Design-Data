var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function() {
    output.innerHTML = this.value;
    let num1 = exampleDataSet['data1'][exampleDataSet['labels'].indexOf(this.value)]
    let num2 = exampleDataSet['data2'][exampleDataSet['labels'].indexOf(this.value)]
    if(num1){
        Sim1.then((sim) => {
            if(sim.render.canvas){
                Matter.World.clear(sim.engine.world)
                Matter.Engine.clear(sim.engine)
                Matter.Render.stop(sim.render)
                Matter.Runner.stop(sim.runner);
                sim.render.canvas.remove()
                sim.render.canvas = null;
                sim.render.context = null;
                sim.render.textures = {};

                Sim1 = createFallSimBox("sim1", num1)
            }
        });
    }
    if(num2) {
        Sim2.then((sim) => {
            if(sim.render.canvas){
                Matter.World.clear(sim.engine.world)
                Matter.Engine.clear(sim.engine)
                Matter.Render.stop(sim.render)
                Matter.Runner.stop(sim.runner);
                sim.render.canvas.remove()
                sim.render.canvas = null;
                sim.render.context = null;
                sim.render.textures = {};
                Sim2 = createFallSimBox("sim2", num2)
            }
        });
    }
    

    
    
    //createFallSimBox("sim2", 67)
}

exampleDataSet = {
    'labels': ['1960', '1970', '1980', '1990', '2000', '2005', '2010', '2015', '2016', '2017'], 
    'data1': [5.6, 8, 14.5, 29, 53, 59.2, 65.3, 67.6, 68.6, 67.2],
    'data2': [88.1, 121.1, 151.6, 208.3, 243.5, 253.7, 251.1, 262.1, 266.8, 267.8]}

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['1960', '1970', '1980', '1990', '2000', '2005', '2010', '2015', '2016', '2017'],
        datasets: [{
            label: 'Recovery of U.S. municipal solid waste for recycling from 1960 to 2017',
            data: [5.6, 8, 14.5, 29, 53, 59.2, 65.3, 67.6, 68.6, 67.2],
            backgroundColor: [
                'rgba(66, 135, 245, 0.2)',
            ],
            borderColor: [
                'rgba(66, 135, 245, 1)',
            ],
            borderWidth: 1
        },
        {
        label: 'U.S. municipal solid waste generation from 1960 to 2017',
            data: [88.1, 121.1, 151.6, 208.3, 243.5, 253.7, 251.1, 262.1, 266.8, 267.8],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1
        },
    
    
    
    ]
    },
    options: {
        scales: {
            xAxes: [{ 
                stacked: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Year (does not follow linear progression)'
                }
            }],
            yAxes: [{
                stacked: false,
                ticks: {
                beginAtZero: true,
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Trash in millions of tons'
                }
            }]
        }
    }
});


async function createFallSimBox(elementId, num) {
    var w = window.innerWidth;
    var h = window.innerHeight;
    w /= 4;
    h /= 2;
    var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

// create an engine
    var engine = Engine.create();
    

    // create a renderer
    var render = Render.create({
        element: document.querySelector('#' + elementId),
        engine: engine,
        options: {
            height: h,
            width: w,
        }
    });

    // create two boxes and a ground
    let bodiesArray = []
    for(let i = 0; i < num; i++){
        bodiesArray.push(Bodies.rectangle(Math.round(Math.random() * w), Math.round(Math.random() * 200), w/h * 10 + 5, w/h * 10 + 5))
    }

    let i = 0;
    World.add(engine.world, Bodies.rectangle(w/2, h, w, 10, { isStatic: true }))
    World.add(engine.world, Bodies.rectangle(1-w/4, h/2, w/2, h, { isStatic: true }))
    World.add(engine.world, Bodies.rectangle(w, h/2, 2, h, { isStatic: true }))
    setInterval(() => {
        if(i < bodiesArray.length){
            World.add(engine.world, bodiesArray[i]);
            i++;
        }
        else {
            return;
            
        }
    }, 5);



    
    Runner = Matter.Runner;
    // run the renderer
    Render.run(render);
    runner = Runner.create();
    Runner.run(runner, engine);
    return {"engine": engine, "render": render, "world": World, "runner": runner}
}

let Sim1;
let Sim2;
$(document).ready(function() {
    Sim1 = createFallSimBox("sim1", 5.6)
    Sim2 = createFallSimBox("sim2", 88.1)
});