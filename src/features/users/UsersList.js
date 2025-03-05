import React from 'react';
import { useGetUsersQuery } from './usersApiSlice';
import User from './User';
import PulseLoader from 'react-spinners/PulseLoader'; // Adding a spinner for loading
import {
  Alert, // For error messages
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
} from 'reactstrap';

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();
  console.log(users);
  let content;

  // Loading state
  if (isLoading) {
    content = (
      <Container className="mt--7" fluid>
        <Row className="pt-7">
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">User table</h3>
              </CardHeader>
              <div className="d-flex justify-content-center align-items-center p-5">
                <PulseLoader color="#0d6efd" />
              </div>
            </Card>
          </div>
        </Row>
      </Container>
    );
  }

  // Error state
  if (isError) {
    content = (
      <Container className="mt--7" fluid>
        <Row className="pt-7">
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">User table</h3>
              </CardHeader>
              <div className="p-3">
                <Alert color="danger" className="text-center">
                  {error?.data?.message || 'An error occurred while fetching users.'}
                </Alert>
              </div>
            </Card>
          </div>
        </Row>
      </Container>
    );
  }

  // Success state
  if (isSuccess) {
    console.log('I am here...');
    const { ids } = users;
    console.log(users);

    const tableContent = ids?.length ? (
      ids.map(userId => <User key={userId} userId={userId} />)
    ) : (
      <tr>
        <td colSpan="5" className="text-center p-5">
          No users found.
        </td>
      </tr>
    );

    content = (
      <Container className="mt--7" fluid>
        <Row className="pt-7">
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">User table</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th className="py-3" scope="col">UserName</th>
                    <th className="py-3" scope="col">Created</th>
                    <th className="py-3 text-center" scope="col">Roles</th>
                    <th className="py-3 text-center" scope="col">Active</th>
                    <th className="py-3 text-center" scope="col">Edit</th>
                  </tr>
                </thead>
                <tbody>{tableContent}</tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    );
  }

  return content;
};

export default UsersList;