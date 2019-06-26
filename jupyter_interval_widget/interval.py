import ipywidgets as widgets
from traitlets import Unicode, Int

@widgets.register
class Interval(widgets.DOMWidget):
    """An interval widget."""
    _view_name = Unicode('IntervalView').tag(sync=True)
    _model_name = Unicode('IntervalModel').tag(sync=True)
    _view_module = Unicode('jupyter-interval-widget').tag(sync=True)
    _model_module = Unicode('jupyter-interval-widget').tag(sync=True)
    _view_module_version = Unicode('^0.1.0').tag(sync=True)
    _model_module_version = Unicode('^0.1.0').tag(sync=True)
    value = Int(1000, allow_none=True).tag(sync=True)

    def __init__(self, **kwargs):
        super(Interval, self).__init__(**kwargs)
        self._tick_handlers = widgets.CallbackDispatcher()
        self.on_msg(self._handle_msg)

    def _handle_msg(self, msg):
        if msg.get("content", {}) \
              .get("data", {}) \
              .get("content", {}) \
              .get("event", "") == "tick":
            self.tick()

    def on_tick(self, callback, remove=False):
        """Register a callback to execute repeatedly whenever the specified timer interval has elapsed.
        The callback will be called with one argument, the interval widget instance.
        Parameters
        ----------
        remove: bool (optional)
            Set to true to remove the callback from the list of callbacks.
        """
        self._tick_handlers.register_callback(callback, remove=remove)

    def tick(self):
        """Programmatically trigger a tick event.
        This will call the callbacks registered to the
        widget instance.
        """
        self._tick_handlers(self)
