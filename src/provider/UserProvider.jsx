import React, { createContext, useContext, useEffect, useState } from "react";
import supabase from "../utils/supabase-client";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [usemeta, setUserMeta] = useState({});
  const [usebooks, setUserBooks] = useState(null);

  const getAllUserBookPosts = async (id) => {
    const { data, error } = await supabase
      .from("booktable")
      .select("*")
      .eq("user_id", id);

    if (error) {
      console.error("Error fetching books:", error);
    } else {
      setUserBooks(data); // ✅ Set the array into state
      console.log("Books stored in state:", data);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUserMeta(session?.user.user_metadata);
      getAllUserBookPosts(session?.user.id);
      // console.log(session?.user?.user_metadata?.name);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      console.log("Error while Logging in", error);
    } else {
      console.log(data);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.log("Error while signing out", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        session,
        usemeta,
        usebooks,
        handleLogin,
        handleLogout,
        setUserBooks,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useAuth = () => {
  return useContext(UserContext);
};

export { useAuth, UserProvider };
