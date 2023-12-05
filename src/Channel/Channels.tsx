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

  const addChannel = async () => {
    const title = prompt('채널 이름을 입력해주세요');
    if (title === null) return;

    const { error } = await supabase.from('channels').insert({ title });

    if (error) throw error;

    await getChannels();
  };

  useEffect(() => {
    getChannels();
  }, []);

  return (
    <div css={style}>
      {channels.map(({ id, title }) => (
        <p css={channelCSS(id)} key={id} onClick={() => setCurrentChannelID(id)}>{title}</p>
      ))}
      <p onClick={addChannel}>+</p>
    </div>
  );
}

export default Channels;
