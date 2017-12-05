import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CourseList from './CourseList';
import { Link } from 'react-router-dom';

class CoursesPage extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    const { courses } = this.props;

    return (
      <div>
        <h1>Courses</h1>
        <Link to="/course" className="btn btn-primary">Add Course</Link>
        <CourseList courses={courses} />
      </div>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired
};

function mapStateToProps (state) {
  return {
    courses: state.courses
  };
}

export default connect(mapStateToProps, {})(CoursesPage);
