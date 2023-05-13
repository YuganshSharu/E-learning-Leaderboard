import { Container, Row, Col, Tab, Tabs, Spinner } from 'react-bootstrap';
import { useEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BACKEND_URL from '../../url';
import YoutubeEmbed from './YoutubeEmbed';
import LectureList from './LectureList/LectureList';
import Header from '../../Components/Layout/Header';
import RecommendationsList from './LectureList/RecommendationsList';
import VideoPlaceholder from './VideoPlaceholder';

const CourseStudent = (props) => {
  const navigate = useNavigate();
  const params = useParams();

  const courseId = params.courseId;
  const videoId = params.videoId;

  const [isCourseLoading, setIsCourseLoading] = useState(null);
  const [isVideoLoading, setIsVideoLoading] = useState(null);

  const [lectureList, setLectureList] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [description, setDescription] = useState(null);
  const [defaultTab, setDefaultTab] = useState(2);

  const changeVideoHandler = (youtubeLink) => {
    const linkList = youtubeLink.split('/');
    const embedId = linkList[linkList.length - 1];
    setCurrentVideo(embedId);
  };

  const handleNextVideoClick = () => {
    navigate(
      `/course/${recommendations[0].course}/video/${recommendations[0]._id}`
    );
  };

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setIsCourseLoading(true);
        const fetchedCourseDetails = await axios.get(
          `${BACKEND_URL}/api/course/${courseId}`
        );
        console.log(fetchedCourseDetails.data.videos);
        navigate(
          `/course/${courseId}/video/${fetchedCourseDetails.data.videos['2'][0]._id}`
        );
        setLectureList(fetchedCourseDetails.data.videos);
      } catch (err) {
        console.log(err);
      } finally {
        setIsCourseLoading(false);
      }
    };
    fetchCourseDetails();
  }, [courseId]);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        setIsVideoLoading(true);
        const response = await axios.get(`${BACKEND_URL}/api/video/${videoId}`);
        const fetchedVideoDetails = response.data.video;
        setDescription(fetchedVideoDetails.description);
        setRecommendations(fetchedVideoDetails.recommendations);
        changeVideoHandler(fetchedVideoDetails.url);
        props.history.replace(`/course/${courseId}/video/${videoId}`);
      } catch (err) {
        console.log(err);
      } finally {
        setIsVideoLoading(false);
      }
    };
    if (!videoId) return;
    fetchVideoDetails();
  }, [videoId]);

  return (
    <Fragment>
      {!isCourseLoading && (
        <Container fluid>
          <Header />
          <Container fluid className="overflow-hidden scroll-within-y">
            <Row>
              <Col xs={12} lg={9} className="p-0 scroll-within-y">
                {!isVideoLoading && (
                  <>
                    <Row>
                      <YoutubeEmbed embedId={currentVideo} />
                    </Row>
                    <Row style={{ padding: '0% 2% 2% 2%' }}>
                      <button
                        className={`btn btn-primary`}
                        onClick={handleNextVideoClick}
                      >
                        Next Video
                      </button>
                    </Row>
                    <Row style={{ padding: '0% 2% 2% 0%' }}>
                      <Tabs
                        defaultActiveKey={defaultTab}
                        id="uncontrolled-tab-example"
                      >
                        <Tab eventKey={1} title="Description">
                          In this video, the following topics have been
                          discussed: {description}
                        </Tab>
                        <Tab eventKey={2} title="Recommendations">
                          <RecommendationsList
                            recommendations={recommendations}
                          />
                        </Tab>
                        {window.innerWidth < 992 ? (
                          <Tab
                            eventKey={3}
                            title="Videos"
                            className="d-lg-none"
                          >
                            <LectureList lectures={lectureList} />
                          </Tab>
                        ) : null}
                      </Tabs>
                    </Row>
                  </>
                )}
                {isVideoLoading && <VideoPlaceholder />}
              </Col>
              <Col xs={12} lg={3} className="p-0 d-none d-md-block">
                <LectureList
                  lectures={lectureList}
                  setDefaultTab={setDefaultTab}
                />
              </Col>
            </Row>
          </Container>
        </Container>
      )}
      {isCourseLoading && (
        <Row className="min-vh-100 justify-content-center">
          <Col
            xs={12}
            className="d-flex align-items-end justify-content-center mb-4"
          >
            <Spinner
              style={{ width: '4rem', height: '4rem' }}
              animation="border"
              size="lg"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Col>
          <Col
            xs={12}
            className="d-flex align-items-start justify-content-center fs-3"
          >
            <p className="text-center">
              Hang on while the videos are being loaded...
            </p>
          </Col>
        </Row>
      )}
    </Fragment>
  );
};

export default CourseStudent;
