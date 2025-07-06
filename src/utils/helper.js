import { redirect } from "@tanstack/react-router";
import { getCurrentUser } from "../api/user.api";
import { login } from "../store/slice/authSlice";

export const checkAuth = async ({ context }) => {
    try {
        const { queryClient, store } = context;
        const userData = await queryClient.ensureQueryData({
            queryKey: ["currentUser"],
            queryFn: getCurrentUser,
        });
        
        if(!userData) return false;
        
        // Ensure we're storing the user data in a consistent format
        store.dispatch(login(userData));
        
        const {isAuthenticated} = store.getState().auth;
        if(!isAuthenticated) return false;
        return true
    } catch (error) {
        console.log(error)
        return redirect({to: "/auth",})
    }
};
