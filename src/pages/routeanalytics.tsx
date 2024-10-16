import '../app/globals.css';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import dynamic from 'next/dynamic'; // Import dynamic from next/dynamic

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Dynamically import the HeatMap component
const HeatMap = dynamic(() => import('react-heatmap-grid'), {
  ssr: false, // Disable server-side rendering for this component
});

// Define a type for the route data
interface RouteData {
  id: string;
  usage: number;
  avgTravelTime: number;
}

const RouteAnalytics = () => {
  const [routes, setRoutes] = useState<RouteData[]>([]); // Use the defined type here

  // Sample data; replace with actual data from your API
  useEffect(() => {
    const fetchData = async () => {
      // Replace this with your API call
      const routeData: RouteData[] = [ // Specify the type here
        { id: 'Route 1', usage: 250, avgTravelTime: 30 },
        { id: 'Route 2', usage: 200, avgTravelTime: 45 },
        { id: 'Route 3', usage: 150, avgTravelTime: 60 },
        { id: 'Route 4', usage: 300, avgTravelTime: 25 },
        // Add more sample route data...
      ];
      setRoutes(routeData);
    };

    fetchData();
  }, []);

  // Data for Average Travel Time bar chart
  const travelTimeChartData = {
    labels: routes.map(route => route.id),
    datasets: [
      {
        label: 'Average Travel Time (minutes)',
        data: routes.map(route => route.avgTravelTime),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Data for Heatmap
  const heatmapData = routes.map(route => route.usage);
  const heatmapValues = heatmapData.map(usage => [usage]); // Convert to suitable format for heatmap

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Route Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Average Travel Time Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-center">Average Travel Time for Each Route</h2>
          <div className="h-72">
            <Bar data={travelTimeChartData} options={{ responsive: true }} />
          </div>
        </div>

        {/* Heatmap of Popular Routes */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-center">Heatmap of Popular Routes</h2>
          <div className="h-72">
            <HeatMap
              xLabels={routes.map(route => route.id)}
              yLabels={['Usage']}
              data={heatmapValues}
              backgroundColor="#ffffff"
              cellStyle={(background, value) => ({
                background: `rgba(255, 0, 0, ${value / Math.max(...heatmapData)})`, // Heatmap color based on usage
                fontSize: '11px',
              })}
              cellRender={(value) => (value ? `${value}` : '')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteAnalytics;
