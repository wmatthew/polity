var c2 = document.getElementById('c').getContext('2d');
c2.fillStyle = '#f00';

drawTriangleStrip({x:100, y:100}, 9,  true);
drawTriangleStrip({x:100, y:150}, 11, true);
drawTriangleStrip({x:100, y:200}, 13, true);
drawTriangleStrip({x:100, y:250}, 15, true);

drawTriangleStrip({x:100, y:300}, 15, false);
drawTriangleStrip({x:100, y:350}, 13, false);
drawTriangleStrip({x:100, y:400}, 11, false);
drawTriangleStrip({x:100, y:450}, 9,  false);

function drawTriangleStrip(pos, total, flip) {
  var width = 30;
  var i = 0;
  while (i < total) {
  	var flipped = (i % 2) == flip
  	var rotation = flipped ? 0 : Math.PI
  	var xOffset = 300-(total-1)/2 * width
  	var yOffset = flipped ? 0 : 17
    drawTriangle({x: pos.x + i * width + xOffset, y: pos.y + yOffset}, 30, rotation);
    i++;
  }	
}

function drawTriangle(pos, scale, rotation) {
  drawPolygon(pos, scale, 3, rotation);	
}

function drawSquare(pos, scale) {
  drawPolygon(pos, scale, 4, Math.PI/4);
}

function drawOctagon(pos, scale) {
  drawPolygon(pos, scale, 8, Math.PI/8);
}

function drawHexagon(pos, scale) {
  drawPolygon(pos, scale, 6, 0);
}

function drawPolygon(pos, scale, totalPoints, rotation) {
    var points = [];
    var num = 0;
    while (num < totalPoints) {
    	theta = rotation + Math.PI * 2 * (num / totalPoints);
    	points.push({x: Math.sin(theta), y: Math.cos(theta)});
    	num ++;
    }
	drawShape(pos, points, scale);
}

function drawShape(center, points, scale) {
	c2.beginPath();
	var c = center;
	var firstPoint = points.shift();
    c2.moveTo(c.x + scale * firstPoint.x, c.y + scale * firstPoint.y);
    for (i in points) {
    	p = points[i];
    	c2.lineTo(c.x + scale * p.x, c.y + scale * p.y);
    }
	c2.closePath();
	c2.fill();
}
