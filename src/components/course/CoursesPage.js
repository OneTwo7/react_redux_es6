import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createCourse } from '../../actions/courseAction';
import PropTypes from 'prop-types';

class CoursesPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      course: { title: '' }
    };

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
  }

  onTitleChange (event) {
    const course = this.state.course;
    course.title = event.target.value;
    this.setState({ course: course });
  }

  onClickSave (event) {
    this.props.createCourse(this.state.course);
    event.preventDefault();
  }

  courseRow (course, index) {
    return (
      <div key={index}>{course.title}</div>
    );
  }

  render () {
    return (
      <div>
        <h1>Courses</h1>
        <h2>Add Course</h2>
        {this.props.courses.map(this.courseRow)}
        <form>
          <input
            type="text"
            onChange={this.onTitleChange}
            value={this.state.course.title}
          />
          <input
            type="submit"
            onClick={this.onClickSave}
            value="Save"
          />
        </form>
      </div>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  createCourse: PropTypes.func.isRequired
};

function mapStateToProps (state) {
  return {
    courses: state.courses
  };
}

export default connect(mapStateToProps, { createCourse })(CoursesPage);
