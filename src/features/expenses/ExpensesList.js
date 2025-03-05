import React from 'react';
import { useGetExpensesQuery } from './expensesApiSlice';
import Expense from './Expense';
import PulseLoader from 'react-spinners/PulseLoader';
import {
  Alert,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
} from 'reactstrap';

const ExpensesList = () => {
    const {
        data: expenses,
        isLoading,
        isSuccess,
        isError,
        error,
      } = useGetExpensesQuery();
      console.log('Expenses data:', expenses);
      let content;
    
      if (isLoading) {
        content = (
          <Container className="mt--7" fluid>
            <Row className="pt-7">
              <div className="col">
                <Card className="shadow">
                  <CardHeader className="border-0">
                    <h3 className="mb-0">Expenses table</h3>
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
    
      if (isError) {
        content = (
          <Container className="mt--7" fluid>
            <Row className="pt-7">
              <div className="col">
                <Card className="shadow">
                  <CardHeader className="border-0">
                    <h3 className="mb-0">Expenses table</h3>
                  </CardHeader>
                  <div className="p-3">
                    <Alert color="danger" className="text-center">
                      {error?.data?.message || 'An error occurred while fetching expenses.'}
                    </Alert>
                  </div>
                </Card>
              </div>
            </Row>
          </Container>
        );
      }
    
      if (isSuccess) {
        const { ids } = expenses;
    
        const tableContent = ids?.length ? (
          ids.map(expenseId => <Expense key={expenseId} expenseId={expenseId} />)
        ) : (
          <tr>
            <td colSpan="5" className="text-center p-5">
              No expenses found.
            </td>
          </tr>
        );
    
        content = (
          <Container className="mt--7" fluid>
            <Row className="pt-7">
              <div className="col">
                <Card className="shadow">
                  <CardHeader className="border-0">
                    <h3 className="mb-0">Expenses table</h3>
                  </CardHeader>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th className="py-3" scope="col">Expense ID</th>
                        <th className="py-3" scope="col">Date</th>
                        <th className="py-3" scope="col">Amount</th>
                        <th className="py-3" scope="col">Payment Category</th>
                        <th className="py-3" scope="col">Payment Type</th>
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
}

export default ExpensesList