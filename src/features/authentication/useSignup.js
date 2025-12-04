import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUp as apiSignup } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate:  signup, isLoading } = useMutation({
    mutationFn: ({ email, password, fullName }) =>
      apiSignup({ email, password, fullName }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      toast.success("signup successful!");
      navigate("/dashboard", { replace: true });
    },
    onError: (error) => {
      toast.error(`signup failed: ${error.message}`);
    },
  });
  return { signup, isLoading };
}
