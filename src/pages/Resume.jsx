import React, { useState } from "react";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import { Link } from "react-router-dom";
const Resume = () => {
  const [favorites, setFavorites] = useState([]);

  const products = [
    {
      id: 1,
      name: "Modern Minimal",
      price: "$99.99",
      image: "/templates/ats_resume.png",
    },
    {
      id: 2,
      name: "Crystal Clean",
      price: "$249.99",
      image: "/templates/ats_resume1.png",
    },
    {
      id: 3,
      name: "Urban Professional",
      price: "$45.99",
      image: "/templates/ats_resume2.jpeg",
    },
    {
      id: 4,
      name: "NeatLine Resume",
      price: "$129.99",
      image: "/templates/ats_resume3.jpeg",
    },
    {
      id: 5,
      name: "Metro Clean",
      price: "$34.99",
      image: "/templates/ats_resume4.png",
    },
    {
      id: 6,
      name: "Polished Corporate",
      price: "$79.99",
      image: "/templates/ats_resume5.webp",
    },
    {
      id: 7,
      name: "ClearView Template",
      price: "$39.99",
      image: "/templates/ats_resume.png",
    },
    {
      id: 8,
      name: "Blue Accent Modern",
      price: "$59.99",
      image: "/templates/ats_resume.png",
    },
    {
      id: 9,
      name: "Soft Shadow Layout",
      price: "$19.99",
      image: "/templates/ats_resume.png",
    },
    {
      id: 10,
      name: "GridLite Resume",
      price: "$29.99",
      image: "/templates/ats_resume.png",
    },
    {
      id: 11,
      name: "Creative Edge",
      price: "$69.99",
      image: "/templates/ats_resume.png",
    },
    {
      id: 12,
      name: "Bold Header Resume",
      price: "$199.99",
      image: "/templates/ats_resume.png",
    },
    {
      id: 13,
      name: "WiVibrant Profile",
      price: "$89.99",
      image: "/templates/ats_resume.png",
    },
    {
      id: 14,
      name: "Gradient Splash",
      price: "$24.99",
      image: "/templates/ats_resume.png",
    },
    {
      id: 15,
      name: "ColorBand Resume",
      price: "$14.99",
      image: "/templates/ats_resume.png",
    },
    {
      id: 16,
      name: "Signature Style",
      price: "$22.99",
      image: "/templates/ats_resume.png",
    },
    {
      id: 17,
      name: "Spectrum Layout",
      price: "$32.99",
      image: "/templates/ats_resume.png",
    },
    {
      id: 18,
      name: "Shadow Border Template",
      price: "$79.99",
      image: "/templates/ats_resume.png",
    },
    {
      id: 19,
      name: "Accent Bar Resume",
      price: "$18.99",
      image: "/templates/ats_resume.png",
    },
    {
      id: 20,
      name: "Stylish Profile Template",
      price: "$54.99",
      image: "/templates/ats_resume.png",
    },
    {
      id: 21,
      name: "Screen PrExecutive Pro",
      price: "$12.99",
      image: "/templates/ats_resume.png",
    },
    {
      id: 22,
      name: "Phone HClassic Corporate",
      price: "$16.99",
      image: "/templates/ats_resume.png",
    },
    {
      id: 23,
      name: "Elite Executive",
      price: "$21.99",
      image: "/templates/ats_resume.png",
    },
    {
      id: 24,
      name: "Business Standard",
      price: "$15.99",
      image: "/templates/ats_resume.png",
    },
  ];

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id],
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 flex flex-col md:flex-row  md:items-center gap-6">
          <div className="flex flex-col w-[75%]">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-3">
              Use Templates
            </h1>
            <p className="text-slate-600 text-lg">
              Discover our curated collection of templates designed to help you
            </p>
          </div>

          <div className="flex gap-4 md:ml-auto">
            <button
              type="button"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition shadow-lg"
            >
              <Link to="/builder">Add Resume</Link>
            </button>
            <button
              type="button"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition shadow-lg"
            >
              <Link to="/resume_list">Resume List</Link>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative overflow-hidden aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                    <button className="flex-1 bg-white text-slate-800 py-2 px-4 rounded-lg font-medium hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
                      <Eye size={18} />
                      <span className="text-sm">Use This Template</span>
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                >
                  <Heart
                    size={20}
                    className={
                      favorites.includes(product.id)
                        ? "fill-red-500 text-red-500"
                        : "text-slate-600"
                    }
                  />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-slate-800 text-lg mb-1 truncate">
                  {product.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resume;
