export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f8f5f0] animate-pulse">
      <div className="h-[280px] bg-gray-300 w-full mb-10 mt-[120px]"></div>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex gap-4 mb-10">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-12 w-32 bg-gray-300 rounded-full"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md h-96 flex flex-col overflow-hidden">
              <div className="h-60 bg-gray-300 w-full"></div>
              <div className="p-6 flex-1 flex flex-col gap-4">
                <div className="h-4 bg-gray-200 w-1/3 rounded"></div>
                <div className="h-6 bg-gray-300 w-3/4 rounded"></div>
                <div className="mt-auto h-12 bg-gray-200 w-full rounded-xl"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
