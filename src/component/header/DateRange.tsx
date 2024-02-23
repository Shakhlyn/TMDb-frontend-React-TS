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
      <div>
        <DatePicker
          selected={searchStartDate}
          onChange={(date: Date | null) => setSearchStartDate(date)}
          placeholderText="Start Date"
          dateFormat="dd-MM-yyyy"
          className=" mobile:mx-[.125rem] sm:mx-1 mobile:w-14 sm:w-20 md:w-24 rounded-sm mobile:text-mobile sm:text-sm text-center text-gray-900"
        />
        <span>-</span>
        <DatePicker
          selected={searchEndDate}
          onChange={(date: Date | null) => setSearchEndDate(date)}
          placeholderText="End Date"
          dateFormat="dd-MM-yyyy"
          className=" mobile:mx-[.125rem] sm:mx-2 mobile:w-14 sm:w-20 md:w-24 rounded-sm mobile:text-mobile sm:text-sm text-center text-gray-900"
        />
        <button
          type="submit"
          className=" ml-2 mobile:text-mobile sm:text-sm md:text-lg  grid-cols-1 pb-1"
        >
          <div className="place-self-center">Search</div>
        </button>
      </div>
    </form>
  );
};

export default DateRange;
