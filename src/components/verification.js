import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import Navbar from './navbar';

const VerifyEmptyUserDatabase = ({ Component }) => {
  const [results, setResults] = useState()
  useEffect(() => {
    const verify = async () => {
      const result = await api.Auth.verification()
      setResults(result)
    }
    verify();
  }, [])
  
  if (results) {
    if (results.length === 0) {
      return window.location.href = `${window.location.origin}/signup`;
    } else {
      return (
        <Component />
      );
    }
  }
}
export default VerifyEmptyUserDatabase;
