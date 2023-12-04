import { useState } from 'react';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function signIn() {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) throw error;

    console.log(data);
    navigate('/');
  }

  async function signUp() {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) throw error;

    console.log(data);
    navigate('/');
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;
    navigate('/');
  }

  return (
    <>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email" />
      <br />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="password" />
      <br />
      <button type="button" onClick={signIn}>Sign In</button>
      <button type="button" onClick={signUp}>Sign Up</button>
      <button type="button" onClick={signOut}>Sign Out</button>
    </>
  );
}

export default Auth;
