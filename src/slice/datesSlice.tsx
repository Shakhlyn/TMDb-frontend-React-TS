import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { formatDate } from "../utils/Date";

const currentDate = new Date();
const firstDayOfPreviousMonth = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth() - 1, // Subtract 1 to get the previous month
  1
);

interface DateStateType {
  startDate: string;
  endDate: string;
}

const initialState: DateStateType = {
  startDate: formatDate(firstDayOfPreviousMonth),
  endDate: formatDate(currentDate),
};

const datesSlice = createSlice({
  name: "dates",
  initialState,
  reducers: {
    setStartDate(state, action: PayloadAction<string>) {
      state.startDate = action.payload;
    },
    setEndDate(state, action: PayloadAction<string>) {
      state.endDate = action.payload;
    },
  },
});

export const { setStartDate, setEndDate } = datesSlice.actions;
export default datesSlice.reducer;
