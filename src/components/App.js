import React, { Component } from 'react';
import { Route } from 'react-router';
import Header from './common/Header';
import HomePage from './home/HomePage';
import AboutPage from './about/AboutPage';
import CoursesPage from './course/CoursesPage';

class App extends Component {
  render () {
    return (
      <div className="container-fluid">
        <Header />
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/courses" component={CoursesPage} />
      </div>
    );
  }
}

export default App;
