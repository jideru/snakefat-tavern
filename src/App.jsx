
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./ui/pages/HomePage";
import CharacterPage from "./ui/pages/CharacterPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/character/:name" element={<CharacterPage />} />
      </Routes>
    </BrowserRouter>
  );
}
