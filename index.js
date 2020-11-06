datasets = {
    "recycling": {
        "title": "Trash Recycling 1970-2017",
        "min": 1960,
        "max": 2017,
        "labels": ["1960", "1970", "1980", "1990", "2000", "2005", "2010", "2015", "2016", "2017"],
        "label1": 'Recovery of U.S. municipal solid waste for recycling from 1960 to 2017',
        "label2": 'U.S. municipal solid waste generation from 1960 to 2017',
        "data1": [{x: '1960', y: 5.6}, {x: '1970', y: 8}, {x: '1980', y: 14.5}, {x: '1990', y: 29}, {x: '2000', y: 53}, {x: '2005', y: 59.2}, {x: '2010', y: 65.3}, {x: '2015', y: 67.6}, {x: '2016', y: 68.6}, {x: '2017', y: 67.2}],
        "data2": [{x: '1960', y: 88.1}, {x: '1970', y: 121.1}, {x: '1980', y: 151.6}, {x: '1990', y: 208.3}, {x: '2000', y: 243.5}, {x: '2005', y: 253.7}, {x: '2010', y: 251.1}, {x: '2015', y: 262.1}, {x: '2016', y: 266.8}, {x: '2017', y: 267.8}],
        "yaxis": "Trash in millions of tons",
        "simLabel1": "Trash Recycled",
        "simLabel2": "Trash Produced",
        "simTitle": "Each box represents 2,000,000,000 lbs of trash"
    },
    "newspaper": {
        "title": "Newspaper Recycling 1993-2019",
        "min": 1993,
        "max": 2019,
        "labels": ["1993", "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019"],
        "label1": 'Total newsprint paper supply in the United States from 1993 to 2019',
        "label2": 'Total recovery of old newspaper in the United States from 1995 to 2019',
        "data1": [{x: '1993', y: 15.578}, {x: '1994', y: 15.813}, {x: '1995', y: 15.832}, {x: '1996', y: 16.971}, {x: '1997', y: 18.266}, {x: '1998', y: 18.613}, {x: '1999', y: 19.152}, {x: '2000', y: 19.221}, {x: '2001', y: 17.414}, {x: '2002', y: 17.464}, {x: '2003', y: 17.404}, {x: '2004', y: 17.542}, {x: '2005', y: 17.175}, {x: '2006', y: 15.888}, {x: '2007', y: 15.397}, {x: '2008', y: 14.120}, {x: '2009', y: 10.829}, {x: '2010', y: 10.360}, {x: '2011', y: 9.552}, {x: '2012', y: 8.728}, {x: '2013', y: 8.346}, {x: '2014', y: 7.857} ,{x: '2015', y: 6.972},{x: '2016', y: 6.484} ,{x: '2017', y: 5.629} ,{x: '2018', y: 5.228} ,{x: '2019', y: 4.400}],
        "data2": [{x: '1995', y: 8.023}, {x: '1996', y: 8.329}, {x: '1997', y: 8.847}, {x: '1998', y: 9.211}, {x: '1999', y: 9.536}, {x: '2000', y: 10.059}, {x: '2001', y: 10.261}, {x: '2002', y: 10.492}, {x: '2003', y: 11.129}, {x: '2004', y: 10.935}, {x: '2005', y: 11.068}, {x: '2006', y: 11.121}, {x: '2007', y: 10.586}, {x: '2008', y: 9.775}, {x: '2009', y: 7.612}, {x: '2010', y: 7.409}, {x: '2011', y: 6.925}, {x: '2012', y: 6.113}, {x: '2013', y: 5.631}, {x: '2014', y: 5.437} ,{x: '2015', y: 4.993},{x: '2016', y: 4.680} ,{x: '2017', y: 4.349} ,{x: '2018', y: 3.425} ,{x: '2019', y: 2.681}],
        "yaxis": "Newspaper in millions of tons",
        "simLabel1": "Newspaper Supply",
        "simLabel2": "Newspaper Recovery",
        "simTitle": "Each box represents 2,000,000,000 lbs of newspaper"
    }
}


let currentDataset = datasets["recycling"]
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

function updateSimBox(value) {

    try {
        let num1;
        let num2;
        if(currentDataset['labels'].indexOf(value) > -1){
            num1 = currentDataset['data1'][currentDataset['labels'].indexOf(value)]['y']
            num2 = currentDataset['data2'][currentDataset['labels'].indexOf(value)]['y']
        }
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
    
                    Sim1 = createFallSimBox("sim1", num1, sim)
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
                    Sim2 = createFallSimBox("sim2", num2, sim)
                }
            });
        }
    }
    catch (err) {
        console.log(err)
    }
}

slider.oninput = function() {
    output.innerHTML = this.value;
    updateSimBox(this.value);
}


currentDataset = datasets["recycling"]

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: currentDataset['labels'],
        datasets: [{
            label: currentDataset['label1'],
            data: currentDataset['data1'],
            backgroundColor: [
                'rgba(66, 135, 245, 0.2)',
            ],
            borderColor: [
                'rgba(66, 135, 245, 1)',
            ],
            borderWidth: 1
        },
        {
        label: currentDataset['label2'],
            data: currentDataset['data2'],
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
                display: true,
                type: 'linear',
                stacked: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Year'
                },
                ticks: {
                    min: currentDataset['min'],
                    max: currentDataset['max'],
                    stepSize: 10,
                },
            }],
            yAxes: [{
                display: true,
                stacked: false,
                ticks: {
                beginAtZero: true,
                },
                scaleLabel: {
                    display: true,
                    labelString: currentDataset['yaxis']
                },
            }]
        }
    }
});


async function createFallSimBox(elementId, num, sim=undefined) {
    
    var w = window.innerWidth;
    var h = window.innerHeight;
    w /= 4;
    h /= 2;
    var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;
    Runner = Matter.Runner;

    var engine;
    var render;
    var runner;
    if(sim){
        runner = sim["runner"]
    }
    else {
        runner = Runner.create();
    }
    engine = Engine.create();
    render = Render.create({
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

    // run the renderer
    Render.run(render);
    
    Runner.run(runner, engine);
    return {"engine": engine, "render": render, "world": World, "runner": runner}
}

let Sim1;
let Sim2;
$(document).ready(function() {
    Sim1 = createFallSimBox("sim1", 5.6)
    Sim2 = createFallSimBox("sim2", 88.1)
    $("#dataset").append("<option value='recycling'>Recycling Data 1970-2017</option>");
    $("#dataset").append("<option value='newspaper'>Newspaper Recycling 1993-2019</option>");
});

function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

function removeData(chart) {
    chart.data.labels = []
    chart.data.datasets = []
    chart.update();
}

function changeChartDataset(chart, name) {
    currentDataset = datasets[name]
    if(typeof(currentDataset['data1'][0]) == "number"){
        for(let i = 0; i < currentDataset['data1'].length; i++){
            currentDataset['data1'][i] = {x: currentDataset['labels'][i], y: currentDataset['data1'][i]}
        }
        for(let i = 0; i < currentDataset['data2'].length; i++){
            currentDataset['data2'][i] = {x: currentDataset['labels'][i], y: currentDataset['data2'][i]}
        }
    }
    
    console.log(currentDataset['data1'])
    chart.data.labels = currentDataset["labels"]
    chart.data.datasets[0].label = currentDataset['label1']
    chart.data.datasets[1].label = currentDataset['label2']
    chart.data.datasets[0].data = currentDataset['data1']
    chart.data.datasets[1].data = currentDataset['data2']
    chart.config.options.scales.xAxes[0].ticks.min = currentDataset['min']
    chart.config.options.scales.xAxes[0].ticks.max = currentDataset['max']
    chart.config.options.scales.yAxes[0].scaleLabel.labelString = currentDataset['yaxis']
    chart.update()
}
function changeSimText() {
    $("#simTitle").first().text(currentDataset["simTitle"])
    $("#simLabel1").first().text(currentDataset["simLabel1"])
    $("#simLabel2").first().text(currentDataset["simLabel2"])
    $('#myRange').first()[0].min = currentDataset['min']
    $('#myRange').first()[0].max = currentDataset['max']
    $('#demo').first()[0].innerHTML = currentDataset['min']

}

function selectDataset(){
    newDatasetName = $("#dataset")[0].value
    changeChartDataset(myChart, newDatasetName)
    changeSimText()
    updateSimBox(currentDataset['min'].toString())

}