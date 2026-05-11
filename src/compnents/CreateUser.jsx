import React from "react";
import { useState, useEffect } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { User, Check, Phone, Mail, Tag, AlertCircle } from "react-feather";
import { useNavigate } from "react-router-dom";
import { useCreateUserMutation } from "../Redux/Action";
import "../App.css";
import { toast } from "react-toastify";
const CreateUser = () => {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const [createUser, { isLoading, isSuccess, data, isError, error }] =
    useCreateUserMutation();
  const [userpayload, setUserPayload] = useState({
    name: "",
    phonenumber: "",
    email: "",
    nickname: "",
  });
  // const userpayloadSchema=Yup.object().shape({
  //    name: Yup.string().required,
  //   phonenumber: "",
  //   email: "",
  //   nickname: "",
  // })

  useEffect(() => {
    if (isSuccess === true) {
      toast.success(data, {
        autoClose: "2000",
        onClose: () => navigate("/userlist"),
      });
    }
  }, [data, error]);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={userpayload}
      onSubmit={(fields) => {
        createUser(fields);
        alert(JSON.stringify(fields));
      }}
      render={({ errors, values, setFieldValue }) => {
        return (
          <Form>
            <div className="user-form-page">
              <div className="form-container">
                <div className="form-header">
                  <div className="icon-wrapper">
                    <User className="icon" />
                  </div>
                  <h1>User Management</h1>
                  <p>Create a new user profile</p>
                </div>

                <div className="form-box">
                  {/* Success Message */}

                  {/* Form Fields (UI only) */}
                  <div className="form-fields">
                    <div className="form-group">
                      <label>Full Name</label>
                      <div className="input-icon">
                        <User className="field-icon" />
                        <Field
                          name="name"
                          type="text"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Phone Number</label>
                      <div className="input-icon">
                        <Phone className="field-icon" />
                        <Field
                          name="phonenumber"
                          type="text"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Email Address</label>
                      <div className="input-icon">
                        <Mail className="field-icon" />
                        <Field
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Nickname</label>
                      <div className="input-icon">
                        <Tag className="field-icon" />
                        <Field
                          name="nickname"
                          type="text"
                          placeholder="Enter a nickname"
                        />
                      </div>
                    </div>

                    <div className="form-buttons">
                      <button className="submit-btn" type="submit">
                        {isLoading ? "Loading...." : "Create User"}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="form-footer">
                  <p>All fields are required for user registration</p>
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    />
  );
};

export default CreateUser;
