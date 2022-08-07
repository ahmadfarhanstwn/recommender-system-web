import { Routes, Route } from "react-router-dom";
import { HomePage } from "./Pages/HomePage";
import { RecommenderPage } from "./Pages/RecommenderPage";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/recommend" element={<RecommenderPage />} />
    </Routes>
  );
};
