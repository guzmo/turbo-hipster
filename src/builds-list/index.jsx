'use strict';
var React = require('react');
var moment = require('moment');
var Build = require('./build.jsx');
var state = require('../state');
var api = require('../api');

var BuildsListView = React.createClass({
  mixins: [state.mixin],

  cursors: {
    builds: ['builds'],
    selectedBuildId: ['selectedBuildId']
  },

  handleOnToggle(build, toggled) {
    state.set('selectedBuildId', toggled ? build._id : null);
  },

  handleOnReplay(build) {
    api.replayBuild(build);
  },

  render() {
    var builds = this.state.cursors.builds;

    builds.sort((a, b) => moment(b.createdAt).unix() - moment(a.createdAt).unix());

    return (
      <div className="mui-app-content-canvas">
        <div className="full-width-section">
          <h1 className="mui-font-style-headline">Builds</h1>
          {builds.map((build) => (
            <Build key={build._id}
                   onToggle={this.handleOnToggle.bind(this, build)}
                   onReplay={this.handleOnReplay}
                   build={build}
                   isOpen={build._id === this.state.cursors.selectedBuildId} />
          ))}
        </div>
      </div>
    );
  }
});

module.exports = BuildsListView;
