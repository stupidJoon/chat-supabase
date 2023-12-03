import { useEffect, useState } from 'react';
import { SerializedStyles, css } from '@emotion/react';
import { supabase } from '../supabaseClient';

type Channel = {
  id: number,
  title: string,
}

type Props = {
  style: SerializedStyles,
  channelID: number | undefined,
  setChannelID: React.Dispatch<React.SetStateAction<number | undefined>>
}

function Channels({ style, channelID: currentChannelID, setChannelID: setCurrentChannelID }: Props) {
  const [channels, setChannels] = useState<Channel[]>([]);

  const channelCSS = (channelID: number) => css({
    backgroundColor: 'white',
    filter: `brightness(${channelID === currentChannelID ? '70%' : '100%'})`,
  });
  const getChannels = async () => {
    const { data } = await supabase.from('channels').select('id, title');
    setChannels(data ?? []);
  };

  useEffect(() => {
    getChannels();
  }, []);

  return (
    <div css={style}>
      {channels.map(({ id, title }) => (
        <p css={channelCSS(id)} key={id} onClick={() => setCurrentChannelID(id)}>{title}</p>
      ))}
    </div>
  );
}

export default Channels;
