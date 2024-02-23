import { Outlet } from "react-router-dom";

import NavBar from "./component/header/NavBar";
import Footer from "./component/footer/Footer";

const App: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <main className="py-8 mobile:w-[96%] md:w-11/12 mx-auto mb-auto ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
