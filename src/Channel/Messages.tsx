import { useEffect, useState } from 'react';
import { SerializedStyles, css } from '@emotion/react';
import { supabase } from '../supabaseClient';
import MessageEditor from './MessageEditor';

type Props = {
  style: SerializedStyles,
  channelID: number | undefined,
};

type Message = {
  id: number,
  message: string,
}

function Messages({ style, channelID }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const getMessages = async () => {
      const { data } = await supabase.from('messages').select('id, message').eq('channel_id', channelID);
      setMessages(data ?? []);
    };

    if (channelID === undefined) return;
    getMessages();

    const channel = supabase.channel('*').on('postgres_changes', { event: '*', schema: 'public', table: 'messages', filter: `channel_id=eq.${channelID}` }, (payload) => {
      getMessages();
      console.log(payload);
    }).subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [channelID]);

  return (
    <div css={css([style, { display: 'flex', flexDirection: 'column' }])}>
      <div css={css({ flex: 1 })}>
        {messages.map(({ id, message }) => (
          <div key={id}>{message}</div>
        ))}
      </div>
      <MessageEditor style={css({ height: '6rem' })} channelID={channelID} />
    </div>
  );
}

export default Messages;
