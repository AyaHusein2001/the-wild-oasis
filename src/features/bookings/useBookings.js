import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searchParams] = useSearchParams();
  //1-Filter
  const filterValue = searchParams.get("status") || "all";
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue, operator: "eq" };

  //2-SortBy
  const sortByRow = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortByRow?.split("-");
  const sortBy =  { field, direction } ;

  //3-Pagination
    const page = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));
  const {
    data: { data: bookings, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy,page],
    queryFn: () => getBookings({ filter ,sortBy,page }),
  });
  return {
    bookings,
    count,
    isLoading,
    error,
  };
}
