import Header from "@/components/Header";
import HeroSearch from "@/components/HeroSearch";
import FranchiseShowcase from "@/components/FranchiseShowcase";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSearch />
      <FranchiseShowcase />
      
      {/* Advertisements Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Advertisements</h3>
            <p className="text-gray-600">* Click on the image to enquire</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <img 
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" 
              alt="Business Meeting Advertisement" 
              className="rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
            />
            <img 
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" 
              alt="Corporate Partnership Advertisement" 
              className="rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
            />
            <img 
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" 
              alt="Business Strategy Advertisement" 
              className="rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
            />
          </div>
        </div>
      </section>

      {/* YouTube Video Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Watch Our Introduction</h3>
            <p className="text-lg text-gray-600">Learn how B2B Market connects businesses worldwide</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-xl">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="B2B Market Introduction"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Sell Your Business Section */}
      <section className="py-16 bg-gradient-to-r from-gray-100 to-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-6">Sell Your Business Online</h3>
              <div className="space-y-4 text-gray-700">
                <p className="text-lg">Planning to sell your Business? Want Global Audience?</p>
                <p>Sell your Business at a Global Level, to a Global Audience & Gain Global Visibility</p>
                <p>Want Global Attention for your Business? You can now get it with B2B MARKET.</p>
              </div>
              <a href="/sell-business">
                <button className="b2b-button-primary mt-6 text-lg">
                  Get Started Now
                </button>
              </a>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                alt="Business consultation meeting" 
                className="rounded-lg shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
