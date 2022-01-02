import React from "react";
import styled from "styled-components";

const LocalSearch = ({ keyword, setKeyword }) => {
  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <StyledSearch>
      <input
        type='text'
        label='Standard'
        value={keyword}
        placeholder='Filter'
        className='search_input'
        onChange={handleSearchChange}
      />
    </StyledSearch>
  );
};

const StyledSearch = styled.div`
  input[type="text"] {
    box-sizing: border-box;
    box-shadow: none;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid #666666;
    font-size: 0.8rem;
    margin-bottom: 1rem;
    padding: 5px 0px;
  }
  input:focus {
    outline: none;
  }
`;

export default LocalSearch;
