import { SerializedStyles, css } from '@emotion/react';
import { useState } from 'react';
import { supabase } from '../supabaseClient';

type Props = {
  style: SerializedStyles,
  channelID: number | undefined,
};

function MessageEditor({ style, channelID }: Props) {
  const [message, setMessage] = useState('');

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = await supabase.from('messages').insert({ channel_id: channelID, message });

    if (error) throw error;
  };

  return (
    <form css={css([style])} onSubmit={sendMessage}>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button type="submit">Send</button>
    </form>
  );
}

export default MessageEditor;
