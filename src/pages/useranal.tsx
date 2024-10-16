import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Bar } from 'react-chartjs-2';
import {
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Chart as ChartJS } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Define the User interface
interface User {
  id: number;
  name: string;
  type: string;
  status: string;
  feePaid: boolean;
}

const UserAnalytics = () => {
  // Sample data; replace with actual data from your API
  const users: User[] = [
    { id: 1, name: 'John Doe', type: 'student', status: 'active', feePaid: true },
    { id: 2, name: 'Jane Smith', type: 'faculty', status: 'inactive', feePaid: false },
    { id: 3, name: 'Alice Johnson', type: 'driver', status: 'active', feePaid: true },
    // Add more sample users as needed...
  ];

  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.status === 'active');
  const inactiveUsers = users.filter(user => user.status === 'inactive');
  const paidUsers = users.filter(user => user.feePaid).length;
  const unpaidUsers = users.filter(user => !user.feePaid).length;

  // Function to download user data as CSV
  const downloadCSV = (userData: User[], fileName: string) => {
    const csvData = [
      ['ID', 'Name', 'Type', 'Status', 'Fee Paid'],
      ...userData.map(user => [
        user.id,
        user.name,
        user.type,
        user.status,
        user.feePaid ? 'Yes' : 'No'
      ]),
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + csvData.map(e => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to download user data as PDF
  const downloadPDF = (userData: User[], fileName: string) => {
    const doc = new jsPDF();
    const tableColumn = ['ID', 'Name', 'Type', 'Status', 'Fee Paid'];
    const tableRows = userData.map(user => [
      user.id,
      user.name,
      user.type,
      user.status,
      user.feePaid ? 'Yes' : 'No'
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
    });

    doc.save(fileName);
  };

  const userChartData = {
    labels: ['Active Users', 'Inactive Users'],
    datasets: [
      {
        label: 'Users',
        data: [activeUsers.length, inactiveUsers.length],
        backgroundColor: ['#4caf50', '#f44336'],
      },
    ],
  };

  const feeChartData = {
    labels: ['Paid Users', 'Unpaid Users'],
    datasets: [
      {
        label: 'Users',
        data: [paidUsers, unpaidUsers],
        backgroundColor: ['#2196F3', '#FF9800'],
      },
    ],
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">User Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Total Users */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="text-4xl font-bold">{totalUsers}</p>
          <p className="text-gray-500">Active: {activeUsers.length}</p>
          <p className="text-gray-500">Inactive: {inactiveUsers.length}</p>
          <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 mt-4">
            <button
              onClick={() => downloadCSV(users, 'users.csv')}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-2 sm:mb-0"
            >
              Download All Users CSV
            </button>
            <button
              onClick={() => downloadPDF(users, 'users.pdf')}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Download All Users PDF
            </button>
          </div>
        </div>

        {/* Active/Inactive Users */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Active/Inactive Users</h2>
          <Bar data={userChartData} options={{ responsive: true }} />
        </div>

        {/* Fee Status */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Fee Status</h2>
          <div className="flex flex-col space-y-2">
            <p className="text-lg">Paid: {paidUsers}</p>
            <p className="text-lg">Unpaid: {unpaidUsers}</p>
            <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 mt-2">
              <button
                onClick={() => downloadCSV(users.filter(user => user.feePaid), 'paid_users.csv')}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-2 sm:mb-0"
              >
                Download Paid Users CSV
              </button>
              <button
                onClick={() => downloadPDF(users.filter(user => user.feePaid), 'paid_users.pdf')}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-2"
              >
                Download Paid Users PDF
              </button>
              <button
                onClick={() => downloadCSV(users.filter(user => !user.feePaid), 'unpaid_users.csv')}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-2 sm:mb-0"
              >
                Download Unpaid Users CSV
              </button>
              <button
                onClick={() => downloadPDF(users.filter(user => !user.feePaid), 'unpaid_users.pdf')}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Download Unpaid Users PDF
              </button>
            </div>
          </div>
        </div>

        {/* Paid vs Unpaid Users Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Paid/Unpaid Users</h2>
          <Bar data={feeChartData} options={{ responsive: true }} />
        </div>

        {/* Breakdown of Users by Type */}
        <div className="bg-white p-4 rounded-lg shadow col-span-1 md:col-span-2 lg:col-span-3">
          <h2 className="text-xl font-semibold">Users by Type</h2>
          <ul className="list-disc pl-5">
            <li>Students: {users.filter(user => user.type === 'student').length}</li>
            <li>Faculty: {users.filter(user => user.type === 'faculty').length}</li>
            <li>Drivers: {users.filter(user => user.type === 'driver').length}</li>
          </ul>
        </div>

        {/* Active Users Download Buttons */}
        <div className="bg-white p-4 rounded-lg shadow col-span-1 md:col-span-2 lg:col-span-3">
          <h2 className="text-xl font-semibold">Download Active Users</h2>
          <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 mt-4">
            <button
              onClick={() => downloadCSV(activeUsers, 'active_users.csv')}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-2 sm:mb-0"
            >
              Download Active Users CSV
            </button>
            <button
              onClick={() => downloadPDF(activeUsers, 'active_users.pdf')}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Download Active Users PDF
            </button>
          </div>
        </div>

        {/* Inactive Users Download Buttons */}
        <div className="bg-white p-4 rounded-lg shadow col-span-1 md:col-span-2 lg:col-span-3">
          <h2 className="text-xl font-semibold">Download Inactive Users</h2>
          <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 mt-4">
            <button
              onClick={() => downloadCSV(inactiveUsers, 'inactive_users.csv')}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-2 sm:mb-0"
            >
              Download Inactive Users CSV
            </button>
            <button
              onClick={() => downloadPDF(inactiveUsers, 'inactive_users.pdf')}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Download Inactive Users PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAnalytics;
