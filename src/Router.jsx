import { Routes, Route } from "react-router-dom";
import { HomePage } from "./Pages/HomePage";
import { ModelExplorationPage } from "./Pages/ModelExplorationPage";
import { RecommenderPage } from "./Pages/RecommenderPage";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/recommend" element={<RecommenderPage />} />
      <Route path="/explore" element={<ModelExplorationPage />} />
    </Routes>
  );
};
