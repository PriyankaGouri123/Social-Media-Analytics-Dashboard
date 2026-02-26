import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DashboardCards from "./components/DashboardCards";
import ChartsSection from "./components/ChartsSection";
import Login from "./components/Login";
import Signup from "./components/Signup";
import YT from "./components/yt";
import IG from "./components/ig";
import X from "./components/x";
import About from "./components/About";

function App() {
  return (
    <Router>
      {/* ✅ Global base styles */}
      <div className="min-h-screen flex flex-col bg-background text-foreground">

        <Navbar />

        <div className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <header className="p-6 text-center">
                    <h1 className="text-3xl font-bold">
                      Welcome to Social Media Analytics Dashboard
                    </h1>
                    <p className="text-muted-foreground mt-2">
                      Track reach, followers, likes, and posts in one place
                    </p>
                  </header>

                  <DashboardCards />
                  <ChartsSection />
                </>
              }
            />

            {/* <Route path="/login" element={<Login />} /> */}
            {/* <Route path="/signup" element={<Signup />} /> */}
            <Route path="/about" element={<About />} />
            <Route path="/youtube" element={<YT />} />
            <Route path="/instagram" element={<IG />} />
            <Route path="/twitter" element={<X />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
