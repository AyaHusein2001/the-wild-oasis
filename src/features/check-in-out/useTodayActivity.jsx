import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

function useTodayActivity() {
  const { data: stays, isLoading } = useQuery({
    queryKey: ["today-activity"],
    queryFn: () => getStaysTodayActivity(),
  });

  return {
    isLoading,
    stays,
  };
}
export default useTodayActivity;