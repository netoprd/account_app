import React, { Suspense } from 'react'
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import Routpage from './routpage';
import AppLoading from './components/appLoading';
import { toast } from 'react-toastify';
import Navbar from './components/navbar';
// toast.configure({
//   position: "top-center",
//   style: {
//     zIndex: "2000",
//   },
// });
function App() {
  return (

    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<AppLoading />}>
        <Navbar/>  
          <Routpage />
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
