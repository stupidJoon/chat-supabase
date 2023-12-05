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
  created_uid: {
    email: string,
  },
}

const styles = {
  messages: css`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `,
  message: css`

  `,
  messageEmail: css`

  `,
  messageText: css`
    font-size: 1.5rem;
  `,
};

function Messages({ style, channelID }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const getMessages = async () => {
      const { data, error } = await supabase.from('messages').select('id, message, created_uid(email)').eq('channel_id', channelID).returns<Message[]>();

      if (error) alert(error);

      setMessages(data ?? []);

      console.log(data);
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
      <div css={styles.messages}>
        {messages.map(({ id, message, created_uid: { email } }) => (
          <div key={id}>
            <div>{email}</div>
            <div css={styles.messageText}>{message}</div>
          </div>
        ))}
      </div>
      <MessageEditor style={css({ height: '6rem' })} channelID={channelID} />
    </div>
  );
}

export default Messages;
