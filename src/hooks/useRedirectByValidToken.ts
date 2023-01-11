import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { localStorageManager } from "../utils";

const useRedirectByVadlidToken = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { getToken } = localStorageManager;
    if (getToken()) navigate("/", { replace: true });
  }, [navigate]);
};

export default useRedirectByVadlidToken;
