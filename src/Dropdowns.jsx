import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dropdowns = ({ onSearch }) => {
  const [productTypes, setProductTypes] = useState([]);
  const [productGroups, setProductGroups] = useState([]);
  const [productNames, setProductNames] = useState([]);

  const [selectedType, setSelectedType] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedName, setSelectedName] = useState('');

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const apiBase = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    axios.get(`${apiBase}/dropdowns/product-types`).then((res) => {
      setProductTypes(res.data);
    });
  }, []);

  useEffect(() => {
    if (selectedType) {
      axios.get(`${apiBase}/dropdowns/product-groups?type=${selectedType}`).then((res) => {
        setProductGroups(res.data);
        setSelectedGroup('');
        setProductNames([]);
        setSelectedName('');
      });
    }
  }, [selectedType]);

  useEffect(() => {
    if (selectedGroup) {
      axios.get(`${apiBase}/dropdowns/product-names?group=${selectedGroup}`).then((res) => {
        setProductNames(res.data);
        setSelectedName('');
      });
    }
  }, [selectedGroup]);

  const handleSearch = () => {
    onSearch({
      type: selectedType,
      group: selectedGroup,
      name: selectedName,
      startDate,
      endDate,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <select
        data-testid="product-type"
        className="p-2 rounded border"
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
      >
        <option value="">Select Product Type</option>
        {productTypes.map((type) => (
          <option key={type.value} value={type.value}>
            {type.label}
          </option>
        ))}
      </select>

      <select
        data-testid="product-group"
        className="p-2 rounded border"
        value={selectedGroup}
        onChange={(e) => setSelectedGroup(e.target.value)}
        disabled={!productGroups.length}
      >
        <option value="">Select Product Group</option>
        {productGroups.map((group) => (
          <option key={group.value} value={group.value}>
            {group.label}
          </option>
        ))}
      </select>

      <select
        data-testid="product-name"
        className="p-2 rounded border"
        value={selectedName}
        onChange={(e) => setSelectedName(e.target.value)}
        disabled={!productNames.length}
      >
        <option value="">Select Product Name</option>
        {productNames.map((name) => (
          <option key={name.value} value={name.value}>
            {name.label}
          </option>
        ))}
      </select>

      <input
        data-testid="start-date"
        type="date"
        className="p-2 rounded border"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />

      <input
        data-testid="end-date"
        type="date"
        className="p-2 rounded border"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />

      <button
        data-testid="search-button"
        className="p-2 bg-blue-500 text-white rounded"
        onClick={handleSearch}
        disabled={!selectedName}
      >
        Search
      </button>
    </div>
  );
};

export default Dropdowns;
