import { Outlet } from "react-router-dom";

import NavBar from "./component/header/NavBar";
import Footer from "./component/footer/Footer";

const App: React.FC = () => {
  return (
    <div className="flex flex-col h-screen relative">
      <NavBar />
      <main className="py-8 w-11/12 mx-auto mb-auto pt-20 ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
