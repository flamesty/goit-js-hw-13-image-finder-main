import '@pnotify/core/dist/PNotify.css';
import 'material-design-icons/iconfont/material-icons.css';
import '@pnotify/core/dist/Material.css';
import { notice, defaults } from '@pnotify/core';

defaults.styling = 'material';
defaults.icons = 'material';
defaults.delay = '1500';

export default notice;