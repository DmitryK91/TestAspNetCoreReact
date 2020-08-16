import React from 'react';
import { Route, Switch } from 'react-router';

import Page from './components/page';


const Routes = () => (

    <Switch>

        <Route path={`/:page([0-9]+)?`}>
            <Page />
        </Route>

    </Switch>

);

export default Routes;
