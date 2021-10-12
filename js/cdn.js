/* Magic Mirror
 *
 * CDN loader
 * MIT Licensed.
 *
 * Redesigned by Răzvan Cristea
 * for iPad 3 & HD display
 * https://github.com/hangorazvan
 */
function LoadScripts(async) {
	if (async === undefined) {
		async = false;
	}
	var scripts = [];
	var _scripts = [
			"http://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js",
        //  "http://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.1.0/js/bootstrap.bundle.min.js",
			"http://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment-with-locales.min.js",
			"http://cdnjs.cloudflare.com/ajax/libs/moment-timezone/0.5.33/moment-timezone-with-data.min.js",
			"http://cdnjs.cloudflare.com/ajax/libs/suncalc/1.8.0/suncalc.min.js",
			"http://cdnjs.cloudflare.com/ajax/libs/nunjucks/3.0.1/nunjucks.min.js"
		];
	if (async) {
		LoadScriptsAsync(_scripts, scripts);
	} else {
		LoadScriptsSync(_scripts, scripts);
	}
}

function LoadScriptsSync(_scripts, scripts) {
	var x = 0;
	var loopArray = function(_scripts, scripts) {
		loadScript(_scripts[x], scripts[x], function() {
			x++; if (x < _scripts.length) {
				loopArray(_scripts, scripts);   
			}
		}); 
	};
	loopArray(_scripts, scripts);	  
}

function LoadScriptsAsync(_scripts, scripts) {
	for (var i = 0; i < _scripts.length; i++) {
		loadScript(_scripts[i], scripts[i], function() {});
	}
}

function loadScript(src, script, callback) {
	script = document.createElement("script");
	script.onload = function() {
		callback();
	};
	script.src = src;
	document.getElementsByTagName("head")[0].appendChild(script);
}

LoadScripts();