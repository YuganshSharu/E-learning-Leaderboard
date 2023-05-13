import OngoingCourseListItem from "./OngoingCourseListItem";

const OngoingCourseListItemProfessor = (props) => {
    const {
        title,
        numEnrolledStudents,
        courseId
    } = props;

    return <OngoingCourseListItem
        key={courseId}
        title={title}
        numEnrolledStudents={numEnrolledStudents}
        courseId={courseId}
    />
}

export default OngoingCourseListItemProfessor;