import { useEffect, useState } from 'react';
import axios from 'axios';
import PriceChart from './PriceChart';

const Dropdowns = () => {
  const [productTypes, setProductTypes] = useState([]);
  const [productGroups, setProductGroups] = useState([]);
  const [productNames, setProductNames] = useState([]);

  const [selectedType, setSelectedType] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedName, setSelectedName] = useState('');

  const [priceData, setPriceData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/dropdowns/product-types')
      .then(res => setProductTypes(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (selectedType) {
      axios.get(`http://localhost:8000/dropdowns/product-groups?type=${selectedType}`)
        .then(res => setProductGroups(res.data))
        .catch(err => console.error(err));
    }
    setSelectedGroup('');
    setSelectedName('');
    setProductNames([]);
  }, [selectedType]);

  useEffect(() => {
    if (selectedGroup) {
      axios.get(`http://localhost:8000/dropdowns/product-names?group=${selectedGroup}`)
        .then(res => setProductNames(res.data))
        .catch(err => console.error(err));
    }
    setSelectedName('');
  }, [selectedGroup]);

  useEffect(() => {
    if (selectedType && selectedGroup && selectedName) {
      axios.get(`http://localhost:8000/prices?product=${selectedName}&group=${selectedGroup}`)
        .then(res => setPriceData(res.data))
        .catch(err => console.error(err));
    } else {
      setPriceData([]);
    }
  }, [selectedName]);

  return (
    <div className="space-y-6">
      {/* Dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select className="p-2 rounded border" value={selectedType} onChange={e => setSelectedType(e.target.value)}>
          <option value="">Select Product Type</option>
          {productTypes.map((item) => (
            <option key={item.value} value={item.value}>{item.label}</option>
          ))}
        </select>

        <select className="p-2 rounded border" value={selectedGroup} onChange={e => setSelectedGroup(e.target.value)} disabled={!selectedType}>
          <option value="">Select Product Group</option>
          {productGroups.map((item) => (
            <option key={item.value} value={item.value}>{item.label}</option>
          ))}
        </select>

        <select className="p-2 rounded border" value={selectedName} onChange={e => setSelectedName(e.target.value)} disabled={!selectedGroup}>
          <option value="">Select Product Name</option>
          {productNames.map((item) => (
            <option key={item.value} value={item.value}>{item.label}</option>
          ))}
        </select>
      </div>

      {/* Table and Chart */}
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
