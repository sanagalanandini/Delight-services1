// src/components/PincodeFetcher.tsx
import React, { useState } from 'react';
import useFetchPincode from './useFetchPincode';

const PincodeFetcher: React.FC = () => {
  const [pincode, setPincode] = useState<string>('');
  const { data, loading, error } = useFetchPincode(pincode);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.trim() === '') {
      alert('Please enter a valid pincode');
    }
  };

  return (
    <div className="container">
      <h2 className="title">Pincode Information Fetcher</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          placeholder="Enter Pincode"
          className="input"
        />
        <button type="submit" className="button">Fetch Data</button>
      </form>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {data && data[0]?.PostOffice && (
        <div className="result">
          <h3>Pincode Details:</h3>
          <ul>
            {data[0].PostOffice.map((post: any) => (
              <li key={post.Name}>
                <strong>Name:</strong> {post.Name} <br />
                <strong>District:</strong> {post.District} <br />
                <strong>State:</strong> {post.State}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PincodeFetcher;
