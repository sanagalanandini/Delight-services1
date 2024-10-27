// src/hooks/useFetchPincode.ts
import { useState, useEffect } from 'react';

const useFetchPincode = (pincode: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pincode) return;

    const fetchPincodeData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        if(err instanceof Error){
        setError(err.message);
      }else{
        setError('An unknown error occured');
      } 
    }finally {
        setLoading(false);
      }
    };

    fetchPincodeData();
  }, [pincode]);

  return { data, loading, error };
};

export default useFetchPincode;
