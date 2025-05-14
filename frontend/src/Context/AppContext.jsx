/*import React, { createContext, useState, useContext } from "react";

// Create Context
const AppContext = createContext();

// Provider Component
export const AppProvider = ({ children }) => {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [products, setProducts] = useState([]);
  const [reports, setReports] = useState([]); // ✅ add this line

  // Function to add a product
  const addProduct = (product) => {
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  return (
    <AppContext.Provider
      value={{
        selectedDepartment,
        setSelectedDepartment,
        products,
        setProducts,
        addProduct,
        reports,           // ✅ expose reports and setReports in context
        setReports
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom Hook to use AppContext
export const useAppContext = () => useContext(AppContext);*/

import React, { createContext, useContext, useState } from "react";

// Create the context
const AppContext = createContext();

// Custom hook to use context easily
export const useAppContext = () => useContext(AppContext);

// Context Provider component
export const AppProvider = ({ children }) => {
  const [selectedDepartment, setSelectedDepartment] = useState("");

  return (
    <AppContext.Provider
      value={{
        selectedDepartment,
        setSelectedDepartment
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

