export default function Loading() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      {/* Header skeleton */}
      <div className="h-20 bg-gray-100 w-full fixed top-0 z-50"></div>
      
      {/* Hero skeleton */}
      <div className="h-screen bg-gray-200 w-full relative">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          <div className="h-12 bg-gray-300 w-3/4 max-w-2xl rounded-md mb-6"></div>
          <div className="h-6 bg-gray-300 w-1/2 max-w-lg rounded-md mb-8"></div>
          <div className="h-12 bg-gray-300 w-40 rounded-full"></div>
        </div>
      </div>
      
      {/* Next section skeleton */}
      <div className="py-20 container mx-auto px-4">
        <div className="h-10 bg-gray-200 w-64 mx-auto mb-16 rounded"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-80 bg-gray-100 rounded-2xl"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
