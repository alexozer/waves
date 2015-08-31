"use strict";

var canvas = document.getElementById("canvas");
var context;

function onResize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	context = canvas.getContext("2d");
	context.fillStyle = "#3f9fcb";
}
window.addEventListener("resize", onResize);
onResize();

var config = {
	minPeriod: 1000,
	maxPeriod: 2000,
	particles: 30,
};

var gui = new dat.GUI();
gui.add(config, "minPeriod").name("Minimum period").min(100).max(3000);
gui.add(config, "maxPeriod").name("Maximum period").min(100).max(3000);
gui.add(config, "particles").name("Particles").min(5).max(150).step(1);

var startTime = new Date();
function draw() {
	context.clearRect(0, 0, canvas.width, canvas.height);

	var progress = new Date() - startTime;
	var maxLerp = progress / config.minPeriod;
	var minLerp = progress / config.maxPeriod;

	var box = canvas.width / config.particles;
	var radius = box / 2.5;
	var vertPadding = radius;

	for(var part = 0; part < config.particles; part++) {
		var lerp = maxLerp - (maxLerp - minLerp) * (part / config.particles);

		var x = part * box + box / 2;
		var y = (Math.sin(lerp * 2 * Math.PI) + 1) / 2 * (canvas.height - vertPadding * 2) + vertPadding;

		context.beginPath();
		context.ellipse(x, y, radius, radius, 0, 0, 2 * Math.PI);
		context.fill();
	}

	requestAnimationFrame(draw);
}

draw();
