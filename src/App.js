import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Business/Login";
import SignUp from "./Business/SignUp";
import Main from "./Business/Main";
import PrivateRoute from "./PrivateRoute";
import Menu from "./Business/Menu/Menu";
import Edit from "./Business/Menu/Edit";
import Add from "./Business/Menu/Add";





function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* 메인 */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Main />
            </PrivateRoute>
          }
        />
        <Route
          path="/main"
          element={
            // <PrivateRoute>
              <Main />
            /* </PrivateRoute> */
          }
        />
        <Route
          path="/menu"
          element={
            <PrivateRoute>
              <Menu />
            </PrivateRoute>
          }
        />

          <Route
          path="/menu/add"
          element={
            <PrivateRoute>
              <Add />
            </PrivateRoute>
          }
        />
        <Route
          path="/menu/:menuId/edit"
          element={
            <PrivateRoute>
              <Edit />
            </PrivateRoute>
          }
        />
      
        

      </Routes>
    </BrowserRouter>
  );
}

export default App;
