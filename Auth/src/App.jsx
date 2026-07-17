import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./component/Signup";
import Login from "./component/Login";
import Layout from "./component/Layout";
import Dashboard from "./component/app/Dashboad";
import File from "./component/app/File";
import History from "./component/app/History";
import { AuthProvider, ProtectedRoute } from "./context/Authprovider";



function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Layout />} >
            <Route index element={<Dashboard />} />
            <Route path="file" element={<File />} />
            <Route path="history" element={<History />} />    
          </Route> 
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
