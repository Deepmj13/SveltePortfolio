import { useEffect,useState } from "react";
import About from "./components/About";
import Hero from "./components/Hero";
import './App.css';

function App() {
const [loading, setLoading] = useState(true)

useEffect(()=>{
  setLoading(false)
},[])
  return (
    <>
      {loading && <div className="loader"></div>}
      <Hero />
      <About />
    </>
  );
}

export default App;