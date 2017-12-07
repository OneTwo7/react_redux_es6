import React, { Component } from 'react';
import { Route, withRouter } from 'react-router';
import { connect } from 'react-redux';
import Header from './common/Header';
import HomePage from './home/HomePage';
import AboutPage from './about/AboutPage';
import CoursesPage from './course/CoursesPage';
import ManageCoursePage from './course/ManageCoursePage'; // eslint-disable-line import/no-named-as-default
import PropTypes from 'prop-types';

class App extends Component {
  render () {
    return (
      <div className="container-fluid">
        <Header loading={this.props.loading} />
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/courses" component={CoursesPage} />
        <Route exact path="/course" component={ManageCoursePage} />
        <Route exact path="/course/:id" component={ManageCoursePage} />
      </div>
    );
  }
}

App.propTypes = {
  loading: PropTypes.bool.isRequired
};

function mapStateToProps (state) {
  return {
    loading: state.ajaxCallsInProgress > 0
  };
}

export default withRouter(connect(mapStateToProps)(App));
