/* Magic Mirror
 *
 * Injector
 * MIT Licensed.
 *
 * Redesigned by Răzvan Cristea
 * for iPad 3 & HD display
 * https://github.com/hangorazvan
 */

function injector() {
	var meta = document.createElement("meta");
	document.head.innerHTML += "<meta http-equiv=\"Copyright\" content=" + new Date().getFullYear() + ">"
		+ "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=yes, user-scalable=no\">"
		+ "<meta name=\"Keywords\" content=\"magic,smart,mirror,modular,core,framework,open,source,platform,dash,info,board,web,project,html,css,javascript,ipad,dak\">"
		+ "<meta name=\"Author\" content=\"Personal webpage redesigned for iPad 3 by Răzvan Cristea. Creative Commons license BY-NC-SA 4.0, International / Romania.\">"
		+ "<meta name=\"Description\" content=\"Webpage based on open source modular smart mirror platform core framework without node server. Without any donation!\">"
		+ "<meta name=\"Project\" content=\"No fucking Retardberry Pipi and pointless local shit or any other wierd linux software from stupid so-called developers.\">";
	document.getElementsByTagName("head")[0].appendChild(meta);
} injector();