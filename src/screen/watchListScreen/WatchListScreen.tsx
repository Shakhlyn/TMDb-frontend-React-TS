import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../slice/hooks";

const WatchListScreen: React.FC = () => {
  const watchList = useAppSelector((state) => state.watchList.movies);

  const sortedMoviesByAddingToWatchlistTime = watchList
    ? [...watchList].sort((a, b) => a.timestamp - b.timestamp)
    : [];
  //watchlist comes from reducer.Hence use copied version.

  return (
    <section className="my-10">
      <h1 className="text-lg font-semibold text-rose-700 bg-yellow-400 w-fit px-2 py-1 rounded">
        Watchlist:
      </h1>

      {watchList.length === 0 && (
        <div className="text-2xl bg-slate-700 text-rose-100 mt-10 mx-auto w-10/12 h-fit p-4 rounded-sm ">
          You have not added movies to your watchlist yet!
        </div>
      )}

      {watchList.length > 0 && (
        <div className="m-4 shadow-sm rounded shadow-rose-900">
          {/* <div className="grid grid-cols-6 gap-4 w-full h-auto p-2"> */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4 w-full h-auto p-2">
            {sortedMoviesByAddingToWatchlistTime &&
              sortedMoviesByAddingToWatchlistTime.map((movie) => (
                <div
                  key={movie.movie.id}
                  className="col-span-1 flex flex-row items-center justify-around h-full hover:scale-110 transition-transform duration-[400ms]"
                >
                  <Link to={`/movies/${movie.movie.id}`} className="w-full">
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${movie.movie.poster_path}`}
                      alt="image"
                      className="w-full h-auto object-cover rounded-lg hover:"
                    />
                    <p className="text-center text-sm mt-2 truncate">
                      {movie.movie.title}
                    </p>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default WatchListScreen;

/*

      <div className="mx-4 my-2 shadow-sm rounded shadow-rose-900">
        <div className="grid grid-cols-6 gap-4 w-full h-auto p-2">
          {movies.map((movie) => (
            
            // <div
            //   key={movie.id}
            //   className="col-span-1 flex flex-row items-center justify-around h-full hover:scale-110 transition-transform duration-[400ms]"
            // >
            //   <Link
            //     to={`/movies/${movie.id}`}
            //     target="_blank"
            //     rel="noopener noreferrer"
            //     className="w-full"
            //   >
            //     <img
            //       src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            //       alt="image"
            //       className="w-full h-auto object-cover rounded-lg hover:"
            //     />
            //     <p className="text-center text-sm mt-2 truncate">
            //       {movie.title}
            //     </p>
            //   </Link>
            // </div>
          // ))}

*/
