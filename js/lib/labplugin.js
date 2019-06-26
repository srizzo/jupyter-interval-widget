var plugin = require('./index');
var base = require('@jupyter-widgets/base');

module.exports = {
  id: 'jupyter-interval-widget',
  requires: [base.IJupyterWidgetRegistry],
  activate: function(app, widgets) {
      widgets.registerWidget({
          name: 'jupyter-interval-widget',
          version: plugin.version,
          exports: plugin
      });
  },
  autoStart: true
};

