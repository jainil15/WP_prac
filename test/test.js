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

    let arr = []
    let names = []
    $.get("textfile.txt", function (data) {
        let x = data.split("\n").splice(0, 1)[0].split(",")[0]
        let y = data.split("\n").splice(0, 1)[0].split(",")[1]
        let d1 = data.split("\n").splice(1)
        d1.splice(d1.length)
        console.log(d1)
        for (const item of d1) {
            if (!isNaN(parseFloat(item.split(",")[1]))) {
                arr.push(parseFloat(item.split(",")[1]))
                console.log(isNaN(parseFloat(item.split(",")[1])))
                names.push(item.split(",")[0].replace(/(\r\n|\n|\r)/gm, ""))
            }
        }

        console.log(arr, names)
        barChart(ctx, arr, names)
    })

}

function barChart(ctx, arr, names) {

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
    ctx.lineTo(startingX + (arr.length) * (gap) + 2 * gap, startingY)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(startingX, startingY)
    ctx.lineTo(startingX, startingY - maxLineHeight)
    ctx.stroke()

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