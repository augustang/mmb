/*jslint browser: true*/
/*global $, jQuery, alert*/
$(document).ready(function () {
    AOS.init({
        delay: 500,
        duration: 1200,
    });
    
    $(".animsition").animsition({
    inClass: 'fade-in',
    outClass: 'fade-out',
    inDuration: 1000,
    outDuration: 500,
    //linkElement: '.fade-link',
    linkElement: 'a:not([target="_blank"]):not([href^="#"]):not(.no-fade)',
    loading: true,
    loadingParentElement: 'body', //animsition wrapper element
    loadingClass: 'animsition-loading',
    loadingInner: '', // e.g '<img src="loading.svg" />'
    timeout: false,
    timeoutCountdown: 2000,
    onLoadEvent: true,
    browser: [ 'animation-duration', '-webkit-animation-duration'],
    // "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
    // The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
    overlay : false,
    overlayClass : 'animsition-overlay-slide',
    overlayParentElement : 'body',
    transition: function(url){ window.location.href = url; }
  });
    
    $('a[href^="#"]').on('click', function(event) {
        var hash = '#' + $(this).attr('href').split('#')[1]
        var element = $(hash)
        if (element.length) {
          event.preventDefault();
          history.pushState(hash, undefined, hash)
          $('html, body').animate({scrollTop: element.offset().top}, 500)
        }
      });   

      window.addEventListener('popstate', function(e) {
        if(e.state && e.state.startsWith('#') && $(e.state).length){
          $('html, body').animate({scrollTop: $(e.state).offset().top}, 500)
        }
      });

      $('html, body').on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
        $('html, body').stop();
      });
 
    /*document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });*/
    
});

/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } 
    else if (scrollTop = 0) {
        document.getElementById("navbar").style.top = "0";
    }
    else {
    document.getElementById("navbar").style.top = "-50px";
  }
  prevScrollpos = currentScrollPos;
}

/*drawing hero area*/

var width = "100%",
		height = "100vh";

var line = d3.line()
	.curve(d3.curveBasis);

var input = d3.select("input")
	.on("input", changeLetters);

var letters = input.node().value;

var startingPath = getStartingPath();

var svg = d3.select("body").append("svg")
	.attr("width", width)
	.attr("height", height)
	.call(d3.drag()
		.container(function(d) { return this; })
		.subject(function(d) { var p = [d3.event.x, d3.event.y]; return [p, p]; })
		.on("start", dragStarted));

var textPath = svg.append("defs").append("path")
	.attr("id", "textPath")
	.attr("d", startingPath);

var path = svg.append("path")
	.attr("d", startingPath);

var text = svg.append("text").append("textPath")
	.attr("xlink:href", "#textPath")
	.text(letters);

function changeLetters() {
	letters = input.node().value;
	text.text(letters);
}

function dragStarted() {
	var d = d3.event.subject,
			x0 = d3.event.x,
			y0 = d3.event.y;
	
	path.datum(d);
	textPath.datum(d);

	d3.event.on("drag", function() {
		var x1 = d3.event.x,
				y1 = d3.event.y,
				dx = x1 - x0,
				dy = y1 - y0;
		
		if (dx * dx + dy * dy > 100) d.push([x0 = x1, y0 = y1]);
		else d[d.length - 1] = [x1, y1];
		textPath.attr("d", line);
		path.attr("d", line);
	});
}


function getStartingPath() {
	return "M83,265L84,263.6666666666667C85,262.3333333333333,87,259.6666666666667,88.83333333333333,257.1666666666667C90.66666666666667,254.66666666666666,92.33333333333333,252.33333333333334,94.5,249.66666666666666C96.66666666666667,247,99.33333333333333,244,101.83333333333333,241C104.33333333333333,238,106.66666666666667,235,109.16666666666667,232.33333333333334C111.66666666666667,229.66666666666666,114.33333333333333,227.33333333333334,117.33333333333333,225.16666666666666C120.33333333333333,223,123.66666666666667,221,126.83333333333333,219.16666666666666C130,217.33333333333334,133,215.66666666666666,136,214C139,212.33333333333334,142,210.66666666666666,145.16666666666666,209.16666666666666C148.33333333333334,207.66666666666666,151.66666666666666,206.33333333333334,154.83333333333334,205.16666666666666C158,204,161,203,164.33333333333334,202.5C167.66666666666666,202,171.33333333333334,202,175.16666666666666,202C179,202,183,202,187,202C191,202,195,202,198.66666666666666,202.66666666666666C202.33333333333334,203.33333333333334,205.66666666666666,204.66666666666666,209,206.16666666666666C212.33333333333334,207.66666666666666,215.66666666666666,209.33333333333334,218.83333333333334,210.83333333333334C222,212.33333333333334,225,213.66666666666666,228,215.33333333333334C231,217,234,219,237.16666666666666,220.83333333333334C240.33333333333334,222.66666666666666,243.66666666666666,224.33333333333334,246.83333333333334,226.33333333333334C250,228.33333333333334,253,230.66666666666666,255.83333333333334,232.83333333333334C258.6666666666667,235,261.3333333333333,237,264.1666666666667,239.33333333333334C267,241.66666666666666,270,244.33333333333334,273,246.66666666666666C276,249,279,251,282,253C285,255,288,257,291,258.8333333333333C294,260.6666666666667,297,262.3333333333333,300.1666666666667,264C303.3333333333333,265.6666666666667,306.6666666666667,267.3333333333333,310.1666666666667,269C313.6666666666667,270.6666666666667,317.3333333333333,272.3333333333333,321.1666666666667,273.8333333333333C325,275.3333333333333,329,276.6666666666667,332.6666666666667,277.5C336.3333333333333,278.3333333333333,339.6666666666667,278.6666666666667,343.1666666666667,278.8333333333333C346.6666666666667,279,350.3333333333333,279,354.1666666666667,279C358,279,362,279,365.6666666666667,279C369.3333333333333,279,372.6666666666667,279,376,278.6666666666667C379.3333333333333,278.3333333333333,382.6666666666667,277.6666666666667,386,276.8333333333333C389.3333333333333,276,392.6666666666667,275,396.1666666666667,274C399.6666666666667,273,403.3333333333333,272,406.6666666666667,271C410,270,413,269,416.3333333333333,267.8333333333333C419.6666666666667,266.6666666666667,423.3333333333333,265.3333333333333,426.6666666666667,263.6666666666667C430,262,433,260,436.3333333333333,258.1666666666667C439.6666666666667,256.3333333333333,443.3333333333333,254.66666666666666,446.8333333333333,253C450.3333333333333,251.33333333333334,453.6666666666667,249.66666666666666,457.1666666666667,248C460.6666666666667,246.33333333333334,464.3333333333333,244.66666666666666,467.8333333333333,243C471.3333333333333,241.33333333333334,474.6666666666667,239.66666666666666,477.6666666666667,238.33333333333334C480.6666666666667,237,483.3333333333333,236,486.6666666666667,234.83333333333334C490,233.66666666666666,494,232.33333333333334,497.6666666666667,231.5C501.3333333333333,230.66666666666666,504.6666666666667,230.33333333333334,508,229.83333333333334C511.3333333333333,229.33333333333334,514.6666666666666,228.66666666666666,517.6666666666666,228.16666666666666C520.6666666666666,227.66666666666666,523.3333333333334,227.33333333333334,526.8333333333334,227C530.3333333333334,226.66666666666666,534.6666666666666,226.33333333333334,538.8333333333334,226.16666666666666C543,226,547,226,550.8333333333334,226.16666666666666C554.6666666666666,226.33333333333334,558.3333333333334,226.66666666666666,561.8333333333334,227.66666666666666C565.3333333333334,228.66666666666666,568.6666666666666,230.33333333333334,571.8333333333334,231.83333333333334C575,233.33333333333334,578,234.66666666666666,581,236.5C584,238.33333333333334,587,240.66666666666666,590,242.83333333333334C593,245,596,247,599,249C602,251,605,253,608,255.16666666666666C611,257.3333333333333,614,259.6666666666667,616.8333333333334,262C619.6666666666666,264.3333333333333,622.3333333333334,266.6666666666667,625.1666666666666,268.8333333333333C628,271,631,273,634.3333333333334,274.8333333333333C637.6666666666666,276.6666666666667,641.3333333333334,278.3333333333333,644.8333333333334,279.8333333333333C648.3333333333334,281.3333333333333,651.6666666666666,282.6666666666667,655,283.5C658.3333333333334,284.3333333333333,661.6666666666666,284.6666666666667,665.1666666666666,285C668.6666666666666,285.3333333333333,672.3333333333334,285.6666666666667,676,285.8333333333333C679.6666666666666,286,683.3333333333334,286,687,286C690.6666666666666,286,694.3333333333334,286,698,286.1666666666667C701.6666666666666,286.3333333333333,705.3333333333334,286.6666666666667,707.5,286.8333333333333C709.6666666666666,287,710.3333333333334,287,710.6666666666666,287L711,287";
}

//smooth scroll
/*(function() {
    scrollTo();
})();

function scrollTo() {
    const links = document.querySelectorAll('.scroll');
    links.forEach(each => (each.onclick = scrollAnchors));
}

function scrollAnchors(e, respond = null) {
    const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);
    e.preventDefault();
    var targetID = (respond) ? respond.getAttribute('href') : this.getAttribute('href');
    const targetAnchor = document.querySelector(targetID);
    if (!targetAnchor) return;
    const originalTop = distanceToTop(targetAnchor);
    window.scrollBy({ top: originalTop, left: 0, behavior: 'smooth' });
    const checkIfDone = setInterval(function() {
        const atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
        if (distanceToTop(targetAnchor) === 0 || atBottom) {
            targetAnchor.tabIndex = '-1';
            targetAnchor.focus();
            window.history.pushState('', '', targetID);
            clearInterval(checkIfDone);
        }
    }, 100);
}*/



/*failed slideshow modal here
function openModal() {
    document.getElementById("myModal").style.display = "block";
}
function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}
*/