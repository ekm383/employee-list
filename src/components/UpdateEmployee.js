import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import Employee from "../services/Employee";

// Material UI
import FormGroup from "@mui/material/FormGroup";
import { TextField } from "@mui/material";
import { FormControl } from "@mui/material";
import { Button } from "@mui/material";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
};

const UpdateEmployee = () => {
  const [values, setValues] = useState(initialState);
  const { firstName, lastName, email } = values;
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    Employee.getEmployeeById(id).then((p) => {
      setValues({ ...values, ...p.data });
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;

    // name validation
    if (!values["firstName"]) {
      isValid = false;
    }

    // name validation
    if (!values["lastName"]) {
      isValid = false;
    }

    // name validation
    if (!values["email"]) {
      isValid = false;
    }

    if (isValid) {
      Employee.updateEmployee(id, values).then((res) => {
        toast.success(`${res.data.firstName} successfully updated!`);
        navigate("/employees");
      });
    } else {
      toast.error("All fields are required.");
    }
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <StyledForm>
      <FormGroup className='form__add_employee'>
        <h2>Update Employee</h2>
        <FormControl className='form__form_control'>
          <TextField
            type='text'
            label='First Name'
            name='firstName'
            variant='outlined'
            value={firstName}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl className='form__form_control'>
          <TextField
            type='text'
            label='Last Name'
            name='lastName'
            variant='outlined'
            value={lastName}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl className='form__form_control'>
          <TextField
            type='text'
            label='Email'
            name='email'
            variant='outlined'
            value={email}
            onChange={handleChange}
          />
        </FormControl>
        <br />
        <div className='form__button_group'>
          <Link className='form__cancel_button' to='/'>
            Cancel
          </Link>
          <Button onClick={handleSubmit} variant='contained'>
            Submit
          </Button>
        </div>
      </FormGroup>
    </StyledForm>
  );
};

const StyledForm = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  h2 {
    margin-top: 4rem;
    text-align: center;
  }
  .form__add_employee {
    width: 500px;
  }
  .form__button_group {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .form__form_control {
    margin-bottom: 1rem;
  }
  div.form__button_group a {
    color: #999999;
    text-transform: uppercase;
    font-size: 0.7rem;
    margin-right: 1rem;
    text-decoration: none;
    transition: 0.2s ease-in-out;
    &:hover {
      color: #333333;
    }
  }
`;

export default UpdateEmployee;
