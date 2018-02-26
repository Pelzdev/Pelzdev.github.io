let productsObj = {};
const productsDiv = document.querySelector('.products');
let productsArray = [];
let productsToShow = 0;
let productsToShowDefault = 0;

const sliderImages = ['slide1', 'slide2', 'slide3'];
const sliderNavImages = ['slide_nav1', 'slide_nav2', 'slide_nav3'];
let sliderIndex = 0;

$(function(){
	if ($(window).width() >= 1720 && $(window).width() < 2150) {
		productsToShow = 8;
		productsToShowDefault = 8;
	} else if ($(window).width() >= 2150) {
		productsToShow = 10;
		productsToShowDefault = 10;
	} else {
		productsToShow = 6;
		productsToShowDefault = 6;
	}

	fetch('https://webshop.wm3.se/api/v1/shop/products.json?media_file=true')
	.then(response => response.json())
	.then(data => {
		productsArray = data.products;
		showProducts(productsArray);
	});

	$('.article1-wrapper').on('click', function(){
		window.location = "http://www.sportshoes.html/article1/";    
	});
	$('.article2-wrapper').on('click', function(){
		window.location = "http://www.sportshoes.html/article2/";    
	});
	$('.search-input').val('');
	$('.fa-search').on('click', searchProducts);
	$('.search-input').on('keyup', searchProducts);

	const timer = setInterval(function() {
		if (sliderIndex+1 >= sliderImages.length) {
			sliderIndex = 0;
		} else {
			sliderIndex++;
		}

		let currentImage = sliderImages[sliderIndex];
		let currentNavImage = sliderNavImages[sliderIndex];
    $('.slider-image').fadeOut(500, function() {
			$('.slider-image').attr('src', `../assets/images/${currentImage}.jpg`);
			$('.slide-nav-image').attr('src', `../assets/images/${currentNavImage}.png`);
			$('.slider-image').fadeIn(500);
		});

		if (sliderIndex !== 0) {
			$('.header-center > button').css('visibility', 'hidden');
		} else {
			$('.header-center > button').css('visibility', 'visible');
		}
 }, 5000);
});

function showProducts (list) {
	let index = 0;
	productsDiv.innerHTML = '';
	list.forEach(function(product) {
		if (index < productsToShowDefault) {
			productsDiv.innerHTML += `
				<div class="product product${index}">
					<img src="${product.media_file.url}">
					<p>${product.name.toUpperCase()}</p>
				</div>
			`;
		}
		index ++;
	});
}

function searchProducts() {
	const searchBox = document.querySelector('.search-input');
	let input = searchBox.value.toLowerCase();
	const matches = [];
	
	if (input.match(/[a-z]/i) && input.length > 1) {
		console.log('searched');
		productsArray.forEach(item => item.name.toLowerCase().indexOf(input) > -1 ? matches.push(item) : null);
		if (matches.length < 1) {
			noResultsMessage();
			return;
		}
		productsToShow = matches.length;
		showProducts(matches);
	} else if (input === '') {
		productsToShow = productsToShowDefault;
		showProducts(productsArray);
	} 
};

function noResultsMessage () {
	productsDiv.innerHTML = '';
	productsDiv.innerHTML += `
		<div class="no-results-message">
			<p>No product matches your search.</p>
		</div>
	`;
}