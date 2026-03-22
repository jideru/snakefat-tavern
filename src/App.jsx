
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./ui/pages/HomePage";
import CharacterPage from "./ui/pages/CharacterPage";
import RumourPage from "./ui/pages/RumourPage";
import PartyLootPage from "./ui/pages/PartyLootPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                      element={<HomePage />} />
        <Route path="/rumours"               element={<RumourPage />} />
        <Route path="/character/:name"       element={<CharacterPage />} />
        <Route path="/party-loot/:slug"      element={<PartyLootPage />} />
      </Routes>
    </BrowserRouter>
  );
}
