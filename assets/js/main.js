/*
	Strata by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		settings = {

			// Parallax background effect?
				parallax: true,

			// Parallax factor (lower = more intense, higher = less intense).
				parallaxFactor: 20

		};

	// Breakpoints.
	breakpoints({
		xlarge:  [ '1281px',  '1800px' ],
		large:   [ '981px',   '1280px' ],
		medium:  [ '737px',   '980px'  ],
		small:   [ '481px',   '736px'  ],
		xsmall:  [ null,      '480px'  ],
	});

	// Play initial animations on page load.
	$window.on('load', function() {
		window.setTimeout(function() {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Touch?
	if (browser.mobile) {

		// Turn on touch mode.
			$body.addClass('is-touch');

		// Height fix (mostly for iOS).
			window.setTimeout(function() {
				$window.scrollTop($window.scrollTop() + 1);
			}, 0);

	}

	// Footer.
	breakpoints.on('<=medium', function() {
		$footer.insertAfter($main);
	});

	breakpoints.on('>medium', function() {
		$footer.appendTo($header);
	});

	// Header.

	// Parallax background.

		// Disable parallax on IE (smooth scrolling is jerky), and on mobile platforms (= better performance).
			if (browser.name == 'ie'
			||	browser.mobile)
				settings.parallax = false;

		if (settings.parallax) {

			breakpoints.on('<=medium', function() {

				$window.off('scroll.strata_parallax');
				$header.css('background-position', '');

			});

			breakpoints.on('>medium', function() {

				$header.css('background-position', 'left 0px');

				$window.on('scroll.strata_parallax', function() {
					$header.css('background-position', 'left ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');
				});

			});

			$window.on('load', function() {
				$window.triggerHandler('scroll');
			});

		}

	// Main Sections: Two.

	// Lightbox gallery.
		$window.on('load', function() {

			$('#two').poptrox({
				caption: function($a) { return $a.next('h3').text(); },
				overlayColor: '#2c2c2c',
				overlayOpacity: 0.85,
				popupCloserText: '',
				popupLoaderText: '',
				selector: '.work-item a.image',
				usePopupCaption: true,
				usePopupDefaultStyling: false,
				usePopupEasyClose: false,
				usePopupNav: true,
				windowMargin: (breakpoints.active('<=small') ? 0 : 50)
			});

		});
	// Tab Functionality
	window.openTab = function(event, tabName) {
		console.log("Tab clicked: " + tabName);
		// Hide all tab contents
		const tabContents = document.querySelectorAll('.tab-content');
		tabContents.forEach(content => {
			content.classList.remove('active');
		});

		// Remove active class from all tab links
		const tabLinks = document.querySelectorAll('.tab-link');
		tabLinks.forEach(link => {
			link.classList.remove('active');
		});

		// Show the selected tab content and add active class to the corresponding button
		document.getElementById(tabName).classList.add('active');
		event.currentTarget.classList.add('active');
	};

	// Set default tab to be open
	document.addEventListener("DOMContentLoaded", function() {
		document.getElementById("dataAnalytics").classList.add("active");
	});

	// Contact Form Submission
	document.getElementById('contactForm').addEventListener('submit', function(event) {
		event.preventDefault(); // Prevent the default form submission

		// Create a new FormData object
		var formData = new FormData(this);

		// Send the form data using fetch API
		fetch('send_email.php', {
			method: 'POST',
			body: formData
		})
		.then(response => response.text())
		.then(responseText => {
			console.log(responseText); // For debugging
			if (responseText.trim() === 'success') {
				// Show the success message
				document.getElementById('successMessage').style.display = 'block';
				// Clear the form fields
				document.getElementById('contactForm').reset();
			} else {
				alert('There was an error submitting your message. Please try again.');
			}
		})
		.catch(error => {
			console.error('Error:', error);
			alert('There was an error submitting your message. Please try again.');
		});
	});

})(jQuery);