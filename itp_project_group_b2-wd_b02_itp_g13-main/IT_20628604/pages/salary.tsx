import { salary } from "@prisma/client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { number, object, string, TypeOf } from "yup";

const Home: NextPage = () => {
  const [data, setData] = useState<salary[]>([]);
  const router = useRouter();

  const deleteAllUsers = () => {
    fetch("/api/salaryapi?type=salary_delete_all", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        getOfferData();
      })
      .catch(() => {
        // eslint-disable-next-line no-console
        console.log("some error: =-->");
      });
  };

  const salarySchema = object({
    empId: number().nullable(),
    empname: string().required("Full Name is required"),
    empbankacc: string().required("Room Number is required"),
    emptype: string().required("emptype is required"),
    basicsal: string().required("basicsal is required"),
    allownce: string().required(),
    numofday: string().required(),
  });

  const [formState, setFormState] = useState<"create" | "update">("create");
  const initialValues: TypeOf<typeof salarySchema> = {
    empId: null,
    empname: "",
    empbankacc: "",
    emptype: "",
    basicsal: "",
    allownce: "",
    numofday: "",
  };
  const [initialData, setInitialData] = useState({ ...initialValues });

  const setOrUpdateData = async (
    data: TypeOf<typeof salarySchema>,
    stateX: "create" | "update"
  ) => {
    await fetch(`api/salaryapi?type=salary_${stateX}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        empname: data.empname,
        empbankacc: data.empbankacc,
        emptype: data.emptype,
        basicsal: data.basicsal,
        allownce: data.allownce,
        numofday: data.numofday,
        ...(data?.empId && { empId: data.empId }),
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // eslint-disable-next-line no-console
        console.log("res: =-->", res);
        getOfferData();
      })
      .catch((error) => {
        console.log(error.message);
      });
    // getOfferData();
  };

  const getOfferData = () => {
    fetch("api/salaryapi?type=salary_get")
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
      });
  };

  useEffect(() => {
    getOfferData();
  }, []);

  const getCsvData = () => {
    const output = data.map((item) => [
      item.empId,
      item.empname,
      item.empbankacc,
      item.emptype,
      item.basicsal,
      item.allownce,
      item.numofday,
    ]);
    return [
      ...[
        [
          "Emloyer Id",
          "Emloyer Full Name",
          "Emloyer bank accaunt",
          "Emloyer type",
          "Basic salary ",
          "allownce",
          "Number of date",
        ],
      ],
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
            router.push("/salary");
          }}
        >
          salary Details
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
              validationSchema={salarySchema}
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
                    <span>salary Details</span>
                  </div>

                  <div className="supdetail-form-body">
                    <div className="supdetail-form-group">
                      <i className="fa fa-calendar-o" />
                      <span>Emloyer Full Name</span>
                      <Field
                        type="text"
                        name="empname"
                        placeholder="Full Name"
                        className="supdetail-form-group_input"
                      />
                      <div className="errorMsgCtr">
                        <ErrorMessage name="empname" className="eMessage" />
                      </div>
                      <i className="fa fa-calendar-o" />
                      <span>Emloyer bank accaunt</span>
                      <Field
                        type="text"
                        name="empbankacc"
                        placeholder="Room Number"
                        className="supdetail-form-group_input"
                      />
                      <div className="errorMsgCtr">
                        <ErrorMessage name="empbankacc" className="eMessage" />
                      </div>

                      <i className="fa fa-calendar-o" />
                      <span>Emloyer type</span>
                      <Field
                        type="text"
                        name="emptype"
                        placeholder="emptype"
                        className="supdetail-form-group_input"
                      />
                      <div className="errorMsgCtr">
                        <ErrorMessage name="emptype" className="eMessage" />
                      </div>
                    </div>
                    <div className="supdetail-form-group">
                      <i className="fa fa-calendar-o" />
                      <span>Basic salary</span>
                      <Field
                        type="text"
                        name="basicsal"
                        placeholder="basicsal"
                        className="supdetail-form-group_input"
                      />
                      <div className="errorMsgCtr">
                        <ErrorMessage name="basicsal" className="eMessage" />
                      </div>
                      <i className="fa fa-calendar-o" />
                      <span> allownce</span>
                      <Field
                        type="text"
                        name="allownce"
                        placeholder="NIC"
                        className="supdetail-form-group_input"
                      />
                      <div className="errorMsgCtr">
                        <ErrorMessage name="allownce" className="eMessage" />
                      </div>
                      <i className="fa fa-calendar-o" />
                      <span>Number of date</span>
                      <Field
                        type="text"
                        name="numofday"
                        placeholder="Contact Number"
                        className="supdetail-form-group_input"
                      />
                      <div className="errorMsgCtr">
                        <ErrorMessage name="numofday" className="eMessage" />
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
                          deleteAllUsers();
                        }}
                      >
                        DELETE ALL
                      </div>
                      <CSVLink
                        filename="salary Data"
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
                <th>Emloyer Id</th>
                <th>Full Name</th>
                <th>bank accaunt</th>
                <th>Emloyer type</th>
                <th>Basic salary</th>
                <th>allownce</th>
                <th>Number of date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => (
                <tr key={`test-${i + 1}`}>
                  <td>{item.empId}</td>
                  <td>{item.empname}</td>
                  <td>{item.empbankacc}</td>
                  <td>{item.emptype}</td>
                  <td>{item.basicsal}</td>
                  <td>{item.allownce}</td>
                  <td>{item.numofday}</td>
                  <td>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={async () => {
                        await fetch("/api/salaryapi?type=salary_delete_one", {
                          method: "POST",
                          headers: {
                            "content-type": "application/json",
                          },
                          body: JSON.stringify({
                            empId: item.empId,
                          }),
                        })
                          .then((res) => res.json())
                          .then(() => {
                            getOfferData();
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
                          empId: +item.empId,
                          empname: item.empname,
                          empbankacc: item.empbankacc,
                          emptype: item.emptype,
                          basicsal: item.basicsal,
                          allownce: item.allownce,
                          numofday: item.numofday,
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
