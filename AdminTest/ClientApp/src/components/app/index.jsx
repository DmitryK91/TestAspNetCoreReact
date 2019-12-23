import React from 'react';

import { Router } from 'react-router-dom';

import Routes from '../../routes';
import { history } from '../../utils';

import '../../css/App.css';


const App = () => (
    <Router history={history}>
        <Routes />
    </Router >
);

export default App;
