import AuthPage from "./pages/Auth";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TodoPage from "./pages/Todo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoPage />} />
        <Route path="/login" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
