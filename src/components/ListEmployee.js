import React, { useState, useEffect } from "react";
import Employee from "../services/Employee";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  BiXCircle,
  BiEditAlt,
  BiChevronsUp,
  BiChevronsDown,
} from "react-icons/bi";
import LocalSearch from "./LocalSearch";
import { toast } from "react-toastify";

const ListEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [ascending, setAscending] = useState(true);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    Employee.getEmployees().then((res) => {
      setEmployees(res.data);
    });
  }, []);

  const sortAsc = (arr) => {
    let sortedArray = employees;
    arr.sort((a, b) => {
      var nameA = a.firstName.toUpperCase();
      var nameB = b.firstName.toUpperCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
    setEmployees([...sortedArray]);
    setAscending(false);
  };

  const sortDesc = (arr) => {
    let sortedArray = employees;
    arr.sort((a, b) => {
      var nameA = a.firstName.toUpperCase();
      var nameB = b.firstName.toUpperCase();
      if (nameA > nameB) return -1;
      if (nameA < nameB) return 1;
      return 0;
    });
    setEmployees([...sortedArray]);
    setAscending(true);
  };

  const handleDelete = (id) => {
    window.confirm("Are you sure?");
    Employee.deleteEmployee(id).then((res) => {
      toast.error("Successfully deleted.");
      setEmployees(employees.filter((employee) => employee.id !== id));
    });
  };

  const searched = (keyword) => (c) =>
    c.firstName.toLowerCase().includes(keyword);

  return (
    <StyledEmployeeList>
      <h1>Employee List</h1>
      <div className='list__container'>
        <LocalSearch keyword={keyword} setKeyword={setKeyword} />

        <table>
          <thead>
            <tr>
              <th>
                First Name
                {ascending === true ? (
                  <BiChevronsUp
                    className='list__chevron_top'
                    onClick={() => sortAsc(employees)}
                  />
                ) : (
                  <BiChevronsDown
                    className='list__chevron_down'
                    onClick={() => sortDesc(employees)}
                  />
                )}
              </th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.filter(searched(keyword)).map((emp) => (
              <tr key={emp.id}>
                <td>{emp.firstName}</td>
                <td>{emp.lastName}</td>
                <td>{emp.email}</td>
                <td className='list__td_continer'>
                  <Link
                    className='list__update_button'
                    to={"/update-employee/" + emp.id}
                  >
                    <BiEditAlt />
                  </Link>
                  <BiXCircle
                    className='list__delete_button'
                    onClick={() => handleDelete(emp.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </StyledEmployeeList>
  );
};

const StyledEmployeeList = styled.div`
  width: 100vw;
  padding-top: 2rem;
  .list__container {
    width: 70%;
    margin: 0 auto;
  }
  h1 {
    text-align: center;
    margin-bottom: 2rem;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th {
    background-color: #494949;
    color: #f3f3f3;
    padding: 20px 15px;
    text-align: left;
  }
  td {
    padding: 10px 15px;
    border-top: 1px solid #dddddd;
    border-bottom: 1px solid #dddddd;
  }
  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  .list__update_button {
    text-decoration: none;
    color: #1565c0;
    font-size: 1rem;
  }
  .list__delete_button {
    text-decoration: none;
    color: tomato;
    float: right;
    &:hover {
      cursor: pointer;
    }
  }
  td:nth-child(4) {
    width: 50px;
  }
  .list__chevron_top,
  .list__chevron_down {
    font-size: 1.2rem;
    margin-bottom: -5px;
    &:hover {
      cursor: pointer;
    }
  }
`;

export default ListEmployee;
