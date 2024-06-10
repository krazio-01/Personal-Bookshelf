import Home from "./pages/home/Home";
import Bookshelf from "./pages/bookshelf/Bookshelf";
import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <main className="app-main">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/bookshelf" element={<Bookshelf />} />
            </Routes>
        </main>
    );
}

export default App;