"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PropertyOwnerCard from './PropertyOwnerCard';
import SavedPropCard from '@/app/_components/SavedPropCard';
import SavedPropertyCard from '@/app/_components/SavedPropertyCard';
const Properties = (
    { 
  properties, 
  totalPages, 
  currentPage, 
  pageLimit, 
  totalProperties, 
  totalResult,
  savedProperties,
  propertyCards
}
) => {

    const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  // Initialize activeTab from URL or default to "My Properties"
  const [activeTab, setActiveTab] = useState(
    searchParams.get('tab') === 'saved' ? 'Saved Properties' : 'My Properties'
  );

  // Extract property lists
  const propertyList = properties?.[0] || [];
  const savedPropertiesList = savedProperties?.[0] || [];

  // Sync activeTab with URL when component mounts and when URL changes
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'saved' && activeTab !== 'Saved Properties') {
      setActiveTab('Saved Properties');
    } else if (!tabParam && activeTab !== 'My Properties') {
      setActiveTab('My Properties');
    }
  }, [searchParams]); // Only depend on searchParams

  const createPageURL = (pageNumber, tab = null) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    
    // Set or remove tab parameter
    if (tab === 'saved' || (tab === null && activeTab === 'Saved Properties')) {
      params.set('tab', 'saved');
    } else {
      params.delete('tab');
    }
    
    return `${pathname}?${params.toString()}`;
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    
    // Update URL with tab state and reset to page 1
    const params = new URLSearchParams(searchParams);
    if (tab === 'Saved Properties') {
      params.set('tab', 'saved');
    } else {
      params.delete('tab');
    }
    params.set('page', '1');
    
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      router.push(createPageURL(newPage), { scroll: false });
    }
  };

  // Generate page numbers for pagination display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, currentPage + 2);
      
      if (currentPage <= 3) {
        end = maxVisiblePages;
      } else if (currentPage >= totalPages - 2) {
        start = totalPages - maxVisiblePages + 1;
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        {/* Tabs Navigation */}
      <div className="flex border border-gray-300 rounded-lg overflow-hidden w-full max-w-md mx-auto my-6 shadow-sm">
        <button
          className={`flex-1 p-4 cursor-pointer text-center font-medium transition-colors ${
            activeTab === "My Properties" 
              ? "bg-primary text-white" 
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
          onClick={() => handleTabChange("My Properties")}
        >
          My Properties
        </button>
        <button
          className={`flex-1 p-4 cursor-pointer text-center font-medium transition-colors ${
            activeTab === "Saved Properties" 
              ? "bg-primary text-white" 
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
          onClick={() => handleTabChange("Saved Properties")}
        >
          Saved Properties
        </button>
      </div>

      {/* Dashboard Content */}
      <section className="space-y-6">
        {/* Tab 1: My Properties */}
        {activeTab === "My Properties" && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <h2 className="text-2xl font-bold text-gray-800">My Properties</h2>
              <div className="flex flex-col items-end gap-2">
                <span className="text-gray-600">
                  {totalProperties || 0} properties total
                </span>
                <span className="text-sm text-gray-500">
                  Page {currentPage} of {totalPages || 1}
                </span>
              </div>
            </div>

            {/* Properties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {propertyList.length > 0 ? (
                propertyCards
              ) : (
                <div className="col-span-full text-center py-12 text-gray-500 border-2 border-dashed border-gray-300 rounded-xl">
                  <p className="text-lg font-medium mb-2">No properties found</p>
                  <p className="text-sm">Your listed properties will appear here</p>
                </div>
              )}
            </div>

            {/* Pagination for My Properties */}
            {propertyList.length > 0 && totalPages > 1 && (
              <div className="flex flex-col sm:flex-row justify-between items-center mt-8 pt-6 border-t border-gray-200 gap-4">
                <div className="text-sm text-gray-600">
                  Showing {propertyList.length} of {totalResult || 0} properties
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      currentPage <= 1
                        ? "text-gray-400 cursor-not-allowed bg-gray-100"
                        : "text-gray-700 hover:bg-gray-100 border border-gray-300"
                    }`}
                  >
                    <ChevronLeft size={20} />
                    <span>Previous</span>
                  </button>

                  <div className="flex items-center gap-1">
                    {pageNumbers.map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-10 h-10 rounded-lg transition-colors ${
                          currentPage === pageNum
                            ? "bg-primary text-white"
                            : "text-gray-700 hover:bg-gray-100 border border-gray-300"
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <>
                        <span className="px-2">...</span>
                        <button
                          onClick={() => handlePageChange(totalPages)}
                          className={`w-10 h-10 rounded-lg transition-colors ${
                            currentPage === totalPages
                              ? "bg-primary text-white"
                              : "text-gray-700 hover:bg-gray-100 border border-gray-300"
                          }`}
                        >
                          {totalPages}
                        </button>
                      </>
                    )}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      currentPage >= totalPages
                        ? "text-gray-400 cursor-not-allowed bg-gray-100"
                        : "text-gray-700 hover:bg-gray-100 border border-gray-300"
                    }`}
                  >
                    <span>Next</span>
                    <ChevronRight size={20} />
                  </button>
                </div>

                <div className="text-sm text-gray-600 hidden sm:block">
                  Properties per page: {pageLimit || 10}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Saved Properties */}
        {activeTab === "Saved Properties" && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <h2 className="text-2xl font-bold text-gray-800">Saved Properties</h2>
              <span className="text-gray-600">
                {savedPropertiesList.length || 0} saved properties
              </span>
            </div>

            {/* Saved Properties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedPropertiesList.length > 0 ? (
                savedPropertiesList.map((property) => (
                  <SavedPropertyCard
                    key={property.id || property._id} 
                    property={property}
                    isSaved={true}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-gray-500 border-2 border-dashed border-gray-300 rounded-xl">
                  <p className="text-lg font-medium mb-2">No saved properties</p>
                  <p className="text-sm">Properties you save will appear here</p>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

export default Properties