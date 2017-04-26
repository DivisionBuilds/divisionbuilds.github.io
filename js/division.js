$(document).ready(function() {
	var img = ["https://images4.alphacoders.com/773/773361.jpg",
	"https://images7.alphacoders.com/602/602603.jpg",
	"https://images5.alphacoders.com/676/676538.jpg",
	"https://images8.alphacoders.com/605/605515.jpg",
	"https://images4.alphacoders.com/601/601859.jpg",
	"https://images8.alphacoders.com/714/714365.jpg",
	"https://images6.alphacoders.com/600/600931.jpg",
	"https://images8.alphacoders.com/527/527385.jpg",
	"https://images2.alphacoders.com/527/527383.png",
	"https://images.alphacoders.com/618/618045.jpg",
	"https://images4.alphacoders.com/601/601859.jpg"];
	$("head").append("<style>body::after{background-image:url(" + img[Math.floor(Math.random() * img.length)] + ");}</style>");
});
