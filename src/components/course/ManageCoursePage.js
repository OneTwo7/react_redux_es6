import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import CourseForm from './CourseForm';
import * as courseActions from '../../actions/courseActions';
import { Redirect } from 'react-router-dom';

class ManageCoursePage extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      course: Object.assign({}, props.course),
      errors: {}
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.course.id !== nextProps.course.id) {
      this.setState({ course: Object.assign({}, nextProps.course) });
    }
  }

  updateCourseState (event) {
    const field = event.target.name;
    let course = this.state.course;
    course[field] = event.target.value;
    return this.setState({ course });
  }

  saveCourse (event) {
    event.preventDefault();
    this.props.actions.saveCourse(this.state.course);
    this.props.history.push('/courses');
  }

  render () {
    return (
      <CourseForm
        course={this.state.course}
        errors={this.state.errors}
        allAuthors={this.props.authors}
        onChange={this.updateCourseState}
        onSave={this.saveCourse}
      />
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

function getCourseById (courses, id) {
  let course;
  const length = courses.length;
  for (let i = 0; i < length; i++) {
    if (courses[i].id === id) {
      course = courses[i];
      break;
    }
  }
  return course;
}

function mapStateToProps (state, ownProps) {
  const courseId = ownProps.match.params.id;

  let course = {
    watchHref: '',
    title: '',
    authorId: '',
    category: '',
    length: ''
  };

  if (courseId && state.courses.length > 0) {
    course = getCourseById(state.courses, courseId);
  }

  const authorsFormattedForDropdown = state.authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    };
  });

  return {
    course,
    authors: authorsFormattedForDropdown
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
