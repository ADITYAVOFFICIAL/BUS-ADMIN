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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Define the type for report data
type ReportData = {
  trips: number;
  distance: number;
  travelers: number;
};

const DailyReports = () => {
  const [reportData, setReportData] = useState<ReportData>({
    trips: 0,
    distance: 0,
    travelers: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const dailyData: ReportData = {
        trips: 150,
        distance: 3000,
        travelers: 500,
      };
      setReportData(dailyData);
    };

    fetchData();
  }, []);

  const tripsChartData = {
    labels: ['Trips Made'],
    datasets: [
      {
        label: 'Number of Trips',
        data: [reportData.trips],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const distanceChartData = {
    labels: ['Total Distance (km)'],
    datasets: [
      {
        label: 'Distance Covered',
        data: [reportData.distance],
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
      },
    ],
  };

  const travelersChartData = {
    labels: ['Total Travelers'],
    datasets: [
      {
        label: 'Number of Travelers',
        data: [reportData.travelers],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Daily Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-center">Number of Trips Made</h2>
          <Bar data={tripsChartData} options={{ responsive: true }} />
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-center">Total Distance Covered</h2>
          <Bar data={distanceChartData} options={{ responsive: true }} />
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-center">Number of Travelers</h2>
          <Bar data={travelersChartData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default DailyReports;
