import { Outlet } from 'react-router-dom';
import DashHeader from './DashHeader';
import DashFooter from './DashFooter';
import { Container } from 'reactstrap';

const DashLayout = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}> {/* Added flex container */}
            <div className="main-content" style={{ flex: 1 }}> {/* Added flex: 1 to main-content */}
                <DashHeader />
                <section className="header bg-gradient-info py-7 py-lg-8">
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
                <Container className="mt--8 pb-5">
                    <Outlet />
                </Container>
            </div>
            <DashFooter />
        </div>
    );
};

export default DashLayout;
