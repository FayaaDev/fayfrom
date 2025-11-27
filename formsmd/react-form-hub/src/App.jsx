import { BrowserRouter, Routes, Route } from "react-router-dom";
import HubLayout from "./layouts/HubLayout";
import HomePage from "./pages/HomePage";
import DemoFormPage from "./pages/DemoFormPage";
import FeedbackFormPage from "./pages/FeedbackFormPage";
import TesterFormPage from "./pages/TesterFormPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HubLayout />}>
          <Route index element={<HomePage />} />
          <Route path="demo-form" element={<DemoFormPage />} />
          <Route path="feedback-form" element={<FeedbackFormPage />} />
          <Route path="tester-form" element={<TesterFormPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
