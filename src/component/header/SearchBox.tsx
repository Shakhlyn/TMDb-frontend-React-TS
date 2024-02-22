import { FaSistrix } from "react-icons/fa6";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SearchBox: React.FC = () => {
  const { searchKeyword } = useParams();
  const [urlSearchKeyword, setUrlSearchKeyword] = useState(searchKeyword || "");

  const navigate = useNavigate();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrlSearchKeyword(e.target.value);
  };

  const searchHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (urlSearchKeyword.trim()) {
    //   searchParams.searchKeyword = urlSearchKeyword.trim().split(" ").join("-");
    // }

    if (urlSearchKeyword.trim()) {
      setUrlSearchKeyword("");
      navigate(`/movies/${urlSearchKeyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <form onSubmit={searchHandler} className="flex flex-row mx-1">
      <input
        className="px-2 py-1 rounded-s text-black text-mobile sm:text-sm mobile:w-32 md:w-96"
        type="text"
        placeholder="Search what movie you want"
        name="search"
        value={urlSearchKeyword}
        onChange={changeHandler}
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

export default SearchBox;
