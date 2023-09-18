import {BrowserRouter,Routes,Route} from "react-router-dom";
import './App.css';
import Home from "./page/Home";
import PagenotFound from "./page/PagenotFound";

function App() {
  return (
    <div>
    <BrowserRouter>
     <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route paths='/*' element={<PagenotFound/>}></Route>
     </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
