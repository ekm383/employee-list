import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Employee from "../services/Employee";
import styled from "styled-components";

const ViewEmployee = () => {
  const [employee, setEmployee] = useState({});
  const params = useParams();

  useEffect(() => {
    Employee.getEmployeeById(params.id).then((res) => {
      setEmployee(res.data);
    });
  }, []);

  function titleCase(string) {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
  }

  const { firstName, lastName, email } = employee;

  return (
    <StyledProfile>
      <h1>
        {titleCase(firstName)} {titleCase(lastName)}
      </h1>
      <p>{email}</p>
    </StyledProfile>
  );
};

const StyledProfile = styled.div`
  width: 50vw;
  margin: 4rem auto 0 auto;
  text-align: center;
`;

export default ViewEmployee;
