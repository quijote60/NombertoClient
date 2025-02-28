import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from "reactstrap";

const Public = () => {
  return (
    <div className="bg-default">
      <section className="header bg-gradient-info py-7 py-lg-8">
      <Container >
                <div className="text">
                  <Row>
                    <Col lg="10">
                      <h1 className="display-3 text-white">
                      Welcome to the Nomberto LLC Property Management System!{" "}
                        
                      </h1>
                      <p className="lead text-white">
                        The system keeps track of properties activities. 
                        The data is used for yearly reports.
                      </p>
                      <div className="btn-wrapper">
                        <Button
                          className="btn-icon mb-3 mb-sm-0"
                          color="info"
                          href="/login"
                        >
                          <span className="btn-inner--icon mr-1">
                            <i className="fa fa-code" />
                          </span>
                          <span className="text-white justify-content-center">Login</span>
                        </Button>
                        
                      </div>
                    </Col>
                  </Row>
                </div>
              </Container>
        <div className="separator separator-bottom separator-skew zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-default"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        
        
        
      </section>
    </div>
  );
};

export default Public;