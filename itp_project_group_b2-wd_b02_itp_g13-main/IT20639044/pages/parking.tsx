import { parkingdetail } from "@prisma/client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { number, object, string, TypeOf } from "yup";

const Home: NextPage = () => {
  const [data, setData] = useState<parkingdetail[]>([]);
  const router = useRouter();

  const deleteAllUsers = () => {
    fetch("/api/parkingApi?type=parking_delete_all", {
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

  const parkingSchema = object({
    parkId: number().nullable(),
    fullName: string().required("Full Name is required"),
    vehicleType: string().required("Vehicle Type is required"),
    vehicleregNum: string().required("Vehicle Registraion Number is required"),
    email: string()
      .required("Email is required")
      .email("It is not a valid Email"),
    idNum: string()
      .required()
      .matches(/^[0-9]{9}[x|X|v|V]$/, "It is not a valid NIC"),
    contactNum: string()
      .required()
      .matches(
        /^(?:7|0|(?:\+94))[0-9]{9,10}$/,
        "It is not a valid Phone Number"
      ),
  });

  const [formState, setFormState] = useState<"create" | "update">("create");
  const initialValues: TypeOf<typeof parkingSchema> = {
    parkId: null,
    fullName: "",
    vehicleType: "",
    vehicleregNum: "",
    email: "",
    idNum: "",
    contactNum: "",
  };
  const [initialData, setInitialData] = useState({ ...initialValues });

  const setOrUpdateData = async (
    data: TypeOf<typeof parkingSchema>,
    stateX: "create" | "update"
  ) => {
    await fetch(`api/parkingApi?type=parking_${stateX}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        fullName: data.fullName,
        vehicleType: data.vehicleType,
        vehicleregNum: data.vehicleregNum,
        email: data.email,
        idNum: data.idNum,
        contactNum: data.contactNum,
        ...(data?.parkId && { cuId: data.parkId }),
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
      item.parkId,
      item.fullName,
      item.vehicleType,
      item.vehicleregNum,
      item.email,
      item.idNum,
      item.contactNum,
    ]);
    return [
      ...[
        [
          "ParkingId",
          "Full Name",
          "Vehicle Type",
          "Vehicle registration Number",
          "E-mail",
          "ID Number",
          "Contact Number",
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
              validationSchema={parkingSchema}
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
                    <span>Parking Details</span>
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
                      <span>Vehicle Type</span>
                      <Field
                        type="text"
                        name="vehicleType"
                        placeholder="Vehicle Type"
                        className="supdetail-form-group_input"
                      />
                      <div className="errorMsgCtr">
                        <ErrorMessage name="vehicleType" className="eMessage" />
                      </div>

                      <i className="fa fa-calendar-o" />
                      <span>Vehicle Registered Number</span>
                      <Field
                        type="text"
                        name="vehicleregNum"
                        placeholder="vehicleRegNum"
                        className="supdetail-form-group_input"
                      />
                      <div className="errorMsgCtr">
                        <ErrorMessage name="vehicleregNum" className="eMessage" />
                      </div>
                    </div>
                    <div className="supdetail-form-group">
                      <i className="fa fa-calendar-o" />
                      <span>E-mail</span>
                      <Field
                        type="text"
                        name="email"
                        placeholder="Email"
                        className="supdetail-form-group_input"
                      />
                      <div className="errorMsgCtr">
                        <ErrorMessage name="email" className="eMessage" />
                      </div>
                      <i className="fa fa-calendar-o" />
                      <span> ID Number</span>
                      <Field
                        type="text"
                        name="idNum"
                        placeholder="NIC"
                        className="supdetail-form-group_input"
                      />
                      <div className="errorMsgCtr">
                        <ErrorMessage name="idNum" className="eMessage" />
                      </div>
                      <i className="fa fa-calendar-o" />
                      <span>Contact Number</span>
                      <Field
                        type="text"
                        name="contactNum"
                        placeholder="Contact Number"
                        className="supdetail-form-group_input"
                      />
                      <div className="errorMsgCtr">
                        <ErrorMessage name="contactNum" className="eMessage" />
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
                        filename="Parking Data"
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
                <th>ParkingId</th>
                <th>Full Name</th>
                <th>Vehicle Type</th>
                <th>Vehicle Registered Number</th>
                <th>E-mail</th>
                <th>ID Number</th>
                <th>Contact Number</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => (
                <tr key={`test-${i + 1}`}>
                  <td>{item.parkId}</td>
                  <td>{item.fullName}</td>
                  <td>{item.vehicleType}</td>
                  <td>{item.vehicleregNum}</td>
                  <td>{item.email}</td>
                  <td>{item.idNum}</td>
                  <td>{item.contactNum}</td>
                  <td>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={async () => {
                        await fetch("/api/parkingApi?type=parking_delete_one", {
                          method: "POST",
                          headers: {
                            "content-type": "application/json",
                          },
                          body: JSON.stringify({
                            cuId: item.parkId,
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
                          parkId: item.parkId,
                          fullName: item.fullName,
                          vehicleType: item.vehicleType,
                          vehicleregNum: item.vehicleregNum,
                          email: item.email,
                          idNum: item.idNum,
                          contactNum: item.contactNum,
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
