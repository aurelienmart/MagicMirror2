# notification

https://github.com/hangorazvan/timer/tree/notification

MagicMirror 2 Notification receiver for my own use on iPad3, because the default alert module is full of shit!

Working with timer in background.
All settings inside of module or in config.js

	{
		module: "notification",
		position: "top_center",
		config: {
			startTitle: "<i class=\"lime fa fa-wifi\"></i> [ MagicMirror&sup2; ] &nbsp;",
			startNotification: "Modular smart mirror platform",
			title: null,
			notification: null,
			timer: 5000,
			animationSpeed: config.animation
			}
	},