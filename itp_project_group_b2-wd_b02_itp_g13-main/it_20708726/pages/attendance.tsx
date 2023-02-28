import { Attendance } from "@prisma/client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { number, object, string, TypeOf } from "yup";

const Home: NextPage = () => {
  const [data, setData] = useState<Attendance[]>([]);
  const router = useRouter();

  const deleteAllUsers = () => {
    fetch("/api/eventApi?type=Attendance_delete_all", {
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

  const AttendanceSchema = object({
    employeeId: number().nullable(),
    firstName: string().required("firstName is required"),
    lastName: string().required("lastName is required"),
    Date: string().required("Date is required"),
    in_time: string().required("time is required"),
      out_time: string().required()
   
    
  });

  const [formState, setFormState] = useState<"create" | "update">("create");
  const initialValues: TypeOf<typeof AttendanceSchema> = {
    employeeId: null,
    firstName: "",
    lastName: "",
    Date: "",
    in_time: "",
    out_time: "",
  };
  const [initialData, setInitialData] = useState({ ...initialValues });

  const setOrUpdateData = async (
    data: TypeOf<typeof AttendanceSchema>,
    stateX: "create" | "update"
  ) => {
    await fetch(`api/eventApi?type=Attendance_${stateX}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        Date: data.Date,
        in_time: data.in_time,
        out_time: data.out_time,
        ...(data?.employeeId && { employeeId: data.employeeId }),
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
    fetch("api/eventApi?type=customer_get")
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
      item.employeeId,
      item.firstName,
      item.lastName,
      item.Date,
      item.in_time,
      item.out_time,
    ]);
    return [
      ...[
        [
          "employeeId",
          "First Name",
          "last Name",
          "Date",
          "In time",
          "Out time",
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
            router.push("/Attendance");
          }}
        >
          Attendance Details
        </div>
        <div
          className="ctr_item"
          onClick={() => {
            router.push("/task");
          }}
        >
          Task
        </div>
        <div
          className="ctr_item"
          onClick={() => {
            router.push("/review");
          }}
        >
          Review
        </div>
      </div>
      <div className="ctr_right">
        <div className="container">
          <div className="supdetail-container">
            <Formik
              initialValues={initialData}
              validationSchema={AttendanceSchema}
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
                    <span>Attendance Details</span>
                  </div>

                  <div className="supdetail-form-body">
                    <div className="supdetail-form-group">
                      <i className="fa fa-calendar-o" />
                      <span>First Name</span>
                      <Field
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        className="supdetail-form-group_input"
                      />
                      <div className="errorMsgCtr">
                        <ErrorMessage name="firstName" className="eMessage" />
                      </div>
                      <i className="fa fa-calendar-o" />
                      <span>last Name</span>
                      <Field
                        type="text"
                        name="lastName"
                        placeholder="last Name"
                        className="supdetail-form-group_input"
                      />
                      <div className="errorMsgCtr">
                        <ErrorMessage name="lastName" className="eMessage" />
                      </div>

                      <i className="fa fa-calendar-o" />
                      <span>Date</span>
                      <Field
                        type="text"
                        name="Date"
                        placeholder="Date"
                        className="supdetail-form-group_input"
                      />
                      <div className="errorMsgCtr">
                        <ErrorMessage name="Date" className="eMessage" />
                      </div>
                    </div>
                    <div className="supdetail-form-group">
                      <i className="fa fa-calendar-o" />
                      <span>In time</span>
                      <Field
                        type="text"
                        name="in_time"
                        placeholder="In time"
                        className="supdetail-form-group_input"
                      />
                      <div className="errorMsgCtr">
                        <ErrorMessage name="in_time" className="eMessage" />
                      </div>
                      <i className="fa fa-calendar-o" />
                      <span> Out time</span>
                      <Field
                        type="text"
                        name="out_time"
                        placeholder="Out time"
                        className="supdetail-form-group_input"
                      />
                      <div className="errorMsgCtr">
                        <ErrorMessage name="out_time" className="eMessage" />
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
                      
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <table>
            <thead>
              <tr>
                <th>employeeId</th>
                <th>firstName</th>
                <th>lastName</th>
                <th>Date</th>
                <th>in_time</th>
                <th>out_time</th>

              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => (
                <tr key={`test-${i + 1}`}>
                  <td>{item.employeeId}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.Date}</td>
                  <td>{item.in_time}</td>
                  <td>{item.out_time}</td>
                  <td>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={async () => {
                        await fetch("/api/attendanceapi?type=Attendance_delete_one", {
                          method: "POST",
                          headers: {
                            "content-type": "application/json",
                          },
                          body: JSON.stringify({
                            employeeId: item.employeeId,
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
                            employeeId: +item.employeeId,
                            firstName: item.firstName,
                            lastName: item.lastName,
                            Date: item.Date,
                            in_time: item.in_time,
                            out_time: item.out_time,
                         
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
