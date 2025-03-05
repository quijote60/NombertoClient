import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse } from "@fortawesome/free-solid-svg-icons"
import { useNavigate, useLocation } from 'react-router-dom'
import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";

const DashFooter = () => {

    return (
        <>
          <footer className="py-5">
            <Container>
              <Row className="align-items-center justify-content-xl-between">
                <Col xl="6">
                  <div className="copyright text-center text-xl-left" style={{color: "white"}}>
                    © {new Date().getFullYear()}{" "}
                    <a
                      className="font-weight-bold ml-1"
                      href="https://www.creative-tim.com?ref=adr-auth-footer"
                      target="_blank"
                      style={{color: "white"}}
                    >
                      Creative Tim
                    </a>
                  </div>
                </Col>
                <Col xl="6">
                  <Nav className="nav-footer justify-content-center justify-content-xl-end">
                    <NavItem>
                      <NavLink
                        href="https://www.creative-tim.com?ref=adr-auth-footer"
                        target="_blank"
                        style={{color: "white"}}
                      >
                        Creative Tim
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        href="https://www.creative-tim.com/presentation?ref=adr-auth-footer"
                        target="_blank"
                        style={{color: "white"}}
                      >
                        About Us
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        href="http://blog.creative-tim.com?ref=adr-auth-footer"
                        target="_blank"
                        style={{color: "white"}}
                      >
                        Blog
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        href="https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md?ref=adr-auth-footer"
                        target="_blank"
                        style={{color: "white"}}
                      >
                        MIT License
                      </NavLink>
                    </NavItem>
                  </Nav>
                </Col>
              </Row>
            </Container>
          </footer>
        </>
      );
    };
export default DashFooter