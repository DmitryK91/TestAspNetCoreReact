import React from 'react';
import { Route, Switch } from 'react-router';

import Table from './components/table';


const Routes = () => (

    <Switch>

        <Route exact
            path={`/:page([0-9]+)?`}
            component={Table} />

    </Switch>

);

export default Routes;
