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
				selector: '.work-item a.image[data-action="popup"]',
				usePopupCaption: true,
				usePopupDefaultStyling: false,
				usePopupEasyClose: false,
				usePopupNav: true,
				windowMargin: (breakpoints.active('<=small') ? 0 : 50)
			});

		});

		// Handle work item links.
		document.addEventListener('DOMContentLoaded', function() {
			const workItems = document.querySelectorAll('.work-item a');

			workItems.forEach(item => {
				item.addEventListener('click', function(event) {
					const action = item.getAttribute('data-action');

					if (action === 'popup') {
						event.preventDefault();
						// Poptrox will handle the popup, so no need for additional code here
					} else if (action === 'link') {
						// Do nothing, let the default behavior happen
					}
				});
			});
		});

	// Tab Functionality
	window.openTab = function(event, tabName, categoryId) {
		console.log("Tab clicked: " + tabName);
		// Get the tab contents and tab links within the specified category
		const tabContents = document.querySelectorAll(`#${categoryId} .tab-content`);
		const tabLinks = document.querySelectorAll(`#${categoryId} .tab-link`);

		// Hide all tab contents within the category
		tabContents.forEach(content => {
			content.classList.remove('active');
		});

		// Remove active class from all tab links within the category
		tabLinks.forEach(link => {
			link.classList.remove('active');
		});

		// Show the selected tab content and add active class to the corresponding button
		document.getElementById(tabName).classList.add('active');
		event.currentTarget.classList.add('active');
	};

	// Set default tab to be open
	document.addEventListener("DOMContentLoaded", function() {
		document.querySelectorAll('.tab-content.default-active').forEach(content => {
			content.classList.add("active");
		});
		document.querySelectorAll('.tab-link.default-active').forEach(link => {
			link.classList.add("active");
		});
	});

	// Contact Form Submission
	document.getElementById('contactForm').addEventListener('submit', function(event) {
		event.preventDefault(); // Prevent the default form submission

		var form = event.target;
		var data = new FormData(form);

		fetch(form.action, {
			method: 'POST',
			body: data,
			headers: {
				'Accept': 'application/json'
			}
		}).then(response => {
			if (response.ok) {
				document.getElementById('successMessage').style.display = 'block';
				form.reset();
			} else {
				response.json().then(data => {
					if (Object.hasOwn(data, 'errors')) {
						alert(data["errors"].map(error => error["message"]).join(", "));
					} else {
						alert('There was an error submitting your message. Please try again.');
					}
				})
			}
		}).catch(error => {
			alert('There was an error submitting your message. Please try again.');
		});
	});

	document.addEventListener("DOMContentLoaded", function() {
		const skillsSection = document.getElementById('skills');
		const skillLevels = document.querySelectorAll('.skill-level');

		function isElementInViewport(el) {
			const rect = el.getBoundingClientRect();
			return (
				rect.top >= 0 &&
				rect.left >= 0 &&
				rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
				rect.right <= (window.innerWidth || document.documentElement.clientWidth)
			);
		}

		function animateSkills() {
			if (isElementInViewport(skillsSection)) {
				skillLevels.forEach(skillLevel => {
					const width = skillLevel.getAttribute('style').split(':')[1].trim();
					skillLevel.style.width = width;
				});
			}
		}

		window.addEventListener('scroll', animateSkills);
		animateSkills(); // Run on page load in case skills are already in view
	});


})(jQuery);