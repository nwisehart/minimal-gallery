
var file_path = window.location.pathname;
var dist_path = file_path.slice(0, file_path.lastIndexOf("/"));
var application_path = dist_path.slice(0, dist_path.lastIndexOf("/"));
var template_apps_path = application_path.slice(0, application_path.lastIndexOf("/"));

dojoConfig = {
  async: true,
  packages: [
    {
      name: "esriApplicationBase",
      location: template_apps_path + "/node_modules/@esri/application-base-js"
    },
    {
      name: "config",
      location: dist_path + "/config"
    }
  ]
};
if (location.search.match(/locale=([\w-]+)/)) {
  dojoConfig.locale = RegExp.$1;
}
