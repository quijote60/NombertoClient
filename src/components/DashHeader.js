import { Link } from 'react-router-dom';
import {
  UncontrolledCollapse,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from 'reactstrap';

const DashHeader = () => {
  const content = (
    <>
      <Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md">
        <Container className="px-4">
          <button className="navbar-toggler" id="navbar-collapse-main">
            <span className="navbar-toggler-icon" />
          </button>
          <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
            <div className="navbar-collapse-header d-md-none">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <Link to="/">
                    {/* You can add a logo or text here if needed */}
                  </Link>
                </Col>
                <Col className="collapse-close" xs="6">
                  <button className="navbar-toggler" id="navbar-collapse-main">
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            <div className="d-flex w-100 justify-content-between align-items-center">
              {/* Left Nav for Nomberto LLC */}
              <Nav navbar>
                <NavItem>
                  <NavLink
                    className="nav-link-icon"
                    to="/"
                    tag={Link}
                    style={{ color: 'white', lineHeight: 'inherit' }}
                  >
                    <span className="nav-link-inner--text">Nomberto LLC</span>
                  </NavLink>
                </NavItem>
              </Nav>

              {/* Right Nav for other links */}
              <Nav navbar>
                <NavItem>
                  <NavLink className="nav-link-icon" to="/" tag={Link}>
                    <span className="nav-link-inner--text">Dashboard</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="nav-link-icon"
                    to="/auth/register"
                    tag={Link}
                  >
                    <span className="nav-link-inner--text">Register</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link-icon" to="/auth/login" tag={Link}>
                    <span className="nav-link-inner--text">Login</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="nav-link-icon"
                    to="/admin/user-profile"
                    tag={Link}
                  >
                    <span className="nav-link-inner--text">Profile</span>
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </>
  );

  return content;
};

export default DashHeader;