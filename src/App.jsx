import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MemeGrid from "./components/MemeGrid";
import AddMemeModal from "./components/AddMemeModal";
import { useState } from "react";

export default function App() {
  const [memes, setMemes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const addMeme = (meme) => {
    setMemes([...memes, meme]);
  };

  return (
    <div className="min-h-screen">
      <Navbar openModal={() => setIsOpen(true)} />
      <Hero openModal={() => setIsOpen(true)} />
      
      {/* SECTION – Gallery */}
      <section className="max-w-6xl mx-auto px-6 mt-20">
        <h2 className="text-3xl font-bold mb-4">New Uploded Memes</h2>
        <MemeGrid memes={memes} />
      </section>

      {isOpen && <AddMemeModal close={() => setIsOpen(false)} add={addMeme} />}
    </div>
  );
}
