
import Tabs from "./components/Tabs";
import UserProvider from "./mycontext/context";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Routes> 
            <Route path="/" element={<Tabs />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
