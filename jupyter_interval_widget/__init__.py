from ._version import version_info, __version__

from .interval import *

def _jupyter_nbextension_paths():
    return [{
        'section': 'notebook',
        'src': 'static',
        'dest': 'jupyter-interval-widget',
        'require': 'jupyter-interval-widget/extension'
    }]
