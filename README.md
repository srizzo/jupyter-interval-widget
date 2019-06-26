Jupyter Interval Widget
===============================

Jupyter Notebook Widget to  continuously and asynchronously run code at specified time intervals.

- No python threads, triggered by javascript setInterval
- Stops when cell output is removed / widget is no longer rendered

Example
--------

Display current datetime, update every 1000ms:

```python
import ipywidgets as widgets
import datetime
from jupyter_interval_widget import Interval
from IPython.display import display, clear_output

output = widgets.Output()
def update_output(self):
    with output:
        clear_output(wait=True)
        display(str(datetime.datetime.now()))

interval = Interval(value=1000)
interval.on_tick(update_output)

widgets.HBox(children=(output, interval))
```

Installation
------------

To install use pip:

    $ pip install jupyter_interval_widget
    $ jupyter nbextension enable --py --sys-prefix jupyter_interval_widget


For a development installation (requires npm),

    $ git clone https://github.com/srizzo/jupyter-interval-widget.git
    $ cd jupyter-interval-widget
    $ pip install -e .
    $ jupyter nbextension install --py --symlink --sys-prefix jupyter_interval_widget
    $ jupyter nbextension enable --py --sys-prefix jupyter_interval_widget
