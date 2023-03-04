import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './pages/register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/login';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Video from './pages/Video';
function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/home' element={<Home />} />
          <Route exact path='/dashboard' element={<Dashboard />} />
          <Route exact path='/video/:videoId' element={<Video />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
