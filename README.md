# Embedded Group Gallery Application

This is a group gallery built with the Esri [ArcGIS API for JavaScript v4.3](https://developers.arcgis.com/javascript/) and the Esri [Application-Base](https://github.com/Esri/application-base-js)

## Configuration

`dist/config/application.json` contains settings that may be altered to change the appearance and behavior of the application. The configurable options included with this application (in addition to the existing boilerplate options) are as follows:

- `"bgColor"`: The background color of the gallery
- `"cardColor"`: The background color of the cards shown in the gallery for each item
- `"appCaptionColor"`: The color of the card caption for the 'Web Mapping Application' item type
- `"mapCaptionColor"`: The color of the card caption for the 'Web Map' item type
- `"sceneCaptionColor"`: The color of the card caption for the 'Web Scene' item type
- `"captionFontColor"`: The color of the text displaying the item type in the card caption
- `"fontColor"`: The color of fonts on the page
- `"headColor"`: The background color for the page header
- `"linkColor"`: The color for links on the page
- `"buttonBgColor"`: The background color for buttons on the page (including the icons at the bottom right of each card, and the gallery pagination controls)
- `"buttonTextColor"`: The color for text appearing on buttons in the gallery
- `"showAuthor"`: Controls whether or not the author will be shown under the item title of each gallery card
- `"sortOrder"`: Controls how items will be sorted in the gallery
- `"sortField"`: The field by which items will be sorted in the gallery
- `"showHeader"`: A boolean (true/false) value controlling whether or not the header will be displayed
- `"showItemType"`: A boolean (true/false) value controlling whether or not item types will be displayed for each gallery item
- `"headerText"`: The gallery title shown in the header
- `"headerTextURL"`: A location for the gallery title to link to
- `"headerImage"`: Boolean value controlling whether or not an image will be displayed next to the gallery title
- `"headerImageLocation"`: The URL for the image to be displayed next to the gallery title
- `"headerSearch"`: Boolean controlling whether or not to display the search input in the header
- `"searchPlaceholder"`: The text shown in the search input when nothing has been entered
- `"showAgolLink"`: Boolean controlling whether or not the display a link to ArcGIS Online (or a custom URL) next to the gallery title
- `"agolLinkText"`: The text displayed for the link to ArcGIS Online (or custom URL)
- `"agolLinkLocation"`: The URL for the link displayed next to the gallery title. *`${GROUP_ID}` will be replaced dynamically with the ID of the group whose items are being displayed in the gallery*
- `"itemsPerPage"`: The number of items to display per gallery page
- `"compassWidget"`: Controls the rendering of a [Compass](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Compass.html) widget on gallery-embedded or fullscreen maps and scenes
- `"homeWidget"`: Controls the rendering of a [Home](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Home.html) widget on gallery-embedded or fullscreen maps and scenes
- `"legendWidget"`: Controls the rendering of a [Legend](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Legend.html) widget on gallery-embedded or fullscreen maps and scenes
- `"locateWidget"`: Controls the rendering of a [Locate](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Locate.html) widget on gallery-embedded or fullscreen maps and scenes
- `"searchWidget"`: Controls the rendering of a [Search](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html) widget on gallery-embedded or fullscreen maps and scenes

*For the widget options, setting to an empty string or null will disable the widget. Setting to `"top-left"`, `"top-right"`, `"bottom-right"` or `"bottom-left"` will render the widget in the corresponding position of the map.*


## Development

If you wish to build additional functionality into the application, a test server, development dependencies, unit tests, and convenient npm scripts are available in this repository. First, clone the repository and install the dependencies using `npm install` or `npm i`.

Once the operation is complete, `npm start` will start a test server on `localhost:5555` serving the `/dist/` directory. It will also watch the `/src/` directory for changes to the source typescript files, and transpile them to javascript in the `/dist/` directory on the fly.

You can also run the test suite with `npm test`.

## Deployment

When ready to deploy the application, serve the contents of the `/dist/` directory from your web server.