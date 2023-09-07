import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import {Home} from "./pages/Home"
import { Login } from './pages/Login';
import { CreatePost } from './pages/create-post';
import { Navbar } from './components/navbar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config/firebase-config';

function App() {

  const [userInfo]=useAuthState(auth);
  
   const ProtectedRoute = ({children}) => {
    //If there is no current user navigate to '/login' page
    if(!userInfo){
      return <Navigate to="/login" />
    }
    return children;
  }
  
  return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" >
          <Route 
          index
          element={<ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                  }
                />
          <Route path="login" element={<Login />}/>
          <Route path="createpost" element={<CreatePost />}/>
          </Route>
        </Routes>
      </Router>
      
    );
}

export default App;
