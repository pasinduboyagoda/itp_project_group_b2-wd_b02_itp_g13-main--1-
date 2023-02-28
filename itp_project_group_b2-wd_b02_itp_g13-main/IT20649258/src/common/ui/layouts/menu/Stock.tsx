import { stock } from '@prisma/client';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import styled from 'styled-components';
import { number, object, string, TypeOf } from 'yup';

const Home: NextPage = () => {
  const [data, setData] = useState<stock[]>([]);

  const [formState, setFormState] = useState<'create' | 'update'>('create');
  const initialValues: TypeOf<typeof stockSchema> = {
    itemId: null,
    supplierName: '',
    orderDate: '',
    itemCode: '',
    itemName: '',
    quanitity: '',
    unitePrice: '',
    total: '',
  };
  const [initialData, setInitialData] = useState({ ...initialValues });

  const getOfferData = () => {
    fetch('/api/dashboard?type=stock_get', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `${process.env.JWT}`,
      },
    })
      .then(res => res.json())
      .then(res => {
        setData(res.data);
      })
      .catch(() => {
        toast.error('Something Went Wrong. Try again!');
      });
  };

  const deleteAUser = (supplierId: number) => {
    fetch('/api/dashboard?type=supplier_delete_one', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `${process.env.JWT}`,
      },
      body: JSON.stringify({
        supplierId: supplierId,
      }),
    })
      .then(res => res.json())
      .then(() => {
        getOfferData();
      })
      .catch(() => {
        toast.error('Something Went Wrong. Try again!');
      });
  };

  const deleteAllUsers = () => {
    fetch('/api/dashboard?type=stock_delete_all', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `${process.env.JWT}`,
      },
    })
      .then(res => res.json())
      .then(() => {
        getOfferData();
      })
      .catch(() => {
        toast.error('Something Went Wrong. Try again!');
      });
  };

  const stockSchema = object({
    itemId: number().nullable(),
    supplierName: string().required('supplier Name is required'),
    orderDate: string().required('orderDate is required'),
    itemCode: string().required('itemCode is required'),
    itemName: string().required('item Name is required'),
    quanitity: string().required(),
    unitePrice:string().required('unite Price is required'),
    total: string().required('total is required'),
  });

  const onModalSubmitHandler = (data: TypeOf<typeof stockSchema>, formState: 'create' | 'update') => {
    fetch(`/api/dashboard?type=stock_${formState}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `${process.env.JWT}`,
      },
      body: JSON.stringify({
        supplierName: data.supplierName,
        orderDate: data.orderDate,
        itemCode: data.itemCode,
        itemName: data.itemName,
        quanitity: data.quanitity,
        unitePrice: data.unitePrice,
        total: data.total,
        ...(data?.itemId && { itemId: data.itemId }),
      }),
    })
      .then(res => res.json())
      .then(res => {
        toast.success(res.message);
        getOfferData();
      })
      .catch(() => {
        toast.error('Something Went Wrong. Try again!');
      });
  };

  useEffect(() => {
    getOfferData();
  }, []);
  return (
    <Container>
      <InnerContainer>
        <div className='supdetail-container'>
          <Formik
            initialValues={initialData}
            validationSchema={stockSchema}
            enableReinitialize
            onSubmit={data => {
              onModalSubmitHandler(data, formState);
            }}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit} className='supdetail-form'>
                <div className='supdetail-form-body'>
                  {/* Form Grop ---> */}
                  <div className='stockgroup'>
              <i className='fa fa-calendar-o' />
                    <span  className='stockspan'>supplier Name</span>
                    <Field
                      type='text'
                      name='supplierName'
                      placeholder='supplier Name'
                      className='supdetail-form-group_input'
                    />
                    <EMsg>
                      <ErrorMessage name='supplierName' className='eMessage' />
                    </EMsg>
            </div>
            <div>
              <i className='fa fa-calendar-o' />
              <span  className='stockspan'>Order Date</span>
                    <Field
                      type='date'
                      name='orderDate'
                      placeholder=''
                      className='supdetail-form-group_input'
                    />
                    <EMsg>
                      <ErrorMessage name='orderDate' className='eMessage' />
                    </EMsg>
            </div>
            <div className='stockgroup'>
              <i className='fa fa-calendar-o' />
              <span  className='stockspan'>Item Code</span>
                    <Field
                      type='text'
                      name='itemCode'
                      placeholder=''
                      className='supdetail-form-group_input'
                    />
                    <EMsg>
                      <ErrorMessage name='itemCode' className='eMessage' />
                    </EMsg>
              <i className='fa fa-calendar-o' />
              <span  className='stockspan'>Item Name</span>
                    <Field
                      type='text'
                      name='itemName'
                      placeholder=''
                      className='supdetail-form-group_input'
                    />
                    <EMsg>
                      <ErrorMessage name='itemName' className='eMessage' />
                    </EMsg>
            </div>
            <div className='stockgroup'>
              <i className='fa fa-calendar-o' />
              <span  className='stockspan'>Quanitity</span>
                    <Field
                      type='text'
                      name='quanitity'
                      placeholder=''
                      className='supdetail-form-group_input'
                    />
                    <EMsg>
                      <ErrorMessage name='quanitity' className='eMessage' />
                    </EMsg>
              <i className='fa fa-calendar-o' />
              <span  className='stockspan'>Unite Price</span>
                    <Field
                      type='text'
                      name='unitePrice'
                      placeholder=''
                      className='supdetail-form-group_input'
                    />
                    <EMsg>
                      <ErrorMessage name='unitePrice' className='eMessage' />
                    </EMsg>
            </div>
            <div className='stockgroup'>
              <i className='fa fa-calendar-o' />
              <span  className='stockspan'>Total</span>
                    <Field
                      type='text'
                      name='total'
                      placeholder=''
                      className='supdetail-form-group_input'
                    />
                    <EMsg>
                      <ErrorMessage name='total' className='eMessage' />
                    </EMsg>
            </div>
                  <div className='ordsupdetailer-form-search-btn'>
                    {/* Form Item 🔥 ---> */}
                    <i className='fa fa-search' />
                    <div
                      className='supdetail-btn-margin'
                      onClick={() => {
                        setFormState('create');
                        handleSubmit();
                      }}
                    >
                      Create
                    </div>
                    <div
                      className='supdetail-btn-margin'
                      onClick={() => {
                        deleteAllUsers();
                      }}
                    >
                      Delete All
                    </div>
                    {formState === 'update' && (
                      <div
                        className='supdetail-btn-margin'
                        onClick={() => {
                          setFormState('update');
                          handleSubmit();
                        }}
                      >
                        Update
                      </div>
                    )}
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        <table>
          <thead>
            <tr>
              <th>SupplierId</th>
              <th>Supplier first Name</th>
              <th>Supplier Last Name</th>
              <th>supplier Email</th>
              <th>Supplier NIC</th>
              <th>Company Name</th>
              <th>Phone Number</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={`test-${i + 1}`}>
                <td>{item.itemId}</td>
                <td>{item.supplierName}</td>
                <td>{item.orderDate}</td>
                <td>{item.itemCode}</td>
                <td>{item.itemName}</td>
                <td>{item.quanitity}</td>
                <td>{item.unitePrice}</td>
                <td>{item.total}</td>
                <td>
                  <BtnCtr>
                    <FormBtn
                      onClick={() => {
                        deleteAUser(item.itemId);
                      }}
                    >
                      Delete
                    </FormBtn>
                    <FormBtn
                      onClick={() => {
                        setFormState('update');
                        setInitialData({
                          itemId: item.itemId,
                          supplierName: item.supplierName,
                          orderDate: item.orderDate,
                          itemCode: item.itemCode,
                          itemName: item.itemName,
                          quanitity: item.quanitity,
                          unitePrice: item.unitePrice,
                          total: item.total,
                        });
                      }}
                    >
                      Update
                    </FormBtn>
                  </BtnCtr>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </InnerContainer>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  a {
    color: inherit;
    text-decoration: none;
  }

  .container {
    padding: 20px;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    font-size: 0.9em;
    min-width: 400px;
    border-radius: 5px 5px 0 0;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  }

  thead > tr {
    background-color: #000;
    color: #fff;
    text-align: left;
    font-weight: bold;
    border: 1px solid #000;
  }

  td {
    padding: 8px;
    border-right: 1px solid #000;
    text-align: center;
  }

  td:last-child {
    border: none;
  }

  th {
    padding: 8px;
    text-align: center;
  }

  tbody > tr {
    border: 1px solid #000;
    border-bottom: 1px solid #000;
  }

  tbody > tr:nth-of-type(even) {
    background-color: #f3f3f3;
  }

  tbody > tr:last-of-type {
    border-bottom: 2px solid #000;
  }

  .div1 {
    display: grid;
    grid-template-areas: 'left right';
    max-width: 900px;
  }
  .cal .title h1 {
    font-weight: bold;
    font-weight: 500;
    font-size: 40px;
    font-family: Bree Serif;
    color: #fff;
    line-height: 40px;
    background: #000000;
    text-transform: uppercase;
    display: inline-block;
    padding: 0px 10px;
    margin-left: 50%;
  }

  .supdetail-container {
    height: auto;
    width: 100%;
    padding: 16px;
    background: #fbfbfb;
    border: 1px solid #000;
    background-attachment: fixed;
    background-size: cover;
    background-position: center center;
    background-attachment: fixed;
    margin-bottom: 25px;
  }

  .stock-container {
    align-items: center;
    background: #d8aa96;
    color: rgba(0, 0, 0, 0.8);
    display: grid;
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    font-weight: 400;
    height: 100vh;
    justify-items: center;
    width: 100vw;
  }

  .supdetail-form {
    background: lighten(#f7b1ab, 5%);
    display: grid;
    grid-template-areas: '.' '.';
  }

  .stock-form {
    background: lighten(#ec4637, 5%);
    display: grid;
    grid-template-areas: '.' '.';
    width: 750px;
  }

  @media only screen and (min-width: 769px) {
    .order-form {
      width: 400px;
      margin: auto;
    }
  }

  .supdetail-form-head {
    background: #f7b1ab;
    overflow: hidden;
    padding: 25px 0 25px 0;
    position: relative;
    text-align: center;
    width: 400px;
  }

  .stock-form-head {
    background: #f7b1ab;
    overflow: hidden;
    padding: 25px 0 25px 0;
    position: relative;
    text-align: center;
    width: 400px;
  }

  .supright {
    background: #f79e95;
    display: grid;
    width: 400px;
    text-align: center;
    padding: 25px 0 25px 0;
    overflow: hidden;
  }

  .supdetail-form-body {
    padding: 16px;
    width: 100%;
  }

  .supdetail-form-group {
    width: 100%;
    padding: 0 8px;
    margin-bottom: 16px;
  }

  .supdetail-form-group_input {
    width: 100%;
    display: block;
    margin: 0 auto;
    padding: 8px;
    border: none;
    border-bottom: 1px solid #ccc;
    background-color: #fbfbfb;
  }

  .supdetail-form-group_select {
    width: 100%;
    display: block;
    margin: 0 auto;
    padding: 8px;
    border: none;
    border-bottom: 1px solid #ccc;
    background-color: #fbfbfb;
  }

  .supdetail-form-search-btn {
    width: 200px;
    margin: auto;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    background: #ff6239;
    color: #fff;
    border-radius: 4px;
  }

  .supdetail-btn-margin {
    padding: 10px 20px;
    border-radius: 4px;
    background: black;
    color: white;
    display: inline-block;
    cursor: pointer;
  }

  .stockspan {
    font-size: 20px;
    float: left;
    width: 100%;
    display: block;
    margin-bottom: 5px;
    margin-top: 15px;
    margin-bottom: 10px;
  }

  .ordsupdetailer-form-search-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 10px;
  }

  .stockgroup > input {
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    height: 38px;
    line-height: 38px;
    padding-left: 5px;
  }

  .set {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
  }
`;

const InnerContainer = styled.div`
  padding: 20px;
  margin-top: 25px;
`;

const EMsg = styled.div`
  color: red;
  margin: 4px 0;
`;

const FormBtn = styled.div`
  cursor: pointer;
  border-radius: 4px;
  background: black;
  color: white;
  width: 100px;
`;

const BtnCtr = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;
