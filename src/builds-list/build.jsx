'use strict';
var React = require('react');
var moment = require('moment');
var cx = require('classnames');
var {Paper, IconButton, FontIcon, Toolbar, ToolbarGroup} = require('material-ui');

var BuildsListView = React.createClass({
  handleOnClick() {
    if (this.props.onToggle) {
      this.props.onToggle(!this.props.isOpen);
    }
  },

  handleReplayClick(e) {
    e.stopPropagation();
    if (this.props.onReplay) {
      this.props.onReplay(this.props.build);
    }
  },

  render() {
    var build = this.props.build;

    var status = cx({
      'good': build.state === 'SUCCESS',
      'error': build.state === 'FAILURE',
      'notice': !build.state || build.state === 'BUILDING' || build.state === 'RETRYING'
    });

    var icon = cx(status, 'mdi', {
      'mdi-check': build.state === 'SUCCESS',
      'mdi-alert-circle': build.state === 'FAILURE',
      'mdi-timelapse': build.state === 'BUILDING',
      'mdi-history': build.state === 'RETRYING',
      'mdi-timer': !build.state || build.state === 'WAITING'
    });

    var mountUrl = 'http://xyz.softhouse.se/' + (build.endpoint || '');
    var mountPoint =
      build.isSuccessful ?
      (
        <span>&nbsp;mounted at <a href={mountUrl}>{mountUrl}</a></span>
      ) :
      null;

    var messageClass = 'code' + (!build.isSuccessful ? ' error' : '');

    return (
      <Paper onClick={this.handleOnClick} zDepth={this.props.isOpen ? 3 : 1} className="build">
        <Toolbar>
          <ToolbarGroup key={0} float="left">
            <FontIcon className={icon} />
            <span className={status}>
              <strong>&nbsp;{build.state || 'WAITING'}</strong>
            </span>
            <span className="mui-toolbar-title">
              <a href={build.repo}>{build.fullName}</a>
              {mountPoint}
            </span>
          </ToolbarGroup>
          <ToolbarGroup key={1} float="right">
            <span className="mui-toolbar-title discrete">{build.buildAt ? 'built ' + moment(build.buildAt).format('D/M-YY, H:mm:ss') : null}</span>
            {build.nrOfAttempts ? <FontIcon className="mdi mdi-replay" onClick={this.handleReplayClick} /> : null}
            <span className="mui-toolbar-title">&nbsp;</span>
          </ToolbarGroup>
        </Toolbar>
        {this.props.isOpen ? <pre className={messageClass}>{build.message}</pre> : null}
      </Paper>
    );
  }
});

module.exports = BuildsListView;
