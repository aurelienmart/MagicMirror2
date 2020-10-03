/* Magic Mirror
 *
 * Font Injector
 * MIT Licensed.
 *
 * Redesigned by Răzvan Cristea
 * for iPad 3 & HD display
 * https://github.com/hangorazvan
 */

function injector() {
	var link = document.createElement("link");
	link.type = 'text/css';
	document.head.innerHTML +="<link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i&display=swap&subset=latin-ext\" />" 
							+ "<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css\" integrity=\"sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog==\" crossorigin=\"anonymous\" />"
							+ "<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/v4-shims.min.css\" integrity=\"sha512-njWvXjJPMYfvYHb2DAnEL0MS5KEmoIeZVdpK7tpxiApoL3ZoUzHSvkoSFrbASdTuIHnEVG+Ko+ES/DXKygBH4g==\" crossorigin=\"anonymous\" />"
							+ "<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/weather-icons/2.0.10/css/weather-icons.min.css\" integrity=\"sha512-Fdq8QvrEd3TD4heN8gNTOl79sAZR7zsiHIDQbE5eEBxx8pPfb/yJHaBWxhoG7SNcQiBmrrUHlg5TiNX4ovt6Jg==\" crossorigin=\"anonymous\" />"
							+ "<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/weather-icons/2.0.10/css/weather-icons-wind.min.css\" integrity=\"sha512-Ydyj0LLrJGMf7yUSU+QxZE4Pu/jVIutpdTOAozUrzZMslo+vLMX64rghLxEs+AKpN+GmnVNgXoeLlMwSqtyjPw==\" crossorigin=\"anonymous\" />";
	document.getElementsByTagName("head")[0].appendChild(link);
} injector();