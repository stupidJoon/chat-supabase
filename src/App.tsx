import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from './supabaseClient';
import { Link } from 'react-router-dom';

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

  return (
    <>
      {(user) ? (
        <p>email: {user.email}</p>
      ) : (
        <p>You Are Not Authenticated</p>
      )}
      <Link to='/auth'>/auth</Link>
      <br />
      <Link to='/channels'>/channels</Link>
    </>
  );
}

export default App;
