{
    "configurationSettings": [{
        "category": "App",
        "fields": [{
            "type": "group",
            "label": "Select a group"
        }, {
            "type": "conditional",
            "fieldName": "showHeader",
            "condition": false,
            "label": "Display app header",
            "items": [{
                "type": "string",
                "fieldName": "headerText",
                "placeHolder": "Group Gallery",
                "label": "Title"
            }, {
                "type": "string",
                "fieldName": "headerTextUrl",
                "label": "Header text link"
            }, {
                "type": "conditional",
                "fieldName": "headerImage",
                "condition": false,
                "items": [{
                    "type": "string",
                    "fieldName": "headerImageLocation",
                    "label": "Url to logo image"
                }]
            }, {
                "type": "conditional",
                "fieldName": "headerSearch",
                "label": "Display search",
                "condition": false,
                "items": [{
                    "type": "string",
                    "fieldName": "searchPlaceholder",
                    "label": "Placeholder text"
                }]
            }, {
                "type": "conditional",
                "condition": false,
                "fieldName": "showAgolLink",
                "label": "Show optional link",
                "items": [{
                    "type": "string",
                    "fieldName": "agolLinkText",
                    "label": "Link text"
                }, {
                    "type": "string",
                    "fieldName": "agolLinkLocation",
                    "label": "Link url "
                }]
            }]
        }]
    }, {
        "category": "Gallery",
        "fields": [{
            "type": "number",
            "fieldName": "itemsPerPage",
            "label": "Items per page",
            "tooltip": "Default is 20"
        }, {
            "type": "boolean",
            "label": "Show item author",
            "fieldName": "showAuthor"
        }]
    }, {
        "category": "Map",
        "fields": [{
            "type": "options",
            "fieldName": "compassWidget",
            "label": "Compass",
            "options": [{
                "label": "top-right",
                "value": "top-right"
            }, {
                "label": "top-left",
                "value": "top-left"
            }, {
                "label": "bottom-right",
                "value": "bottom-right"
            }, {
                "label": "bottom-left",
                "value": "bottom-left"
            }, {
                "label": "Not displayed",
                "value": ""
            }]
        }, {
            "type": "options",
            "fieldName": "homeWidget",
            "label": "Home extent",
            "options": [{
                "label": "top-right",
                "value": "top-right"
            }, {
                "label": "top-left",
                "value": "top-left"
            }, {
                "label": "bottom-right",
                "value": "bottom-right"
            }, {
                "label": "bottom-left",
                "value": "bottom-left"
            }, {
                "label": "Not displayed",
                "value": ""
            }]
        }, {
            "type": "options",
            "fieldName": "legendWidget",
            "label": "Legend",
            "options": [{
                "label": "top-right",
                "value": "top-right"
            }, {
                "label": "top-left",
                "value": "top-left"
            }, {
                "label": "bottom-right",
                "value": "bottom-right"
            }, {
                "label": "bottom-left",
                "value": "bottom-left"
            }, {
                "label": "Not displayed",
                "value": ""
            }]
        }, {
            "type": "options",
            "fieldName": "locateWidget",
            "label": "Locate button",
            "options": [{
                "label": "top-right",
                "value": "top-right"
            }, {
                "label": "top-left",
                "value": "top-left"
            }, {
                "label": "bottom-right",
                "value": "bottom-right"
            }, {
                "label": "bottom-left",
                "value": "bottom-left"
            }, {
                "label": "Not displayed",
                "value": ""
            }]
        }, {
            "type": "options",
            "fieldName": "searchWidget",
            "label": "Search",
            "options": [{
                "label": "top-right",
                "value": "top-right"
            }, {
                "label": "top-left",
                "value": "top-left"
            }, {
                "label": "bottom-right",
                "value": "bottom-right"
            }, {
                "label": "bottom-left",
                "value": "bottom-left"
            }, {
                "label": "Not displayed",
                "value": ""
            }]
        }, {
            "type": "options",
            "fieldName": "compassWidget",
            "label": "Show compass",
            "options": [{
                "label": "top-right",
                "value": "top-right"
            }, {
                "label": "top-left",
                "value": "top-left"
            }, {
                "label": "bottom-right",
                "value": "bottom-right"
            }, {
                "label": "bottom-left",
                "value": "bottom-left"
            }, {
                "label": "Not displayed",
                "value": ""
            }]
        }]
    }, {
        "category": "Theme",
        "fields": [{
            "type": "color",
            "fieldName": "bgColor",
            "label": "Background color",
            "sharedThemeProperty": "body.background"
        }, {
            "type": "color",
            "fieldName": "cardColor",
            "label": "Card color "
        }, {
            "type": "color",
            "fieldName": "appCaptionColor",
            "label": "App caption color"
        }, {
            "type": "color",
            "fieldName": "mapCaptionColor",
            "label": "Map caption color"
        }, {
            "type": "color",
            "fieldName": "sceneCaptionColor",
            "label": "Scene caption color"
        }, {
            "type": "color",
            "fieldName": "captionTextColor",
            "label": "Caption text color"
        }, {
            "type": "color",
            "fieldName": "fontColor",
            "label": "Font color",
            "sharedThemeProperty": "body.text"
        }, {
            "type": "color",
            "fieldName": "headColor",
            "label": "Header color",
            "sharedThemeProperty": "header.background"
        }, {
            "type": "color",
            "fieldName": "linkColor",
            "label": "Link color",
            "sharedThemeProperty": "body.link"
        }, {
            "type": "color",
            "fieldName": "buttonBgColor",
            "label": "Button background color"
        }, {
            "type": "color",
            "fieldName": "buttonTextColor",
            "label": "Button text color"
        }]
    }],
    "values": {
        "showHeader": true,
        "headerSearch": true,
        "showAgolLink": true,
        "itemsPerPage": 20,
        "showAuthor": true,
        "compassWidget": "",
        "homeWidget": "top-left",
        "legendWidget": "bottom-right",
        "locateWidget": "top-left",
        "searchWidget": "bottom-left",
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
        "buttonTextColor": "#ffffff"
    }
}