# notification

https://github.com/hangorazvan/notification

MagicMirror 2 Notification receiver, dimmer, alert & timer trigger for my own use on iPad3, 
because the default alert module is full of shit!
This module is no longer maintained, will not have any improvements or bug fixes.

All settings inside of module or in config.js

	{
		module: "notification",
		position: "top_center",
		config: {
			startTitle: "<i class=\"lime fa fa-wifi\"></i> [ MagicMirror&sup2; ] &nbsp;",
			startNotification: "Modular smart mirror platform",
			title: null,
			notification: null,
			timer: 8000,
			animationSpeed: 1000,
		}
	}	
	{
		module: "notification/timer",
		config: {
			name1: "",		// Wife or girlfriend name
			birthday1: "",		// day & month
			name2: "",		// Husband or boyfriend name
			birthday2: "",		// day & month
			name3: "",		// Child or pet name
			birthday3: "",		// day & month,

			bodysize: 1080,		// Minimum window width
			nightMode: true,	// zoomed night mode for iPad 3
			background: false,
			monochrome: false,
			resetMM: true,

			fadeMode: true,		// fade to dimmed mode over night and back in the morning
			dimmMode: true,		// dimmed mode over night
			dimming: 40,		// 0 = opacity 1, 100 = opacity 0, 40 = opacity 0.6

			sharpMode: true,	// hourly alert notification
			dateMode: true,		// specific date hourly custom notification

			debugging: false 	// midnight for custom timer start
			}
	},

	Designed by Răzvan Cristea https://github.com/hangorazvan Creative Commons BY-NC-SA 4.0, Romania.
