$(document).ready(function () {

	var animate1 = "fadeIn";
	    animate2 = "fadeIn";
	function appendContent(elem) {
		var title = $('.circle-content .circle-content-title'),
		    desc  = $('.circle-content .circle-content-desc');
		title.html(elem.find('.circle-item-title').text());
		desc.html(elem.find('.circle-item-desc').text());
		title.removeClass(animate1);
		desc.removeClass(animate2);
		if (animate1 == "fadeIn") {
			animate1 = "fadeInDown";
			animate2 = "fadeInUp";
		} else {
			animate1 = "fadeIn";
			animate2 = "fadeIn";
		};
		title.addClass(animate1);
		desc.addClass(animate2);
	}
	
	var degree = 0;
	
	function rotateElem(elem) {
		var indexCurent;
		var countElem = $('.circle-container .circle-item').length;
		var indexElem = $('.circle-container .circle-item').index(elem);
		
		$('.circle-container .circle-item').each(function(index) {
			if ($(this).hasClass('selected')) {
				indexCurent = index;
			}
		});
		
		$('.circle-container .circle-item.selected').removeClass('selected');
		$('.circle-container .circle-item.prev').removeClass('prev');
		$('.circle-container .circle-item.next').removeClass('next');
		
		if (indexCurent < indexElem) {
			degree = degree - ((360 / countElem) * (indexElem - indexCurent));
		}
		if (indexCurent > indexElem) {
			degree = degree + ((360 / countElem) * (indexCurent - indexElem));
		}
		
		$('.circle-container').css({
			'transform': 'rotate(' + degree + 'deg)'
		});
		$('.circle-container .circle-item').css({
			'transform': 'rotate(' + (-degree) + 'deg)'
		});
		
		elem.addClass('selected');
		if (elem.prev().length) 
			elem.prev().addClass('prev')
		else
			elem.siblings(":last-child").addClass('prev');
		if (elem.next().length) 
			elem.next().addClass('next')
		else
			elem.siblings(":first-child").addClass('next');
	}
	
	function rotatePrev(elem) {
		$('.circle-container .circle-item.selected').removeClass('selected');
		$('.circle-container .circle-item.prev').removeClass('prev');
		$('.circle-container .circle-item.next').removeClass('next');
		
		var countElem = $('.circle-container .circle-item').length;
		var indexElem = $('.circle-container .circle-item').index(elem);
		degree = degree + (360 / countElem);
		
		$('.circle-container').css({
			'transform': 'rotate(' + degree + 'deg)'
		});
		$('.circle-container .circle-item').css({
			'transform': 'rotate(' + (-degree) + 'deg)'
		});
		
		elem.addClass('selected');
		if (elem.prev().length) 
			elem.prev().addClass('prev')
		else
			elem.siblings(":last-child").addClass('prev');
		if (elem.next().length) 
			elem.next().addClass('next')
		else
			elem.siblings(":first-child").addClass('next');
	}
	
	function rotateNext(elem) {
		$('.circle-container .circle-item.selected').removeClass('selected');
		$('.circle-container .circle-item.prev').removeClass('prev');
		$('.circle-container .circle-item.next').removeClass('next');
		
		var countElem = $('.circle-container .circle-item').length;
		var indexElem = $('.circle-container .circle-item').index(elem);
		degree = degree - (360 / countElem);
		
		$('.circle-container').css({
			'transform': 'rotate(' + degree + 'deg)'
		});
		$('.circle-container .circle-item').css({
			'transform': 'rotate(' + (-degree) + 'deg)'
		});
		
		elem.addClass('selected');
		if (elem.prev().length) 
			elem.prev().addClass('prev')
		else
			elem.siblings(":last-child").addClass('prev');
		if (elem.next().length) 
			elem.next().addClass('next')
		else
			elem.siblings(":first-child").addClass('next');
	}
	
	$('.circle-container .circle-item').on('click', function(e) {
		e.preventDefault();
		var elem = $(this);
		rotateElem(elem);
		appendContent(elem);
	});
	
	$('.circle-nav .circle-nav-prev a').on('click', function(e) {
		e.preventDefault();
		var prev = $('.circle-container .circle-item.selected').prev();
		if (prev.length == 0) {
			prev = $('.circle-container .circle-item:last-child');
		}
		rotatePrev(prev);
		appendContent(prev);
	});
	
	$('.circle-nav .circle-nav-next a').on('click', function(e) {
		e.preventDefault();
		var next = $('.circle-container .circle-item.selected').next();
		if (next.length == 0) {
			next = $('.circle-container .circle-item:first-child');
		}
		rotateNext(next);
		appendContent(next);
	});

	var timer = null;
	function startSetInterval() {
	    timer = setInterval(function() {
			  $('.circle-nav .circle-nav-next a').trigger('click');
			}, 15000);
	}
	startSetInterval();
	$('.circle-wrap').hover(function() {
	  clearInterval(timer);
	}, function() {
	  startSetInterval();
	});
	
	appendContent($('.circle-container .circle-item.selected'));

});