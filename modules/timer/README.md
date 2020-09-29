# timer-dimmer-notification

https://github.com/hangorazvan/timer

MagicMirror 2 Notification alert & timer trigger for my own use on iPad3

Set in config.js without position and is working in background.
All settings inside of module or in config.js

	{
		module: "timer",
		config: {
			bodysize: 1080,		// Minimum window width
			nightMode: true,	// zoomed night mode for iPad 3

			sharpMode: true,	// hourly alert notification
			dateMode: true,		// specific date hourly custom notification
			fadeMode: true,		// fade to dimmed mode over night and back in the morning
			dimmMode: true,		// dimmed mode over night
			dimming: 40,		// 0 = opacity 1, 100 = opacity 0, 40 = opacity 0.6

			name1: "",		// Wife or girlfriend name
			birthday1: "",		// day & month
			name2: "",		// Husband or boyfriend name
			birthday2: "",		// day & month
			name3: "",		// Child or pet name
			birthday3: "",		// day & month

			debugging: false 	// midnight for custom timer start
			}
	},
