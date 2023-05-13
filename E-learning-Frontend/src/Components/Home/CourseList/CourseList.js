import { Row } from "react-bootstrap";


const CourseList = (props) => {

    const {
        courseCategory,
        courseListContent
    } = props;

    return (
        <Row>
            <Row className="fs-5 bg-secondary text-white px-3 py-1">
                {courseCategory}
            </Row>
            {courseListContent}
        </Row>
    );
};

export default CourseList;
