import '../app/globals.css';
import React, { useEffect, useState, useCallback } from 'react';
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

type BusData = {
  id: string;
  route: string;
  usage: number;
  capacity: number;
  occupancy: number;
};

const BusAnalytics = () => {
  const [buses, setBuses] = useState<BusData[]>([]);
  const [occupancyData, setOccupancyData] = useState<BusData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const busData: BusData[] = [
        { id: 'Bus A', route: 'Route 1', usage: 150, capacity: 50, occupancy: 30 },
        { id: 'Bus B', route: 'Route 2', usage: 80, capacity: 40, occupancy: 20 },
        { id: 'Bus C', route: 'Route 3', usage: 120, capacity: 60, occupancy: 45 },
        { id: 'Bus D', route: 'Route 4', usage: 30, capacity: 35, occupancy: 10 },
        { id: 'Bus E', route: 'Route 5', usage: 60, capacity: 30, occupancy: 25 },
      ];
      setBuses(busData);
    };

    fetchData();
  }, []);

  const sortedBuses = [...buses].sort((a, b) => b.usage - a.usage);
  const mostUsedBus = sortedBuses[0] || {};
  const leastUsedBus = sortedBuses[sortedBuses.length - 1] || {};

  const usageChartData = {
    labels: buses.map(bus => bus.id),
    datasets: [
      {
        label: 'Bus Usage',
        data: buses.map(bus => bus.usage),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const fetchRealTimeOccupancy = useCallback(async () => {
    const realTimeData = buses.map(bus => ({
      ...bus,
      occupancy: Math.floor(Math.random() * bus.capacity),
    }));
    setOccupancyData(realTimeData);
  }, [buses]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchRealTimeOccupancy();
    }, 5000);

    return () => clearInterval(interval);
  }, [fetchRealTimeOccupancy]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Bus Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Most and Least Used Buses */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Most Used Bus</h2>
          <p className="text-lg">{mostUsedBus.id || 'N/A'}</p>
          <p className="text-md">Route: {mostUsedBus.route || 'N/A'}</p>
          <p className="text-md">Usage: {mostUsedBus.usage || 0} times</p>

          <h2 className="text-xl font-semibold mt-4">Least Used Bus</h2>
          <p className="text-lg">{leastUsedBus.id || 'N/A'}</p>
          <p className="text-md">Route: {leastUsedBus.route || 'N/A'}</p>
          <p className="text-md">Usage: {leastUsedBus.usage || 0} times</p>
        </div>

        {/* Bus Usage Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Bus Usage Statistics</h2>
          <Bar data={usageChartData} options={{ responsive: true }} />
        </div>

        {/* Real-Time Occupancy Stats */}
        <div className="bg-white p-4 rounded-lg shadow col-span-1 md:col-span-2">
          <h2 className="text-xl font-semibold">Real-Time Bus Occupancy</h2>
          {/* Scrollable container for the table */}
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Bus ID</th>
                  <th className="border px-4 py-2">Route</th>
                  <th className="border px-4 py-2">Capacity</th>
                  <th className="border px-4 py-2">Current Occupancy</th>
                </tr>
              </thead>
              <tbody>
                {occupancyData.map(bus => (
                  <tr key={bus.id} className="hover:bg-gray-100">
                    <td className="border px-4 py-2">{bus.id}</td>
                    <td className="border px-4 py-2">{bus.route}</td>
                    <td className="border px-4 py-2">{bus.capacity}</td>
                    <td className="border px-4 py-2">{bus.occupancy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusAnalytics;
