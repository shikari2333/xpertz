
import NearbyMap from '../components/NearbyMap';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex items-center justify-center bg-gradient-to-br from-green-50 to-amber-50 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Explore destinations around Nedumkandam</h1>
        </div>
      </div>

      {/* Nearby Experienccces Map */}
      <NearbyMap />
    </div>
  );
};

export default Index;
