var widgets = require('@jupyter-widgets/base');
// var _ = require('lodash');


// Custom Model. Custom widgets models must at least provide default values
// for model attributes, including
//
//  - `_view_name`
//  - `_view_module`
//  - `_view_module_version`
//
//  - `_model_name`
//  - `_model_module`
//  - `_model_module_version`
//
//  when different from the base class.

// When serialiazing the entire widget state for embedding, only values that
// differ from the defaults will be specified.
var IntervalModel = widgets.DOMWidgetModel.extend({
    defaults: _.extend(widgets.DOMWidgetModel.prototype.defaults(), {
        _model_name : 'IntervalModel',
        _view_name : 'IntervalView',
        _model_module : 'jupyter-interval-widget',
        _view_module : 'jupyter-interval-widget',
        _model_module_version : '0.1.0',
        _view_module_version : '0.1.0',
        value : 1000
    })
});


// Custom View. Renders the widget model.
var IntervalView = widgets.DOMWidgetView.extend({
    render: function() {
        this.value_changed();
        this.model.on('change:value', this.value_changed, this);

        var model = this.model;
        var that = this;

        that.on("remove", function(e){
            clearInterval(that.interval);
        }, this);
    },

    value_changed: function() {
        var that = this;
        var value = this.model.get('value');

        clearInterval(this.interval);

        if (value){
            this.interval = setInterval(function() {
                that.send({event: 'tick'});
            }, value);
        }
    },

});


module.exports = {
    IntervalModel : IntervalModel,
    IntervalView : IntervalView
};
