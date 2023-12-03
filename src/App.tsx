import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from './supabaseClient';

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    const { data, error } = await supabase.auth.getUser();

    if (error) throw error;

    setUser(data.user);
    console.log(data.user);
  }

  if (!user) {
    return <p>You Are Not Authenticated</p>;
  }

  return (
    <>
      <p>email: {user.email}</p>
    </>
  );
}

export default App;
