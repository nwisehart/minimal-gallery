{
	"configurationSettings": [
		{
			"category": "<b>General</b>",
			"fields": [
				{
					"type": "group",
					"label": "Select a group",
					"tooltip": "Group displayed in the application"
				},
				{
					"type": "conditional",
					"condition": false,
					"fieldName": "showHeader",
					"label": "Show Application Header",
					"items": [
						{
							"type": "string",
							"fieldName": "headerText",
							"label": "Application title",
							"tooltip": "Title displays in application header"
						},
						{
							"type": "string",
							"fieldName": "headerTextURL",
							"label": "Header title Url",
							"tooltip": "A location for the gallery title to link to"
						}
					]
				}
			]
		},
		{
			"category": "<b>Theme</b>",
			"fields": [
				{
					"label": "Header text color",
					"tooltip": "Set header text color",
					"type": "color",
					"sharedThemeProperty": "header.text",
					"fieldName": "headerTextColor"
				},
				{
					"label": "Header background color",
					"fieldName": "headColor",
					"type": "color",
					"tooltip": "Color of header bar",
					"sharedThemeProperty": "header.background"
				},
				{
					"label": "Body text color",
					"tooltip": "Set body text color",
					"type": "color",
					"sharedThemeProperty": "body.text",
					"fieldName": "fontColor"
				},
				{
					"label": "Body Background color",
					"tooltip": "The background color of the gallery",
					"type": "color",
					"sharedThemeProperty": "body.background",
					"fieldName": "bgColor"
				},
				{
					"label": "Button Background Color",
					"fieldName": "buttonBgColor",
					"type": "color",
					"sharedThemeProperty": "button.background",
					"tooltip": "The background color for buttons on the page (including the icons at the bottom right of each card, and the gallery pagination controls)."
				},
				{
					"label": "Button Text Color",
					"fieldName": "buttonTextColor",
					"type": "color",
					"sharedThemeProperty": "button.text",
					"tooltip": "The color for text appearing on buttons in the gallery."
				},
				{
					"label": "Link Text Color",
					"fieldName": "linkColor",
					"type": "color",
					"sharedThemeProperty": "body.link",
					"tooltip": "The color for links on the page."
				},
				{
					"label": "Button Text Color",
					"fieldName": "buttonTextColor",
					"type": "color",
					"sharedThemeProperty": "button.text",
					"tooltip": "The color for text appearing on buttons in the gallery."
				},
				{
					"type": "conditional",
					"condition": false,
					"fieldName": "headerImage",
					"label": "Show Header Logo",
					"items": [
						{
							"type": "string",
							"fieldName": "headerImageLocation",
							"label": "Logo URL",
							"sharedThemeProperty": "logo.small",
							"tooltip": "The URL for the image to be displayed next to the gallery title."
						}
					]
				},
				{
					"type": "subcategory",
					"label": "Card Colors"
				},
				{
					"label": "Card Background Color",
					"fieldName": "cardColor",
					"type": "color",
					"tooltip": "The background color of the cards shown in the gallery for each item."
				},
				{
					"label": "Web App Caption color",
					"fieldName": "appCaptionColor",
					"type": "color",
					"tooltip": "The color of the card caption for the 'Web Mapping Application' item type."
				},
				{
					"label": "Map Caption Color",
					"fieldName": "mapCaptionColor",
					"type": "color",
					"tooltip": "The color of the card caption for the 'Web Map' item type."
				},
				{
					"label": "Scene Caption Color",
					"fieldName": "sceneCaptionColor",
					"type": "color",
					"tooltip": "The color of the card caption for the 'Web Scene' item type."
				},
				{
					"label": "Caption Font Color",
					"fieldName": "captionFontColor",
					"type": "color",
					"tooltip": "The color of the text displaying the item type in the card caption."
				}
			]
		},
		{
			"category": "<b>Options</b>",
			"fields": [
				{
					"type": "subcategory",
					"label": "Gallery settings"
				},
				{
					"type": "conditional",
					"condition": false,
					"fieldName": "headerSearch",
					"label": "Enable Header Search",
					"items": [
						{
							"type": "string",
							"fieldName": "searchPlaceholder",
							"label": "Placeholder Text",
							"tooltip": "The text shown in the search input when nothing has been entered"
						}
					]
				},
				{
					"type": "conditional",
					"condition": false,
					"fieldName": "showAgolLink",
					"label": "Display a link to ArcGIS Org",
					"tooltip": "Boolean controlling whether or not the display a link to ArcGIS Online (or a custom URL) next to the gallery title.",
					"items": [
						{
							"type": "string",
							"fieldName": "agolLinkText",
							"label": "Link Text",
							"tooltip": "The text displayed for the link to ArcGIS Online (or custom URL)"
						},
						{
							"type": "string",
							"fieldName": "agolLinkLocation",
							"label": "ArcGIS Link URL",
							"tooltip": "The URL for the link displayed next to the gallery title."
						}
					]
				},
				{
					"label": "Show owner of each item",
					"fieldName": "showAuthor",
					"type": "boolean",
					"tooltip": "Controls whether or not the author will be shown under the item title of each gallery card"
				},
				{
					"label": "Show item type label",
					"fieldName": "showItemType",
					"type": "boolean",
					"tooltip": "Controls whether or not the item type label will be shown on each gallery card"
				},
				{
					"label": "Define number of items per page",
					"fieldName": "itemsPerPage",
					"type": "string",
					"tooltip": "Controls The number of items to display per gallery page"
				},
				{
					"label": "Sort gallery items by",
					"fieldName": "sortField",
					"type": "string",
					"options": [
						{
							"label": "Modified Date",
							"value": "modified"
						},
						{
							"label": "Number of Views",
							"value": "numViews"
						},
						{
							"label": "Name",
							"value": "title"
						}
					],
					"tooltip": "Default sort method for gallery contents"
				},
				{
					"label": "Gallery items order",
					"fieldName": "sortOrder",
					"type": "string",
					"options": [
						{
							"label": "Descending",
							"value": "desc"
						},
						{
							"label": "Ascending",
							"value": "asc"
						}
					],
					"tooltip": "Sorting order of gallery contents"
				},
				{
					"type": "subcategory",
					"label": "Map viewer settings"
				},
				{
					"label": "Compass placement",
					"fieldName": "compassWidget",
					"type": "string",
					"options": [
						{
							"label": "Top Left",
							"value": "top-left"
						},
						{
							"label": "Top Right",
							"value": "top-right"
						},
						{
							"label": "Bottom Right",
							"value": "bottom-right"
						},
						{
							"label": "Bottom Left",
							"value": "bottom-left"
						}
					],
					"tooltip": "Controls the placement of a Compass widget on gallery-embedded or fullscreen maps and scenes."
				},
				{
					"label": "Home Button placement",
					"fieldName": "homeWidget",
					"type": "string",
					"options": [
						{
							"label": "Top Left",
							"value": "top-left"
						},
						{
							"label": "Top Right",
							"value": "top-right"
						},
						{
							"label": "Bottom Right",
							"value": "bottom-right"
						},
						{
							"label": "Bottom Left",
							"value": "bottom-left"
						}
					],
					"tooltip": "Controls the placement of a Home button on gallery-embedded or fullscreen maps and scenes."
				},
				{
					"label": "Legend placement",
					"fieldName": "legendWidget",
					"type": "string",
					"options": [
						{
							"label": "Top Left",
							"value": "top-left"
						},
						{
							"label": "Top Right",
							"value": "top-right"
						},
						{
							"label": "Bottom Right",
							"value": "bottom-right"
						},
						{
							"label": "Bottom Left",
							"value": "bottom-left"
						}
					],
					"tooltip": "Controls the placement of a Legend on gallery-embedded or fullscreen maps and scenes."
				},
				{
					"label": "Locate Button placement",
					"fieldName": "locateWidget",
					"type": "string",
					"options": [
						{
							"label": "Top Left",
							"value": "top-left"
						},
						{
							"label": "Top Right",
							"value": "top-right"
						},
						{
							"label": "Bottom Right",
							"value": "bottom-right"
						},
						{
							"label": "Bottom Left",
							"value": "bottom-left"
						}
					],
					"tooltip": "Controls the placement of a Locate button on gallery-embedded or fullscreen maps and scenes."
				},
				{
					"label": "Search widget placement",
					"fieldName": "searchWidget",
					"type": "string",
					"options": [
						{
							"label": "Top Left",
							"value": "top-left"
						},
						{
							"label": "Top Right",
							"value": "top-right"
						},
						{
							"label": "Bottom Right",
							"value": "bottom-right"
						},
						{
							"label": "Bottom Left",
							"value": "bottom-left"
						}
					],
					"tooltip": "Controls the placement of a Search Widget on gallery-embedded or fullscreen maps and scenes."
				},
				{
					"label": "Default search address",
					"fieldName": "locatorDefaultAddress",
					"type": "string",
					"tooltip": "Default address for the map search in the Simple Viewer"
				},
				{
					"label": "Zoom level for selected search results",
					"fieldName": "zoomLevel",
					"type": "number",
					"tooltip": "Map zoom level for viewing selected features"
				},
				{
					"label": "Basemap group",
					"fieldName": "basemapGroupTitle",
					"type": "string",
					"tooltip": "Name of a public group containing basemaps, or leave blank to use the organization's basemap group",
					"placeholder": "Default organization basemaps"
				},
				{
					"label": "Basemap group owner",
					"fieldName": "basemapGroupOwner",
					"type": "string",
					"tooltip": "Username of basemap group owner",
					"placeholder": "Default organization basemaps"
				}
			]
		}
	],
	"values": {
		"bgColor": "#ffffff",
		"cardColor": "#ffffff",
		"appCaptionColor": "#292b2c",
		"mapCaptionColor": "#0275d8",
		"sceneCaptionColor": "#5cb85c",
		"captionTextColor": "#ffffff",
		"fontColor": "#000000",
		"headColor": "#ffffff",
		"linkColor": "#0079c1",
		"buttonBgColor": "#0079c1",
		"buttonTextColor": "#ffffff",
		"showAuthor": true,
		"sortOrder": "asc",
		"sortField": "title",
		"showHeader": true,
		"showItemType": true,
		"headerText": "Group Gallery",
		"headerTextURL": "http://www.esri.com/",
		"headerImage": true,
		"headerImageLocation": "http://www.arcgis.com/sharing/rest/community/groups/db0e225e408c4ecea055088cd4d09b84/info/Screenshot_2015-10-28_09.36.16.png",
		"headerSearch": true,
		"searchPlaceholder": "Search",
		"showAgolLink": true,
		"agolLinkText": "View on ArcGIS Online",
		"agolLinkLocation": "http://www.arcgis.com/home/group.html?id=${GROUP_ID}",
		"itemsPerPage": 20,
		"compassWidget": "",
		"homeWidget": "top-left",
		"legendWidget": "bottom-right",
		"locateWidget": "top-left",
		"searchWidget": "bottom-left"
	}
}