import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AnniversaryPage from "./pages/AnniversaryPage";
import OurStoryPage from "./pages/OurStoryPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AnniversaryPage />} />
        <Route path="/anniversary" element={<OurStoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
