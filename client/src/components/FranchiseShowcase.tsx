import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocation } from "wouter";
import type { Franchise } from "@shared/schema";

interface SearchFilters {
  category: string;
  country: string;
  state: string;
  priceRange: string;
}

interface FranchiseShowcaseProps {
  searchFilters?: SearchFilters;
  searchType?: "franchise" | "business";
}

export default function FranchiseShowcase({ searchFilters, searchType }: FranchiseShowcaseProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [, setLocation] = useLocation();

  // Build query key and URL based on whether we're searching or not
  const hasSearchFilters = searchFilters && (
    (searchFilters.category && searchFilters.category !== "All Business Categories") || 
    (searchFilters.country && searchFilters.country !== "Any Country") || 
    (searchFilters.state && searchFilters.state !== "Any State") || 
    (searchFilters.priceRange && searchFilters.priceRange !== "Price Range")
  );

  const { data: franchises, isLoading } = useQuery<Franchise[]>({
    queryKey: hasSearchFilters 
      ? ["/api/franchises/search", searchFilters]
      : ["/api/franchises"],
    queryFn: async () => {
      if (hasSearchFilters) {
        const params = new URLSearchParams();
        if (searchFilters!.category && searchFilters!.category !== "All Business Categories") {
          params.append('category', searchFilters!.category);
        }
        if (searchFilters!.country && searchFilters!.country !== "Any Country") {
          params.append('country', searchFilters!.country);
        }
        if (searchFilters!.state && searchFilters!.state !== "Any State") {
          params.append('state', searchFilters!.state);
        }
        if (searchFilters!.priceRange && searchFilters!.priceRange !== "Price Range") {
          params.append('priceRange', searchFilters!.priceRange);
        }
        
        const response = await fetch(`/api/franchises/search?${params.toString()}`);
        if (!response.ok) throw new Error('Failed to search franchises');
        return response.json();
      } else {
        const response = await fetch('/api/franchises');
        if (!response.ok) throw new Error('Failed to fetch franchises');
        return response.json();
      }
    }
  });

  const handlePrevSlide = () => {
    setCurrentSlide(prev => Math.max(0, prev - 4));
  };

  const handleNextSlide = () => {
    if (franchises) {
      setCurrentSlide(prev => Math.min(franchises.length - 4, prev + 4));
    }
  };

  const handleFranchiseClick = (franchise: Franchise) => {
    setLocation(`/franchise/${franchise.id}`);
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Showcase <span className="text-[hsl(var(--b2b-blue))]">Franchises</span>
            </h3>
            <p className="text-gray-600">Loading franchise opportunities...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="franchise-card animate-pulse">
                <div className="w-full h-48 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!franchises || franchises.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Showcase <span className="text-[hsl(var(--b2b-blue))]">Franchises</span>
            </h3>
            <p className="text-gray-600">No franchise opportunities available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">
            Showcase <span className="text-[hsl(var(--b2b-blue))]">Franchises</span>
          </h3>
          <p className="text-gray-600">* Click on the image to enquire</p>
        </div>

        {/* Franchise Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {franchises.slice(currentSlide, currentSlide + 8).map((franchise) => (
            <div 
              key={franchise.id} 
              className="franchise-card"
              onClick={() => handleFranchiseClick(franchise)}
            >
              <img 
                src={franchise.imageUrl || "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"} 
                alt={franchise.name} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="font-bold text-gray-800 text-center mb-1">{franchise.name}</h4>
                <p className="text-sm text-gray-600 text-center mb-2">{franchise.category}</p>
                
                {franchise.investmentMin && franchise.investmentMax && (
                  <div className="text-center">
                    <div className="investment-text investment-min">
                      ${franchise.investmentMin.toLocaleString()}
                    </div>
                    <div className="investment-text investment-max">
                      ${franchise.investmentMax.toLocaleString()}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Investment Range</p>
                  </div>
                )}
                
                {franchise.priceRange && (
                  <p className="text-sm text-center text-[hsl(var(--b2b-blue))] font-medium mt-2">
                    {franchise.priceRange}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Navigation */}
        <div className="flex justify-center space-x-4">
          <button 
            className="bg-gray-300 hover:bg-gray-400 rounded-full p-2 transition-colors disabled:opacity-50"
            onClick={handlePrevSlide}
            disabled={currentSlide === 0}
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button 
            className="bg-gray-300 hover:bg-gray-400 rounded-full p-2 transition-colors disabled:opacity-50"
            onClick={handleNextSlide}
            disabled={!franchises || currentSlide >= franchises.length - 8}
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>
    </section>
  );
}
