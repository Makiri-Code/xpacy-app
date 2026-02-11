"use client"

import BookServiceForm from '@/app/_components/BookServiceForm'
import React, { useState } from 'react'

const PropertyService = ({ bookedServiceCards }) => { // Accept the prerendered cards as prop

    const [activeTab, setActiveTab] = useState("Book New Service")
    
    // Placeholder data to prevent crash until properly wired
    const propertyList = [];
    const totalProperties = 0;
    const currentPage = 1;
    const totalPages = 1;
    const totalResult = 0;
    const pageNumbers = [];
    const pageLimit = 10;
    
    // Placeholder handler
    const handlePageChange = (page) => console.log("Page change", page);

    return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="flex border border-gray-300 rounded-lg overflow-hidden w-full max-w-md mx-auto my-6 shadow-sm">
        <button
          className={`flex-1 p-4 cursor-pointer text-center font-medium transition-colors ${
            activeTab === "Booked Services" 
              ? "bg-primary text-white" 
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
          onClick={() => setActiveTab("Booked Services")}
        >
          Booked Services
        </button>
        <button
          className={`flex-1 p-4 cursor-pointer text-center font-medium transition-colors ${
            activeTab === "Book New Service" 
              ? "bg-primary text-white" 
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
          onClick={() => setActiveTab("Book New Service")}
        >
          Book New Service
        </button>
      </div>
       {/* Dashboard Content */}
      <section className="space-y-6">
        {/* Tab 1: Booked Services - Use prerendered cards instead of BookedServiceList */}
        {activeTab === "Booked Services" && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Booked Services</h2>
            {bookedServiceCards?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookedServiceCards}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No booked services found.</p>
                <p className="text-gray-400 mt-2">When you book services, they will appear here.</p>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Book New Service */}
        {activeTab === "Book New Service" && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <h2 className="text-2xl font-bold text-gray-800">New Service Request</h2>
            </div>
            <BookServiceForm/>
          </div>
        )}
      </section>
    </div>
  )
}

export default PropertyService