import { FaSistrix } from "react-icons/fa6";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateRange: React.FC = () => {
  const currentDate = new Date();
  const firstDayOfPreviousMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1, // Subtract 1 to get the previous month
    1
  );

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const [startDate, setStartDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>();

  const [defaultStartDate, setDefaultStartDate] = useState<string>(
    formatDate(currentDate)
  );
  const [defaultEndDate, setDefaultEndDate] = useState<string>(
    formatDate(firstDayOfPreviousMonth)
  );

  const navigate = useNavigate();

  // console.log(defaultStartDate, defaultEndDate);
  // console.log(startDate, endDate);

  const changeDateHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (startDate && endDate) {
      const startTimestamp = startDate.getTime(); // Get timestamp of startDate
      const endTimestamp = endDate.getTime(); // Get timestamp of endDate

      if (startTimestamp <= endTimestamp) {
        // Check if startDate is earlier or equal to endDate

        // if startDate and endDate are given update default startDate and endDate
        setDefaultStartDate(formatDate(startDate));
        setDefaultEndDate(formatDate(endDate));
        navigate(
          `/movie?start-date=${defaultStartDate}&end-date=${defaultEndDate}`
        );
      } else {
        alert("Start date cannot be after end date.");
      }
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
        selected={startDate}
        onChange={(date: Date | null) => setStartDate(date)}
        className="mx-2 px-2 py-1 rounded-sm text-black text-mobile sm:text-sm mobile:w-20 md:w-20"
        placeholderText="Start Date"
        dateFormat="dd-MM-yyyy"
      />
      <span> - </span>
      <DatePicker
        selected={endDate}
        onChange={(date: Date | null) => setEndDate(date)}
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
