const WIDTH = 800
const HEIGHT = 800
let COLORARRAY = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
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
    let html = document.documentElement
    canvas.width = WIDTH
    canvas.height = HEIGHT
    const ctx = canvas.getContext('2d')
    let names = []
    let values = []
    $.ajax({
        type: 'GET',
        url: 'data.xml',
        dataType: 'xml',
        success: function(xml) {

            $(xml).find("Item").each(function () {
                names.push($(this).find("Name").text())
                values.push(parseFloat($(this).find("Price").text()))
            })
            barChart(ctx,"Name","Price",values, names)
        }
    })
    console.log(values)
    


}

function barChart(ctx, xname, yname, arr, names) {
    let gap = 40
    let barWidth = 30
    let realgap = gap - barWidth
    let startingX = 400 - (arr.length / 2 * (gap + barWidth)) / 2
    let startingY = 550
    let imgScaling = 5;
    let verticalScaleGap = 5;
    let maxLineHeight = (Math.max(...arr) * 5) + (3 * verticalScaleGap * imgScaling)
    maxLineHeight -= maxLineHeight % 5
    console.log(maxLineHeight)
    ctx.beginPath()
    ctx.rect(0, 0, WIDTH, HEIGHT,)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(startingX, startingY)
    ctx.lineTo(startingX + (arr.length) * (gap) + 3 * gap, 550)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(startingX, startingY)
    ctx.lineTo(startingX, startingY - maxLineHeight)
    ctx.stroke()
    ctx.font = "1rem Roboto mono"
    ctx.fillText(xname,(startingX+(arr.length) * (gap) + 4 * gap +startingX)/2.3, startingY+60)
    ctx.fillText(yname,startingX-100, startingY - maxLineHeight/2)

    for (let i = startingY, j = 0; i >= startingY - maxLineHeight; i -= verticalScaleGap * verticalScaleGap, j += verticalScaleGap) {
        ctx.beginPath()
        ctx.moveTo(startingX, i)
        ctx.lineTo(startingX - 10, i)
        ctx.stroke()
        ctx.font = "10px Arial";
        ctx.fillText(j.toString(), startingX - 30, i);
    }
    let colorPicker = 0
    for (const item of arr) {

        ctx.beginPath()
        ctx.rect(startingX + gap - barWidth, startingY, barWidth, -item * 5)
        ctx.fillStyle = COLORARRAY[colorPicker]

        ctx.fill()
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(startingX + barWidth / 2 + realgap, startingY)
        ctx.lineTo(startingX + barWidth / 2 + realgap, startingY + 10)
        ctx.stroke()
        ctx.font = "10px Arial";
        ctx.fillStyle = "black"
        ctx.save()
        ctx.translate(barWidth / 2 + realgap + startingX, startingY + 20)
        ctx.rotate(-Math.PI / 6);
        ctx.fillText(names[colorPicker], -names[colorPicker].length * 3, 0);

        ctx.restore();
        startingX += gap
        colorPicker++
    }
}
