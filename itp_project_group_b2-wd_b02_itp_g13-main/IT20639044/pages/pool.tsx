import { pooldetail } from "@prisma/client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { number, object, string, TypeOf } from "yup";

const Home: NextPage = () => {
  const [data, setData] = useState<pooldetail[]>([]);
  const router = useRouter();

  const deleteAllUsers = () => {
    fetch("/api/poolApi?type=pool_delete_all", {
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

  const poolSchema = object({
    poolId: number().nullable(),
    fullName: string().required("Full Name is required"),
    numAttendance: string().required("Number of Attendance Type is required"),
    date: string().required("Use Date is required"),
    time: string().required("Use Time is required"),
    
  });

  const [formState, setFormState] = useState<"create" | "update">("create");
  const initialValues: TypeOf<typeof poolSchema> = {
    poolId: null,
    fullName: "",
    numAttendance: "",
    date: "",
    time: "",
    
  };
  const [initialData, setInitialData] = useState({ ...initialValues });

  const setOrUpdateData = async (
    data: TypeOf<typeof poolSchema>,
    stateX: "create" | "update"
  ) => {
    await fetch(`api/poolApi?type=pool_${stateX}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        fullName: data.fullName,
        numAttendance: data.numAttendance,
        date: data.date,
        time: data.time,
        
        ...(data?.poolId && { poolId: data.poolId }),
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
    fetch("api/parkingApi?type=parking_get")
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
      item.poolId,
      item.fullName,
      item.numAttendance,
      item.date,
      item.time,
      
    ]);
    return [
      ...[
        [
          "PoolId",
          "Full Name",
          "Number of Attendance",
          "Use Date",
          "Use Tume",
         
          
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
            router.push("/parking");
          }}
        >
          Parking Details
        </div>
        <div
          className="ctr_item"
          onClick={() => {
            router.push("/pool");
          }}
        >
          Pool Details
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
              validationSchema={poolSchema}
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
                    <span>Pool Details</span>
                  </div>

                  <div className="supdetail-form-body">
                    <div className="supdetail-form-group">
                      <i className="fa fa-calendar-o" />
                      <span>Full Name</span>
                      <Field
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        className="supdetail-form-group_input"
                      />
                      <div className="errorMsgCtr">
                        <ErrorMessage name="fullName" className="eMessage" />
                      </div>
                      <i className="fa fa-calendar-o" />
                      <span>Number of Attendance</span>
                      <Field
                        type="text"
                        name="numAttendance"
                        placeholder="Number of Attendance"
                        className="supdetail-form-group_input"
                      />
                      <div className="errorMsgCtr">
                        <ErrorMessage name="numAttendance" className="eMessage" />
                      </div>

                      <i className="fa fa-calendar-o" />
                      <span>Use Date</span>
                      <Field
                        type="text"
                        name="date"
                        placeholder="Use Date"
                        className="supdetail-form-group_input"
                      />
                      <div className="errorMsgCtr">
                        <ErrorMessage name="date" className="eMessage" />
                      </div>
                    </div>
                    <div className="supdetail-form-group">
                      <i className="fa fa-calendar-o" />
                      <span>Use Time</span>
                      <Field
                        type="text"
                        name="time"
                        placeholder="Use Time"
                        className="supdetail-form-group_input"
                      />
                      <div className="errorMsgCtr">
                        <ErrorMessage name="time" className="eMessage" />
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
                        filename="Pool Data"
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
                <th>PoolId</th>
                <th>Full Name</th>
                <th>Number of Attendance</th>
                <th>Use Date</th>
                <th>Use Time</th>
                
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => (
                <tr key={`test-${i + 1}`}>
                  <td>{item.poolId}</td>
                  <td>{item.fullName}</td>
                  <td>{item.numAttendance}</td>
                  <td>{item.date}</td>
                  <td>{item.time}</td>
                 
                  
                  <td>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={async () => {
                        await fetch("/api/poolApi?type=pool_delete_one", {
                          method: "POST",
                          headers: {
                            "content-type": "application/json",
                          },
                          body: JSON.stringify({
                            cuId: item.poolId,
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
                          poolId: item.poolId,
                          fullName: item.fullName,
                          numAttendance: item.numAttendance,
                          date: item.date,
                          time: item.time,
                          
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
