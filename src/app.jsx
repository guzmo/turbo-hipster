'use strict';
var React = require('react');
var {RouteHandler, Navigation, State} = require('react-router');
var {AppCanvas, AppBar, LeftNav, MenuItem} = require('material-ui');

var menuItems = [
  {type: MenuItem.Types.LINK, payload: 'http://xyz.softhouse.se', text: 'XYZ'},
  {type: MenuItem.Types.LINK, payload: 'http://softhouse.se', text: 'Softhouse'}
];

var timer = null;

var App = React.createClass({
  mixins: [Navigation, State],

  render() {
    var header = (
      <div className="nav-header" onClick={this.onHeaderClick}>
        Builds
      </div>
    );

    return (
      <AppCanvas predefinedLayout={1}>
        <AppBar title="Builds"
                className="mui-dark-theme"
                onMenuIconButtonTouchTap={this.onMenuToggle} />

        <LeftNav ref="appNav"
                 header={header}
                 docked={false}
                 isInitiallyOpen={false}
                 menuItems={menuItems}
                 onChange={this.onLeftNavChange} />

        <RouteHandler />
      </AppCanvas>
    );
  },

  onLeftNavChange(e, key, payload) {
    this.transitionTo(payload.route);
  },

  onMenuToggle() {
    this.refs.appNav.toggle();
  },

  onHeaderClick() {
    this.transitionTo('root');
    this.refs.appNav.close();
  }

});

module.exports = App;
