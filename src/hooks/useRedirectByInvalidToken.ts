import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { localStorageManager } from "../utils";

const useRedirectByInVadlidToken = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { getToken } = localStorageManager;
    if (!getToken()) navigate("/auth", { replace: true });
  }, [navigate]);
};

export default useRedirectByInVadlidToken;
