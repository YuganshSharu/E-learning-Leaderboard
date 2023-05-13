import { Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const RecommendationsList = ({ recommendations }) => {
  const navigate = useNavigate();
  return (
    <div style={{ marginTop: "2%", backgroundColor: "#f5f5f5" }}>
      <Row>
        {recommendations.map((item, index) => {
          return (
            <Col key={`${item.url}${index}`} sm={6} md={3} style={{ marginTop: "2%", marginBottom: "2%" }}>
              <Card
                onClick={() => {
                  navigate(`/course/${item.course}/video/${item._id}`);
                }}
              >
                <Card.Img
                  variant="top"
                  src={`http://img.youtube.com/vi/${item.url.substring(
                    item.url.lastIndexOf("/") + 1
                  )}/0.jpg`}
                />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default RecommendationsList;
