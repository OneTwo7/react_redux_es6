import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import CourseForm from './CourseForm';
import * as courseActions from '../../actions/courseActions';
import { Redirect } from 'react-router-dom';
import toastr from 'toastr';
import { authorsFormattedForDropdown } from '../../selectors/selectors';

export class ManageCoursePage extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      course: Object.assign({}, props.course),
      errors: {},
      loading: false
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

  courseFormIsValid () {
    let formIsValid = true;
    let errors = {};

    if (this.state.course.title.length < 5) {
      errors.title = 'Title must be at least 5 characters.';
      formIsValid = false;
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  saveCourse (event) {
    event.preventDefault();
    if (!this.courseFormIsValid()) {
      return;
    }
    this.setState({ loading: true });
    this.props.actions.saveCourse(this.state.course).then(() => {
      this.redirect();
    }).catch(error => {
      toastr.error(error);
      this.setState({ loading: false });
    });
  }

  redirect () {
    this.setState({ loading: false });
    toastr.success('Course saved');
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
        loading={this.state.loading}
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

  return {
    course,
    authors: authorsFormattedForDropdown(state.authors)
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
