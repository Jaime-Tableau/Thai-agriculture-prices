import { useEffect, useState } from 'react';
import {
  fetchProductTypes,
  fetchProductGroups,
  fetchProductNames,
  fetchPrices,
} from '../api';
import PriceChart from './PriceChart';

const Dropdowns = () => {
  const [productTypes, setProductTypes] = useState([]);
  const [productGroups, setProductGroups] = useState([]);
  const [productNames, setProductNames] = useState([]);

  const [selectedType, setSelectedType] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [priceData, setPriceData] = useState([]);

  // Initial product types
  useEffect(() => {
    fetchProductTypes()
      .then(res => setProductTypes(res.data))
      .catch(console.error);
  }, []);

  // Fetch product groups when type changes
  useEffect(() => {
    if (selectedType) {
      fetchProductGroups(selectedType)
        .then(res => setProductGroups(res.data))
        .catch(console.error);
    }
    setSelectedGroup('');
    setSelectedName('');
    setProductGroups([]);
    setProductNames([]);
  }, [selectedType]);

  // Fetch product names when group changes
  useEffect(() => {
    if (selectedGroup) {
      fetchProductNames(selectedGroup)
        .then(res => setProductNames(res.data))
        .catch(console.error);
    }
    setSelectedName('');
    setProductNames([]);
  }, [selectedGroup]);

  // 🔍 Manual fetch triggered by user
  const handleSearch = () => {
    if (selectedType && selectedGroup && selectedName) {
      fetchPrices({
        product: selectedName,
        group: selectedGroup,
        start_date: startDate,
        end_date: endDate,
      })
        .then(res => setPriceData(res.data))
        .catch(console.error);
    } else {
      setPriceData([]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select
          className="p-2 rounded border"
          data-testid="product-type"
          value={selectedType}
          onChange={e => setSelectedType(e.target.value)}
        >
          <option value="">Select Product Type</option>
          {productTypes.map(item => (
            <option key={item.value} value={item.value}>{item.label}</option>
          ))}
        </select>

        <select
          className="p-2 rounded border"
          data-testid="product-group"
          value={selectedGroup}
          onChange={e => setSelectedGroup(e.target.value)}
          disabled={!selectedType}
        >
          <option value="">Select Product Group</option>
          {productGroups.map(item => (
            <option key={item.value} value={item.value}>{item.label}</option>
          ))}
        </select>

        <select
          className="p-2 rounded border"
          data-testid="product-name"
          value={selectedName}
          onChange={e => setSelectedName(e.target.value)}
          disabled={!selectedGroup}
        >
          <option value="">Select Product Name</option>
          {productNames.map(item => (
            <option key={item.value} value={item.value}>{item.label}</option>
          ))}
        </select>
      </div>

      {/* Date Pickers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="date"
          className="p-2 rounded border"
          data-testid="start-date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className="p-2 rounded border"
          data-testid="end-date"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
        />
      </div>

      {/* Search Button */}
      <div className="text-center">
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={handleSearch}
          data-testid="search-button"
          disabled={!selectedType || !selectedGroup || !selectedName}
        >
          Search
        </button>
      </div>

      {/* Data Table + Chart */}
      {priceData.length > 0 && (
        <>
          <div className="overflow-x-auto border rounded bg-white p-4">
            <h2 className="text-lg font-semibold mb-2">Price Data</h2>
            <table className="min-w-full table-auto text-left border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 border">Date</th>
                  <th className="p-2 border">Price Range</th>
                  <th className="p-2 border">Average Price (THB)</th>
                </tr>
              </thead>
              <tbody>
                {priceData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="p-2 border">{row.date}</td>
                    <td className="p-2 border">{row.price_range}</td>
                    <td className="p-2 border">{row.avg_price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <PriceChart data={priceData} />
        </>
      )}
    </div>
  );
};

export default Dropdowns;

