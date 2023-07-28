import { createContext, useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import { publicRequest } from "../requestMethods";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    Cookies.get("userToken") || null
  );

  const login = async (inputs) => {
    const res = await publicRequest.post("/auth/login", inputs);
    const token = res.data.accessToken;

    Cookies.set("userToken", token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      secure: true,
      sameSite: "strict",
    });
    setCurrentUser(token);
    return res;
  };

  const logout = async () => {
    Cookies.remove("userToken");
    setCurrentUser(null);
  };

  useEffect(() => {
    if (!currentUser) {
      Cookies.remove("userToken");
    } else {
      Cookies.set("userToken", currentUser, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        secure: true,
        sameSite: "strict",
      });
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
