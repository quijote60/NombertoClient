import React from 'react';
import { useGetFineTypesQuery } from './FineTypesApiSlice'
import FineType from './FineType';
import PulseLoader from 'react-spinners/PulseLoader';
import {
  Alert,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
} from 'reactstrap';

const FineTypesList = () => {
  const {
    data: fineTypes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetFineTypesQuery();
  console.log('FineTypes data:', fineTypes);
  let content;

  // Loading state
  if (isLoading) {
    content = (
      <Container className="mt--7" fluid>
        <Row className="pt-7">
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Fine Types table</h3>
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
                <h3 className="mb-0">Fine Type table</h3>
              </CardHeader>
              <div className="p-3">
                <Alert color="danger" className="text-center">
                  {error?.data?.message || 'An error occurred while fetching fine types.'}
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
    const { ids } = fineTypes;

    const tableContent = ids?.length ? (
      ids.map(fineTypeId => <FineType key={fineTypeId} fineTypeId={fineTypeId} />)
    ) : (
      <tr>
        <td colSpan="4" className="text-center p-5">
          No fine types found.
        </td>
      </tr>
    );

    content = (
      <Container className="mt--7" fluid>
        <Row className="pt-7">
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Fine Type table</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th className="py-3" scope="col">FineTypeId</th>
                    <th className="py-3" scope="col">Created</th>
                    <th className="py-3 text-center" scope="col">Fine type</th>
                    <th className="py-3 text-center" scope="col">Edit</th> {/* Added Edit column */}
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

export default FineTypesList;