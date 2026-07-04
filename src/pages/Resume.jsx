import React, { useState, useMemo } from "react";
import {
  ShoppingCart,
  Heart,
  Eye,
  ArrowLeft,
  Search,
  Plus,
  List,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Resume = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [query, setQuery] = useState("");

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
      name: "Vibrant Profile",
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
      name: "Executive Pro",
      price: "$12.99",
      image: "/templates/ats_resume.png",
    },
    {
      id: 22,
      name: "Classic Corporate",
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

  const filtered = useMemo(
    () =>
      products.filter((p) =>
        p.name.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [query],
  );

  return (
    <div
      className="min-h-screen p-4 md:p-8"
      style={{ backgroundColor: "#FAF8F4" }}
    >
      {/* Optional: add these to your index.html <head> for the intended type pairing
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap" rel="stylesheet">
      */}
      <div
        className="max-w-7xl mx-auto"
        style={{ fontFamily: "Inter, ui-sans-serif, system-ui" }}
      >
        {/* Back navigation */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 mb-6 text-sm font-medium transition-colors"
          style={{ color: "#55606C" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#1B2430")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#55606C")}
        >
          <ArrowLeft size={16} />
          Back
        </button>

        {/* Header */}
        <div
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-8"
          style={{ borderBottom: "1px solid #E7E3D8" }}
        >
          <div>
            <p
              className="text-xs font-medium tracking-widest uppercase mb-3"
              style={{ color: "#C98A2E" }}
            >
              {products.length} Templates
            </p>
            <h1
              className="text-4xl md:text-5xl font-semibold mb-3"
              style={{
                fontFamily: "'Source Serif 4', Georgia, serif",
                color: "#1B2430",
              }}
            >
              Choose your template
            </h1>
            <p className="text-base max-w-md" style={{ color: "#6B7280" }}>
              Every layout here is built to pass ATS screening and read cleanly
              to a human. Pick a starting point, then make it yours.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <div
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white"
              style={{ border: "1px solid #E7E3D8" }}
            >
              <Search size={16} style={{ color: "#9CA3AF" }} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search templates"
                className="bg-transparent outline-none text-sm w-40"
                style={{ color: "#1B2430" }}
              />
            </div>
            <Link
              to="/resume_list"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-white transition-colors"
              style={{ border: "1px solid #E7E3D8", color: "#1B2430" }}
            >
              <List size={16} />
              My Resumes
            </Link>
            <Link
              to="/builder"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white shadow-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#1B2430" }}
            >
              <Plus size={16} />
              New Resume
            </Link>
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24" style={{ color: "#9CA3AF" }}>
            <p className="text-lg">No templates match "{query}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => {
              const isFav = favorites.includes(product.id);
              return (
                <div
                  key={product.id}
                  className="group relative bg-white rounded-xl overflow-hidden transition-shadow duration-300"
                  style={{
                    border: "1px solid #E7E3D8",
                    boxShadow: "0 1px 2px rgba(27,36,48,0.04)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.boxShadow =
                      "0 12px 24px rgba(27,36,48,0.10)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.boxShadow =
                      "0 1px 2px rgba(27,36,48,0.04)")
                  }
                >
                  {/* folded corner signature */}
                  <div
                    className="absolute top-0 right-0 z-10 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      width: 0,
                      height: 0,
                      borderStyle: "solid",
                      borderWidth: "0 28px 28px 0",
                      borderColor: `transparent ${isFav ? "#C98A2E" : "#EDEAE1"} transparent transparent`,
                    }}
                  />

                  <div
                    className="relative overflow-hidden"
                    style={{ aspectRatio: "3 / 4" }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/55 via-black/0 to-black/0">
                      <div className="absolute bottom-4 left-4 right-4">
                        <Link
                          to="/builder"
                          className="w-full flex items-center justify-center gap-2 bg-white py-2.5 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
                          style={{ color: "#1B2430" }}
                        >
                          <Eye size={16} />
                          Use this template
                        </Link>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleFavorite(product.id)}
                      aria-label={
                        isFav ? "Remove from favorites" : "Add to favorites"
                      }
                      className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm p-2 rounded-full shadow-sm hover:scale-110 transition-transform"
                    >
                      <Heart
                        size={16}
                        style={{ color: isFav ? "#C0392B" : "#6B7280" }}
                        fill={isFav ? "#C0392B" : "none"}
                      />
                    </button>
                  </div>

                  <div className="p-4 flex items-center justify-between gap-2">
                    <h3
                      className="font-medium truncate"
                      style={{
                        fontFamily: "'Source Serif 4', Georgia, serif",
                        color: "#1B2430",
                      }}
                    >
                      {product.name}
                    </h3>
                    <span
                      className="text-xs font-medium shrink-0 px-2 py-1 rounded"
                      style={{
                        fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
                        color: "#55606C",
                        backgroundColor: "#F4F1EA",
                      }}
                    >
                      {product.price}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Resume;
