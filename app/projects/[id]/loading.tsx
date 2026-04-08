export default function Loading() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      {/* Header skeleton */}
      <div className="h-24 bg-gray-100 w-full mb-0"></div>
      
      {/* Banner Carousel skeleton */}
      <div className="h-[60vh] bg-gray-200 w-full"></div>

      <div className="container mx-auto px-4 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px] gap-10 items-start">
          {/* Main Content */}
          <div className="min-w-0 w-full order-1 space-y-12">
            {/* Description Skeleton */}
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 w-1/3 rounded"></div>
              <div className="h-4 bg-gray-100 w-full rounded"></div>
              <div className="h-4 bg-gray-100 w-5/6 rounded"></div>
              <div className="h-4 bg-gray-100 w-4/6 rounded"></div>
            </div>

            {/* Highlights Skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
               {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-10 bg-gray-100 rounded"></div>)}
            </div>

            {/* Gallery Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="h-64 bg-gray-200 rounded-xl"></div>
               <div className="h-64 bg-gray-200 rounded-xl"></div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="w-full lg:w-auto order-2 space-y-6">
            <div className="bg-gray-50 h-[400px] rounded-xl border border-gray-100"></div>
            <div className="bg-gray-50 h-[300px] rounded-xl border border-gray-100"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
