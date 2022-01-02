import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import ListEmployee from "./components/ListEmployee";
import CreateEmployee from "./components/CreateEmployee";
import UpdateEmployee from "./components/UpdateEmployee";

function App() {
  return (
    <div className='App'>
      <Header />
      <ToastContainer />
      <Routes>
        <Route exact element={<ListEmployee />} path='/' />
        <Route exact element={<ListEmployee />} path='/employees' />
        <Route exact element={<CreateEmployee />} path='/create-employee' />
        <Route exact element={<UpdateEmployee />} path='/update-employee/:id' />
      </Routes>
    </div>
  );
}

export default App;
