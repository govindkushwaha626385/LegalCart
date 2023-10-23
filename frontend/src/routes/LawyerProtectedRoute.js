import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/Layout/Loader";

const LawyerProtectedRoute = ({ children }) => {
  const { isLoading, isLawyer } = useSelector((state) => state.lawyer);
  if (isLoading === true) {
    return <Loader />;
  } else {
    if (!isLawyer) {
      return <Navigate to={`/lawshop-login`} replace />;
    }
    return children;
  }
};

export default LawyerProtectedRoute;
