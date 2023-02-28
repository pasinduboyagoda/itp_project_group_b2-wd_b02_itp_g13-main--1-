import { Deposit } from "@prisma/client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { number, object, string, TypeOf } from "yup";

const Home: NextPage = () => {
  const [data, setData] = useState<Deposit[]>([]);
  const router = useRouter();

  const deleteAllDeposits = () => {
    fetch("/api/eventApi?type=deposit_delete_all", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        getDepositData();
      })
      .catch(() => {
        // eslint-disable-next-line no-console
        console.log("some error: =-->");
      });
  };

  const depositSchema = object({
    id: number().nullable(),
    date: string().required(),
    email: string().required().email(),
    basic_salary: number().required(),
    allowances: number().required(),
    deductions: number().required(),
  });
  const [formState, setFormState] = useState<"create" | "update">("create");
  const initialValues: TypeOf<typeof depositSchema> = {
    id: null,
    date: "",
    email: "",
    basic_salary: 0,
    allowances: 0,
    deductions: 0,
  };
  const [initialData, setInitialData] = useState({ ...initialValues });

  const setOrUpdateData = async (
    data: TypeOf<typeof depositSchema>,
    stateX: "create" | "update"
  ) => {
    await fetch(`/api/eventApi?type=deposit_${stateX}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        date: data.date,
        email: data.email,
        basic_salary: data.basic_salary,
        allowances: data.allowances,
        deductions: data.deductions,
        ...(data?.id && { id: data.id }),
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        getDepositData();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const getDepositData = () => {
    fetch("/api/eventApi?type=deposit_get")
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
      });
  };

  useEffect(() => {
    getDepositData();
  }, []);

  const getCsvData = () => {
    const output = data.map((item) => [
      item.id,
      item.date,
      item.email,
      item.basic_salary,
      item.allowances,
      item.deductions,
    ]);
    return [
      ...[["ID", "Date", "Email", "Basic Salary", "Allowances", "Deductions"]],
      ...output,
    ];
  };

  return (
    <div className="ctr">
      <div className="ctr_left">
        <div className="profile">A</div>
        <div
          className="ctr_item selected"
          onClick={() => {
            router.push("/customer");
          }}
        >
          Deposit Details
        </div>
        <div
          className="ctr_item"
          onClick={() => {
            router.push("/contact");
          }}
        >
          Contact Us
        </div>
        <div
          className="ctr_item"
          onClick={() => {
            router.push("/settings");
          }}
        >
          Settings
        </div>
      </div>
      <div className="ctr_right">
        <div className="container">
          <div className="supdetail-container">
            <Formik
              initialValues={initialData}
              validationSchema={depositSchema}
              enableReinitialize
              onSubmit={(data) => {
                if (formState) {
                  setOrUpdateData(data, formState);
                }
              }}
            >
              {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit} className="supdetail-form">
                  <div className="supdetail-form-head">
                    <i className="fa fa-bed" />
                    <span>Deposit Details</span>
                  </div>

                  <div className="supdetail-form-body">
                    <div className="supdetail-form-group">
                      <i className="fa fa-calendar-o" />
                      <span>Date</span>
                      <Field
                        type="date"
                        name="date"
                        placeholder="Date"
                        className="supdetail-form-group_input"
                      />
                      <div className="errorMsgCtr">
                        <ErrorMessage name="date" className="eMessage" />
                      </div>

                      <i className="fa fa-calendar-o" />
                      <span>Email</span>
                      <Field
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="supdetail-form-group_input"
                      />
                      <div className="errorMsgCtr">
                        <ErrorMessage name="email" className="eMessage" />
                      </div>

                      <i className="fa fa-calendar-o" />
                      <span>Basic Salary</span>
                      <Field
                        type="number"
                        name="basic_salary"
                        placeholder="Basic Salary"
                        className="supdetail-form-group_input"
                      />
                      <div className="errorMsgCtr">
                        <ErrorMessage
                          name="basic_salary"
                          className="eMessage"
                        />
                      </div>
                    </div>

                    <div className="supdetail-form-group">
                      <i className="fa fa-calendar-o" />
                      <span>Allowances</span>
                      <Field
                        type="number"
                        name="allowances"
                        placeholder="Allowances"
                        className="supdetail-form-group_input"
                      />
                      <div className="errorMsgCtr">
                        <ErrorMessage name="allowances" className="eMessage" />
                      </div>

                      <i className="fa fa-calendar-o" />
                      <span>Deductions</span>
                      <Field
                        type="number"
                        name="deductions"
                        placeholder="Deductions"
                        className="supdetail-form-group_input"
                      />
                      <div className="errorMsgCtr">
                        <ErrorMessage name="deductions" className="eMessage" />
                      </div>
                    </div>
                    <div className="ordsupdetailer-form-search-btn btnCtrX">
                      <i className="fa fa-search" />
                      <div
                        className="supdetail-btn-margin specificBtn"
                        onClick={() => {
                          setFormState("create");
                          handleSubmit();
                        }}
                      >
                        CREATE
                      </div>
                      {formState === "update" && (
                        <div
                          className="supdetail-btn-margin specificBtn"
                          onClick={() => {
                            setFormState("update");
                            handleSubmit();
                          }}
                        >
                          UPDATE
                        </div>
                      )}
                      <div
                        className="supdetail-btn-margin specificBtn"
                        onClick={() => {
                          deleteAllDeposits();
                        }}
                      >
                        DELETE ALL
                      </div>
                      <CSVLink
                        filename="Customer Data"
                        data={getCsvData()}
                        className="supdetail-btn-margin specificBtn"
                      >
                        Generate Report
                      </CSVLink>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Email</th>
                <th>Basic Salary</th>
                <th>Allowances</th>
                <th>Deductions</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => (
                <tr key={`test-${i + 1}`}>
                  <td>{item.id}</td>
                  <td>{`${item.date}`}</td>
                  <td>{item.email}</td>
                  <td>{item.basic_salary}</td>
                  <td>{item.allowances}</td>
                  <td>{item.deductions}</td>
                  <td>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={async () => {
                        await fetch("/api/eventApi?type=deposit_delete_one", {
                          method: "POST",
                          headers: {
                            "content-type": "application/json",
                          },
                          body: JSON.stringify({
                            id: item.id,
                          }),
                        })
                          .then((res) => res.json())
                          .then(() => {
                            getDepositData();
                          })
                          .catch(() => {});
                      }}
                    >
                      Delete
                    </div>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={async () => {
                        setFormState("update");
                        setInitialData({
                          id: item.id,
                          date: `${item.date}`,
                          email: item.email,
                          basic_salary: item.basic_salary,
                          allowances: item.allowances,
                          deductions: item.deductions,
                        });
                      }}
                    >
                      Update
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
