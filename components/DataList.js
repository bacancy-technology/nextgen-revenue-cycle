"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function DataList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [setupHint, setSetupHint] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from("users").select("*");

      if (error) {
        console.error("Error fetching users:", error);
        if (
          error.message &&
          error.message.toLowerCase().includes("could not find the table")
        ) {
          setSetupHint(
            "The table \"public.users\" is missing. Create it in Supabase SQL Editor using the README SQL script."
          );
        }
        setErrorMessage(error.message || "Failed to fetch users.");
        setLoading(false);
        return;
      }

      setUsers(data || []);
      setLoading(false);
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (errorMessage) {
    return (
      <>
        <p className="error">{errorMessage}</p>
        {setupHint ? <p className="hint">{setupHint}</p> : null}
      </>
    );
  }

  if (!users.length) {
    return <p>No users found.</p>;
  }

  return (
    <ul className="list">
      {users.map((user) => (
        <li key={user.id || JSON.stringify(user)}>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </li>
      ))}
    </ul>
  );
}
