import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as apiDeleteBooking } from "../../services/apiBookings";
export const useDeleteBooking = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteBooking, isLoading: isDeleting } = useMutation({
    mutationFn: (bookingId) => apiDeleteBooking(bookingId),

    onSuccess: (data) => {
      toast.success(`Booking deleted successfully!`);
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },

    onError: (error) => {
      console.error("Delete booking failed:", error);
    },
  });

  return { deleteBooking, isDeleting };
};
