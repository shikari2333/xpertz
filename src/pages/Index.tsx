
import NearbyMap from '../components/NearbyMap';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="flex items-center justify-center bg-gradient-to-br from-green-50 to-amber-50 py-20">
        <div className="text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-6 text-gray-800">Welcome to R J Hotel</h1>
          <p className="text-xl text-gray-600 mb-8">Experience the beauty of Nedumkandam and explore Kerala's hidden gems</p>
          <p className="text-lg text-green-700 font-medium">Your gateway to unforgettable adventures</p>
        </div>
      </div>

      {/* Nearby Experiences Map */}
      <NearbyMap />

      {/* Additional content section */}
      <div className="py-16 px-4 text-center bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Plan Your Adventure</h2>
          <p className="text-lg text-gray-600 mb-8">
            Click on any destination to learn more and plan your visit through WhatsApp
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="p-6 bg-green-50 rounded-lg">
              <div className="text-3xl mb-4">🌱</div>
              <h3 className="font-semibold text-gray-800 mb-2">Nature & Wildlife</h3>
              <p className="text-gray-600">Explore pristine forests, national parks, and wildlife sanctuaries</p>
            </div>
            <div className="p-6 bg-amber-50 rounded-lg">
              <div className="text-3xl mb-4">🏔️</div>
              <h3 className="font-semibold text-gray-800 mb-2">Adventure Sports</h3>
              <p className="text-gray-600">Experience paragliding, trekking, and scenic mountain views</p>
            </div>
            <div className="p-6 bg-green-50 rounded-lg">
              <div className="text-3xl mb-4">🌿</div>
              <h3 className="font-semibold text-gray-800 mb-2">Cultural Heritage</h3>
              <p className="text-gray-600">Discover local traditions, spice plantations, and authentic experiences</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
