import { FaSistrix } from "react-icons/fa6";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useAppDispatch } from "../../slice/hooks";
import { setStartDate, setEndDate } from "../../slice/datesSlice";

import { formatDate } from "../../utils/Date";

const DateRange: React.FC = ({}) => {
  const [searchStartDate, setSearchStartDate] = useState<Date | null>();
  const [searchEndDate, setSearchEndDate] = useState<Date | null>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const changeDateHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchStartDate && searchEndDate) {
      dispatch(setStartDate(formatDate(searchStartDate)));
      dispatch(setEndDate(formatDate(searchEndDate)));

      const startTimestamp = searchStartDate.getTime(); // Get timestamp of searchStartDate
      const endTimestamp = searchEndDate.getTime(); // Get timestamp of searchEndDate

      if (startTimestamp <= endTimestamp) {
        // Check if searchStartDate is earlier or equal to searchEndDat
        navigate(
          `/movies/${formatDate(searchStartDate)}/${formatDate(searchEndDate)}`
        );
      } else {
        alert("Start date cannot be after end date.");
      }
      // setSearchStartDate(null);
      // setSearchEndDate(null);
    } else {
      alert(
        "Please selecet both the start date and the end date to search movies between the two dates!"
      );
    }
  };

  return (
    <form onSubmit={changeDateHandler} className="flex flex-row mx-1">
      <span> Date Range: </span>
      <DatePicker
        selected={searchStartDate}
        onChange={(date: Date | null) => setSearchStartDate(date)}
        className="mx-2 px-2 py-1 rounded-sm text-black text-mobile sm:text-sm mobile:w-20 md:w-20"
        placeholderText="Start Date"
        dateFormat="dd-MM-yyyy"
      />
      <span> - </span>
      <DatePicker
        selected={searchEndDate}
        onChange={(date: Date | null) => setSearchEndDate(date)}
        className="ml-2 px-2 py-1 rounded-s-sm text-black text-mobile sm:text-sm mobile:w-20 md:w-20"
        placeholderText="End Date"
        dateFormat="dd-MM-yyyy"
      />
      <button
        type="submit"
        className="px-2 py-1 bg-slate-400 hover:bg-slate-300 text-slate-100 hover:text-darkGray duration-300 rounded-e text-mobile sm:text-sm"
      >
        <FaSistrix />
      </button>
    </form>
  );
};

export default DateRange;
