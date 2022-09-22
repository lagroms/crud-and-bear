import { useState } from "react";

const useApi = (apiFunc) => {
    const [data, setData] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const request = async (...args) => {
        setLoading(true);
        try {
            const response = await apiFunc(...args);
            setData(response);
            setError(false);
        } catch (error) {
            setError(error);
            setData({});
        }
        setLoading(false);
    };

    return { data, error, loading, request };
};

export default useApi;
