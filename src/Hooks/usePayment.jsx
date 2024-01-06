import React from 'react';
import { getKeyUrl } from '../Utils/Urls/PaymentUrl';
import { useQuery } from "@tanstack/react-query";

const usePayment = () => {
    const {
        data: getRezarPayKey,
        isLoading: rezarPayKeyLoaded,
        refetch: refetchRezarPayKey,
      } = useQuery({
        queryKey: ["getRezarPayKey"],
        queryFn: async () => {
          try {
            const res = await fetch(getKeyUrl);
            if (!res.ok) {
              throw new Error("Failed to fetch data");
            }
            const data = await res.json();
            return data.data;
          } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
          }
        },
      });


      
    
    return  {
        getRezarPayKey
    };
};

export default usePayment;