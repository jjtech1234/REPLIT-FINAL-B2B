import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { Franchise } from "@shared/schema";

interface SearchFilters {
  category: string;
  country: string;
  state: string;
  priceRange: string;
}

export default function HeroSearch() {
  const [activeTab, setActiveTab] = useState<"franchise" | "business">("franchise");
  const [filters, setFilters] = useState<SearchFilters>({
    category: "",
    country: "",
    state: "",
    priceRange: "",
  });

  const { data: searchResults, refetch } = useQuery<Franchise[]>({
    queryKey: ["/api/franchises/search", filters],
    enabled: false,
  });

  const handleSearch = () => {
    if (activeTab === "franchise") {
      refetch();
    } else {
      // For business search, would query different endpoint
      console.log("Searching businesses with filters:", filters);
    }
  };

  const businessCategories = [
    "All Business Categories",
    "Automotive",
    "Building, Storage & Decorating",
    "Child Education and Development",
    "Coffee",
    "Computer Technology",
    "Convenience Stores",
    "Direct Marketing",
    "Food-Beverage Related Businesses",
    "Health, Beauty & Nutrition",
    "Real Estate",
    "Repair & Restoration",
    "Retail"
  ];

  const countries = [
    "Any Country",
    "Australia",
    "Canada",
    "China",
    "Germany",
    "India",
    "UK",
    "USA"
  ];

  const states = [
    "Any State",
    "California",
    "Texas",
    "New York",
    "Florida",
    "Ontario",
    "Delhi",
    "Maharashtra"
  ];

  const priceRanges = [
    "Price Range",
    "0-$10K",
    "$10K-$50K",
    "$50K-$100K",
    "$100K-$250K",
    "$250K-$500K",
    "$500K-$1M",
    "$1M-$5M"
  ];

  return (
    <section className="b2b-gradient-bg py-16 relative overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 hero-overlay">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080" 
          alt="Business cityscape" 
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center text-white mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">NO.1 GLOBAL B2B MARKET PLACE</h2>
          <p className="text-xl md:text-2xl font-light">Find a Business for Sale</p>
        </div>

        {/* Search Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white bg-opacity-20 rounded-lg p-1 flex">
            <button 
              className={`px-6 py-2 rounded font-medium transition-colors ${
                activeTab === "franchise" 
                  ? "bg-gray-800 text-white" 
                  : "text-white hover:bg-white hover:bg-opacity-20"
              }`}
              onClick={() => setActiveTab("franchise")}
            >
              Buy a Franchise
            </button>
            <button 
              className={`px-6 py-2 rounded font-medium transition-colors ${
                activeTab === "business" 
                  ? "bg-gray-800 text-white" 
                  : "text-white hover:bg-white hover:bg-opacity-20"
              }`}
              onClick={() => setActiveTab("business")}
            >
              Buy a Business
            </button>
          </div>
        </div>

        {/* Search Form */}
        <div className="bg-white bg-opacity-95 rounded-lg p-8 max-w-6xl mx-auto shadow-2xl">
          <form 
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <Select value={filters.category} onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}>
              <SelectTrigger className="search-select">
                <SelectValue placeholder="All Business Categories" />
              </SelectTrigger>
              <SelectContent>
                {businessCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filters.country} onValueChange={(value) => setFilters(prev => ({ ...prev, country: value }))}>
              <SelectTrigger className="search-select">
                <SelectValue placeholder="Any Country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filters.state} onValueChange={(value) => setFilters(prev => ({ ...prev, state: value }))}>
              <SelectTrigger className="search-select">
                <SelectValue placeholder="Any State" />
              </SelectTrigger>
              <SelectContent>
                {states.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filters.priceRange} onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value }))}>
              <SelectTrigger className="search-select">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                {priceRanges.map((range) => (
                  <SelectItem key={range} value={range}>
                    {range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </form>
          
          <div className="text-center mt-6">
            <Button 
              className="b2b-button-primary text-lg px-12 py-3"
              onClick={handleSearch}
            >
              GO
            </Button>
          </div>

          {/* Search Results */}
          {searchResults && searchResults.length > 0 && (
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Search Results ({searchResults.length} found)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.map((franchise) => (
                  <div key={franchise.id} className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-bold text-gray-800">{franchise.name}</h4>
                    <p className="text-sm text-gray-600">{franchise.category}</p>
                    <p className="text-sm text-gray-500">{franchise.country}, {franchise.state}</p>
                    <p className="text-sm font-semibold text-[hsl(var(--b2b-blue))]">{franchise.priceRange}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
