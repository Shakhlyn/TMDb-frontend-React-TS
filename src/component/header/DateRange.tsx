import { FaSistrix } from "react-icons/fa6";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateRange: React.FC = () => {
  const { startDate, endDate } = useParams();

  const [start, setStart] = useState<Date | null>(
    startDate ? new Date(startDate) : null
  );
  const [end, setEnd] = useState<Date>(
    endDate ? new Date(endDate) : new Date()
  );

  const navigate = useNavigate();

  const searchHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let searchParams: any = {};

    if (start) {
      searchParams.startDate = formatDate(start);
    }

    if (end) {
      searchParams.endDate = formatDate(end);
    }

    navigate(`/movie/?${new URLSearchParams(searchParams).toString()}`);
  };

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <form onSubmit={searchHandler} className="flex flex-row mx-1">
      <span> Date Range: </span>
      <DatePicker
        selected={start}
        onChange={(date: Date | null) => setStart(date)}
        className="mx-2 px-2 py-1 rounded-sm text-black text-mobile sm:text-sm mobile:w-20 md:w-20"
        placeholderText="Start Date"
        dateFormat="dd-MM-yyyy"
      />
      <span> - </span>
      <DatePicker
        selected={end}
        onChange={(date: Date) => setEnd(date)}
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
