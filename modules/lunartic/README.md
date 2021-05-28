## Lunartic

First, you have three choices of images to accompany the data.

* A rather impressive animation of the night moon, with clouds rolling by
* Updating minutely, an image of the actual appearance of the current moon
* A static image of all the phases of the moon

* No API key needed! (It's my API) No dependencies needed! No kidding!


## Config.js entry and options

    {
            disabled: false,
            module: 'lunartic',
            position: 'bottom_center', 			// Best in left, center, or right regions
            config: {
                mode: "rotating", 			// rotating or static
                image: "current", 			// animation, current, DayNight or static
                distance: "miles", 			// miles or km
                useHeader: false, 			// true if you want a header
		sounds: "no", 				// for wolf howls, only on a full moon
                header: "The Lunartic is in my head", 	// Any text you want
                maxWidth: "300px",
                animationSpeed: 0,
                rotateInterval: 15000,
            }
        },
	
