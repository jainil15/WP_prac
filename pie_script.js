const WIDTH=800
const HEIGHT=800
const COLORARRAY = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
window.onload = () => {
    const canvas = document.getElementById("canvas")
    canvas.width = WIDTH
    canvas.height = HEIGHT
    const ctx=canvas.getContext("2d")
    let names=['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'someting', "random"]
    let values=[95,34,69,31,47,20,50, 3]
    drawPieChart(ctx, names, values)
}

function drawPieChart(ctx,names,values) {
    
    let startAngle=0
    let nextColor=0
    let namex=0
    let namey=0
    let radius=150
    let endAngle=0
    let fontSize=10
    for(let value of values) {
        
        endAngle= startAngle + ((value/values.reduce((partialSum, a) => partialSum + a, 0))*Math.PI*2)
        let diffAngle=endAngle-startAngle
        let bisector=diffAngle/2
        let percentagex=(radius)*Math.sin(endAngle-bisector)
        let percentagey=(radius)*Math.cos(endAngle-bisector)
        if((endAngle-bisector)>2.1 && (endAngle-bisector)<3.67) {
            namey=(radius+names[nextColor].length*radius/20)*Math.sin(endAngle-bisector)
            namex=(radius+names[nextColor].length*radius/20)*Math.cos(endAngle-bisector)
        }
        else{
            namey=(radius+10)*Math.sin(endAngle-bisector)
            namex=(radius+10)*Math.cos(endAngle-bisector)
        }

        ctx.beginPath()

        ctx.arc(WIDTH/2-200, HEIGHT/2-200, radius, startAngle, endAngle)
      
        ctx.fillStyle=COLORARRAY[nextColor]
        
        ctx.lineTo(WIDTH/2-200, HEIGHT/2-200)
        ctx.closePath()
        ctx.fill()
        
        ctx.stroke()
        
        startAngle=endAngle
        ctx.save()
        ctx.translate(200,200)
        ctx.fillStyle="black"
        ctx.fillText(names[nextColor],namex, namey);
        ctx.fillText(((value/values.reduce((partialSum, a) => partialSum + a, 0)) * 100).toPrecision(2).toString() + "%", namex/1.5-5, namey/1.4)
        ctx.restore()
        nextColor++
    }
}