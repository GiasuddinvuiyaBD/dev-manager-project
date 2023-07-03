import { Outlet, NavLink } from "react-router-dom";
import { Tab, Nav, Col, Row } from "react-bootstrap";


function Dashbord() 
{
    return(
        <>
            <h2 className="text-center mb-4">DashBord is present</h2>
            <Tab.Container bg='light' id="left-tabs-example" defaultActiveKey="first">
            <Row>
                <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                        <Nav.Link  as={NavLink} to='profile'>Profile</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link  as={NavLink} to="contacts">UserContactList</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={NavLink} to='manage-password'>Manage Password</Nav.Link>
                    </Nav.Item>
                </Nav>
                </Col>
                <Col sm={9}>
                <Tab.Content>
                    <Outlet />
                </Tab.Content>
                </Col>
            </Row>
            </Tab.Container>
        </>
    )
}

export default Dashbord;

