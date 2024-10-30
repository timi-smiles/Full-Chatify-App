import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/Home"
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./style.scss"
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


function App() {

  const {currentUser} = useContext(AuthContext)

  // console.log(currentUser)

  // Protected Route
  const ProtectedRoute = ({children}) => {
    if (!currentUser) {
      return <Navigate to="/login"></Navigate>
    }
    return children
  }

  return(
    <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={<ProtectedRoute>
          <Home></Home>
        </ProtectedRoute> }></Route>
        <Route path="login" element={<Login></Login>}></Route>
        <Route path="register" element={<Register></Register>}></Route>

      </Route>
    </Routes>
    </BrowserRouter>

    // <Register></Register>
    // <Login></Login>
    // <Home></Home>

  );
}
 
export default App;
