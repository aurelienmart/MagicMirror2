# Traffic

## Mapbox Access Token

1. Create an account at [Mapbox](https://account.mapbox.com/)
2. Copy the access token visible after account creation (go [here](https://account.mapbox.com/) if you don't see it)

## Styling

You can use a global `MagicMirror/css/custom.css` file to customize the styles for each line of traffic separately. Each line has its own class that should be used to apply styles:
  - `.traffic-firstline`
  - `.traffic-secondline`

For example, this css
```
.traffic-firstline {
  font-size: 40px;
  color: yellow;
}

.traffic-secondline {
  color: green;
}
```

## Required

See [here](https://support.google.com/maps/answer/18539)
for instructions on how to use Google Maps webpage/app to get coordinates for your origin/destination.

_Note: Google maps coordinates are `latitude,longitude`, but Mapbox uses `longitude,latitude` so be sure to reverse what you copy from Google._

| Option              | Description                                  | Type   | Example                   |
| ------------------- | -------------------------------------------- | ------ | ------------------------- |
| `accessToken`       | Mapbox access token                          | string | -                         |
| `originCoords`      | `longitude,latitude` of the origin location. | string | `'-84.504259,33.882107'` |
| `destinationCoords` | `longitude,latitude` of the origin location. | string | `'-84.504259,33.882107'` |

### Basic Options

| Option       | Description                                       | Type    | Default Value           | Supported Options    |
| ------------ | ------------------------------------------------- | ------- | ----------------------- | -------------------  |
| `mode`       | Change the module to cycling or walking.          | string  | `'driving'`             | `'walking' 'cycling'`|
| `language`   | Define the commute time language.                 | string  | `config.language`       | Any language string  |
| `interval`   | How often the traffic is updated in milliseconds. | integer | `300000`<br>(5 minutes) |                      |
| `showSymbol` | Whether to show the car symbol or not.            | boolean | true                    |                      |

### Translation/Display

Use these options to customize/translate the module's text.

_\*Note: See tokens below to see what tokens will be replaced with real values
in firstLine/secondLine._

| Option        | Description                                                                         | Type   | Default Value                           | Token Replacement  |
| ------------- | ----------------------------------------------------------------------------------- | ------ | --------------------------------------- | ------------------ |
| `loadingText` | The text used when loading the initial duration.                                    | string | `'Loading...'`                          | :x:                |
| `firstLine`   | The main line of the module                                                         | string | `'Current duration is {duration} mins'` | :heavy_check_mark: |
| `secondLine`  | The second line of the module, appears below the first line in smaller, dimmer text | string | `undefined`                             | :heavy_check_mark: |

#### Tokens

| Token        | Value                                         |
| ------------ | --------------------------------------------- |
| `{duration}` | The driving time returned from the mapbox API |

### Per Day/Time Customization

Using these options to hide the module when you're not using it will save API calls,
allowing you to have a shorter interval or more traffic modules without getting
rate limited.

| Option       | Description                                                              | Type       | Default                 |
| ------------ | ------------------------------------------------------------------------ | ---------- | ----------------------- |
| `days`       | Which days of the week to show the traffic module, with 0 being Sunday   | Array[int] | `[0, 1, 2, 3, 4, 5, 6]` |
| `hoursStart` | What time to begin showing the module on the days it shows, 24 hour time | String | `"00:00"`                 |
| `hoursEnd`   | What time to stop showing the module on the days it shows, 24 hour time  | String | `"23:59"`                 |

## Examples

### Simplest Config

```js
{
	module: "traffic",
	position: "top_left",
	config: {
		accessToken: "your_key_here",
		originCoords: "-84.398848,33.755165",
		destinationCoords: "-84.504259,33.88210",
	}
},
```


### Minimal Look

```js
{
	module: "traffic",
	position: "top_left",
	config: {
		accessToken: "your_key_here",
		originCoords: "-84.398848,33.755165",
		destinationCoords: "-84.504259,33.88210",
		showSymbol: false,
		firstLine: "{duration} mins"
	}
},
```


### Use both lines

```js
{
	module: "traffic",
	position: "top_left",
	config: {
		accessToken: "your_key_here",
		originCoords: "-84.398848,33.755165",
		destinationCoords: "-84.504259,33.88210",
		firstLine: "{duration} mins",
		secondLine: "Coffee Run"
	}
},
```


### Multiple Routes

```js
{
	module: "traffic",
	position: "top_left",
	config: {
		accessToken: "your_key_here",
		originCoords: "-84.398848,33.755165",
		destinationCoords: "-84.504259,33.88210",
		firstLine: "{duration} mins",
		secondLine: "Home To School",
	}
},
{
	module: "traffic",
	position: "top_left",
	config: {
		accessToken: "your_key_here",
		originCoords: "-84.398848,33.755165",
		destinationCoords: "-84.504259,33.88210",
		firstLine: "{duration} mins",
		secondLine: "Home To Work"
	}
},
```


### Per day customization

This setup would show one route for Monday, Wednesday, and Friday, and another for
Tuesday and Thursday. It would only show between 07:00 and 09:00 each day. It would
be completely hidden on weekends.

```js
{
	module: "traffic",
	position: "top_left",
	config: {
		accessToken: "your_key_here",
		originCoords: "-84.398848,33.755165",
		destinationCoords: "-84.504259,33.88210",
		firstLine: "{duration} mins",
		secondLine: "School",
		days: [0,2,4],
		hoursStart: "07:00",
		hoursEnd: "09:00"
	}
},
{
	module: "traffic",
	position: "top_left",
	config: {
		accessToken: "your_key_here",
		originCoords: "-84.398848,33.755165",
		destinationCoords: "-84.504259,33.88210",
		firstLine: "{duration} mins",
		secondLine: "Work",
		days: [1,3],
		hoursStart: "07:00",
		hoursEnd: "09:00"
	}
},
```

