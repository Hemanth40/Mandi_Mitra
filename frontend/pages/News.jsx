import React from 'react';

const News = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-8">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Agricultural News</h1>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="space-y-6">
          {[
            {
              title: "Government Announces New Subsidy for Organic Farming",
              date: "May 15, 2023",
              summary: "The agriculture ministry has introduced a 30% subsidy for farmers transitioning to organic methods."
            },
            {
              title: "Monsoon Expected to Arrive on Time This Year",
              date: "May 10, 2023",
              summary: "IMD predicts normal monsoon rainfall across most agricultural regions."
            },
            {
              title: "New Drought-Resistant Wheat Variety Developed",
              date: "May 5, 2023", 
              summary: "Scientists at IARI have created a wheat strain that requires 40% less water."
            }
          ].map((article, index) => (
            <div key={index} className="border-b border-gray-100 pb-4">
              <h3 className="text-xl font-bold text-green-700">{article.title}</h3>
              <p className="text-sm text-gray-500 mb-2">{article.date}</p>
              <p className="text-gray-600">{article.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
