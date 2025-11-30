import React from "react";
import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

const CabinTableOperations = () => {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No discount" },
          { value: "with-discount", label: "With discount" },
        ]}
      />
      <SortBy
        options={[
          { value: "name-asc", label: "Sort by Name (A-Z)" },
          { value: "name-desc", label: "Sort by Name (Z-A)" },
          { value: "price-asc", label: "Sort by Price (Low first)" },
          { value: "price-desc", label: "Sort by Price (High first)" },
          { value: "capacity-asc", label: "Sort by Capacity (Low first)" },
          { value: "capacity-desc", label: "Sort by Capacity (High first)" },
        ]}
      />
    </TableOperations>
  );
};

export default CabinTableOperations;
