import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    
    try {
      const storedCartItems = localStorage.getItem("cartItems");
      return storedCartItems ? JSON.parse(storedCartItems) : [];
    } catch (error) {
      console.error("Failed to parse cart items from localStorage:", error);
      return [];
    }
  });
  const [prescriptionFile, setPrescriptionFile] = useState(null);
  const [prescriptionRequiredInCart, setPrescriptionRequiredInCart] =
    useState(false);
  const [isPrescriptionReady, setIsPrescriptionReady] = useState(false);

  
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  
    const required = cartItems.some((item) => item.prescriptionRequired);
    setPrescriptionRequiredInCart(required);
    
    if (required && !prescriptionFile) {
      setIsPrescriptionReady(false);
    } else if (required && prescriptionFile) {
      setIsPrescriptionReady(true);
    } else {
      setIsPrescriptionReady(true); 
    }
  }, [cartItems, prescriptionFile]);

 
  const addToCart = (itemToAdd) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === itemToAdd.id);

      if (existingItem) {
        
        return prevItems.map((item) =>
          item.id === itemToAdd.id
            ? {
                ...item,
                quantity: Math.min(
                  item.quantity + 1,
                  item.maxQuantity || Infinity
                ),
              }
            : item
        );
      } else {
       
        return [...prevItems, { ...itemToAdd, quantity: 1 }];
      }
    });
  };

  
  const updateQuantity = (id, newQuantity) => {
    setCartItems((prevItems) => {
      return prevItems
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, newQuantity) }
            : item
        )
        .filter((item) => item.quantity > 0); 
    });
  };

  
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };


  const handlePrescriptionUpload = (file) => {
    setPrescriptionFile(file);
    setIsPrescriptionReady(true); 
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart, 
        updateQuantity,
        removeFromCart,
        prescriptionFile,
        handlePrescriptionUpload,
        setPrescriptionFile, 
        prescriptionRequiredInCart,
        isPrescriptionReady,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
