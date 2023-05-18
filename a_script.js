window.onload = () => {
    const canvas= document.getElementById("canvas")
    canvas.width=800
    canvas.height=800
    const ctx = canvas.getContext('2d')
    drawLine(ctx)
    drawRect(ctx)
    drawCircle(ctx)
}

function drawRect(ctx) {
    ctx.beginPath()
    ctx.rect(100,50,250,120)
    ctx.fillStyle="red"
    ctx.fill()
    ctx.stroke()
    
}

function drawLine(ctx) {
    ctx.beginPath()
    ctx.moveTo(100,250)
    ctx.lineTo(320,350)
    ctx.stroke()
}

function drawCircle(ctx) {
    ctx.beginPath()
    ctx.arc(200,500,100,0,2*Math.PI)
    ctx.fillStyle="yellow"
    ctx.fill()
    ctx.stroke()
}