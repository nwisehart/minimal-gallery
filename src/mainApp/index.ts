import * as ApplicationBase from "../applicationBase/ApplicationBase";

import MainApp from "./Widget";

export = (applicationConfigJSON: string, boilerplateConfigJSON: string, i18n: any) => {
    const config = JSON.parse(applicationConfigJSON);
    const settings = JSON.parse(boilerplateConfigJSON);

    // Inject custom stylesheet if provided
    if (config.customCSS && config.customCSS !== "") {
        const customStyle = document.createElement("style");
        customStyle.innerHTML = config.customCSS;
        document.body.appendChild(customStyle);
    }

    const boilerplate = new ApplicationBase({ config, settings });
    const MainComponent = new MainApp({ boilerplate, i18n });
    MainComponent.container = "viewDiv";
};
