import { customerdetail } from "@prisma/client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { number, object, string, TypeOf } from "yup";

const Home: NextPage = () => {
  const [data, setData] = useState<customerdetail[]>([]);
  const router = useRouter();

  const deleteAllUsers = () => {
    fetch("/api/eventApi?type=customer_delete_all", {
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

  const customerSchema = object({
    cuId: number().nullable(),
    fullName: string().required("Full Name is required"),
    roomNum: string().required("Room Number is required"),
    address: string().required("Address is required"),
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
  const initialValues: TypeOf<typeof customerSchema> = {
    cuId: null,
    fullName: "",
    roomNum: "",
    address: "",
    email: "",
    idNum: "",
    contactNum: "",
  };
  const [initialData, setInitialData] = useState({ ...initialValues });

  const setOrUpdateData = async (
    data: TypeOf<typeof customerSchema>,
    stateX: "create" | "update"
  ) => {
    await fetch(`api/eventApi?type=customer_${stateX}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        fullName: data.fullName,
        roomNum: data.roomNum,
        address: data.address,
        email: data.email,
        idNum: data.idNum,
        contactNum: data.contactNum,
        ...(data?.cuId && { cuId: data.cuId }),
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
      item.cuId,
      item.fullName,
      item.roomNum,
      item.address,
      item.email,
      item.idNum,
      item.contactNum,
    ]);
    return [
      ...[
        [
          "CustomerId",
          "Full Name",
          "Room Number",
          "Address",
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
            router.push("/customer");
          }}
        >
          Customer Details
        </div>
        <div
          className="ctr_item"
          onClick={() => {
            router.push("/event");
          }}
        >
          Event Details
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
              validationSchema={customerSchema}
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
                    <span>Customer Details</span>
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
                      <span>Room number</span>
                      <Field
                        type="text"
                        name="roomNum"
                        placeholder="Room Number"
                        className="supdetail-form-group_input"
                      />
                      <div className="errorMsgCtr">
                        <ErrorMessage name="roomNum" className="eMessage" />
                      </div>

                      <i className="fa fa-calendar-o" />
                      <span>Address</span>
                      <Field
                        type="text"
                        name="address"
                        placeholder="Address"
                        className="supdetail-form-group_input"
                      />
                      <div className="errorMsgCtr">
                        <ErrorMessage name="address" className="eMessage" />
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
                <th>CustomerId</th>
                <th>Full Name</th>
                <th>Room Number</th>
                <th>Address</th>
                <th>E-mail</th>
                <th>ID Number</th>
                <th>Contact Number</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => (
                <tr key={`test-${i + 1}`}>
                  <td>{item.cuId}</td>
                  <td>{item.fullName}</td>
                  <td>{item.roomNum}</td>
                  <td>{item.address}</td>
                  <td>{item.email}</td>
                  <td>{item.idNum}</td>
                  <td>{item.contactNum}</td>
                  <td>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={async () => {
                        await fetch("/api/eventApi?type=customer_delete_one", {
                          method: "POST",
                          headers: {
                            "content-type": "application/json",
                          },
                          body: JSON.stringify({
                            cuId: item.cuId,
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
                          cuId: +item.cuId,
                          fullName: item.fullName,
                          roomNum: item.roomNum,
                          address: item.address,
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
