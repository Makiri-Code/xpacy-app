"use client";
import { useState } from "react";
import Link from "next/link";

export default function PropertyOwnerOverviewTabs({ overviewItems, recentActivity }) {
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <div className="flex flex-col gap-8">
            <h1 className="text-3xl font-bold text-gray-800">Overview</h1>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {overviewItems.map((item, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">{item.title}</p>
                            <h3 className="text-3xl font-bold mt-2 text-gray-900">{item.count}</h3>
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full mt-2 inline-block">
                                {item.change}
                            </span>
                        </div>
                        <div className={`p-4 rounded-full ${item.bgColor}`}>
                            {item.icon}
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activity Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-gray-800">Recent Activity</h2>
                </div>
                
                {recentActivity.length > 0 ? (
                    <div className="flex flex-col gap-4">
                        {recentActivity.map((activity, index) => (
                            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <div className="flex flex-col">
                                    <span className="font-semibold text-gray-700">
                                        {activity.type === 'Booking' ? 'Property Booking' : 'Service Request'}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        {new Date(activity.date).toLocaleDateString()}
                                    </span>
                                </div>
                                <span className={`text-xs px-3 py-1 rounded-full ${
                                    activity.status === 'completed' ? 'bg-green-100 text-green-700' :
                                    activity.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-gray-200 text-gray-600'
                                }`}>
                                    {activity.status || 'Pending'}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-400">
                        No recent activity found.
                    </div>
                )}
            </div>
        </div>
    );
}
