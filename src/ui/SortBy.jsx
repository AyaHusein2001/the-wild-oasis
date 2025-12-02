import React from "react";
import Select from "./Select";
import { useSearchParams } from "react-router-dom";

const SortBy = ({ options }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentValue = searchParams.get("sortBy") || options.at(0).value;

  const handleChange = (e) => {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  };
  return (
    <Select
      options={options}
      value={currentValue}
      type="white"
      onChange={handleChange}
    />
  );
};

export default SortBy;
