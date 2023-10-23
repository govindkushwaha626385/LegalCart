import axios from "axios";
import { server } from "../../server";

// get all sellers --- admin
export const getAllLawyers = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllLawyersRequest",
    });

    const { data } = await axios.get(`${server}/lawshop/admin-all-lawyers`, {
      withCredentials: true,
    });

    dispatch({
      type: "getAllLawyersSuccess",
      payload: data.sellers,
    });
  } catch (error) {
    dispatch({
      type: "getAllLawyerFailed",
    //   payload: error.response.data.message,
    });
  }
};
