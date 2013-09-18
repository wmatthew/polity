var c2 = document.getElementById('c').getContext('2d');
c2.fillStyle = '#f00';

drawTriangleGrid({x:100, y:300}, 3);


function drawTriangleGrid(pos, size) {
  for (var i=0; i<size; i++) {
    var rowSize = 2*size - 1 + 2*(size -i);
    drawTriangleStrip({x:pos.x, y:pos.y - 25 * (1 + 2*i)}, rowSize,  true);
    drawTriangleStrip({x:pos.x, y:pos.y + 25 * (1 + 2*i)}, rowSize,  false);
  }
}

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
	validatePoints(points);
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

function validatePoints(points) {
	for (i in points) {
		validatePoint(points[i])
	}
}

function validatePoint(point) {
	if (point.x == undefined || point.y == undefined) {
      console.log('invalid point:' + point);		
	}
}

console.log("loaded.");
