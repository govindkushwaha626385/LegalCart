import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const lawyerReducer = createReducer(initialState, {
  LoadLawyerRequest: (state) => {
    state.isLoading = true;
  },
  LoadLawyerSuccess: (state, action) => {
    state.isLawyer = true;
    state.isLoading = false;
    state.lawyer = action.payload;
  },
  LoadLawyerFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.isLawyer = false;
  },

  // get all lawyers ---admin
  getAllLawyersRequest: (state) => {
    state.isLoading = true;
  },
  getAllLawyersSuccess: (state, action) => {
    state.isLoading = false;
    state.lawyers = action.payload;
  },
  getAllLawyerFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});
