import React, { useEffect, useState } from "react"; // Combined import
import Loader from "../components/loader/Loader";

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); 
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader visible={loading} />;
  }

  return <>{children}</>;
};

export default Provider;