'use strict';
var React = require('react');
var Router = require('react-router');
var api = require('./api');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

require("react-tap-event-plugin")();

var AppView = require('./app.jsx');
var BuildsListView = require('./builds-list/index.jsx');

var routes = (
  <Route name="root" path="/" handler={AppView}>
    <DefaultRoute handler={BuildsListView} />
  </Route>
);

Router.run(routes, (Handler) => React.render(<Handler />, document.body));

// Refresh builds each 5 seconds:
var fetchBuilds = () => api.getBuilds();
setInterval(fetchBuilds, 5000);
// And at first load:
fetchBuilds();
