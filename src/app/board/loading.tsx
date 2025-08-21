export default function BoardLoading() {
  return (
    <div className="p-6">
      <div className="animate-pulse space-y-6">
        {/* Header Skeleton */}
        <div className="flex flex-col space-y-2">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
        
        {/* Columns Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              </div>
              
              {/* Task Cards Skeleton */}
              <div className="space-y-3">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-3"></div>
                    <div className="flex justify-between items-center">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="h-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
