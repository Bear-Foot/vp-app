import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Providers } from './Providers';
import registerServiceWorker from './registerServiceWorker';

import './socket'

ReactDOM.render(<Providers />, document.getElementById('root'));
registerServiceWorker();
