import { useState } from 'react';
import Channels from './Channels';
import Messages from './Messages';
import { css } from '@emotion/react';

function Channel() {
  const [channelID, setChannelID] = useState<number>();

  return (
    <div css={css({ height: '100vh', display: 'flex' })}>
      <Channels style={css({ flex: 1 })} channelID={channelID} setChannelID={setChannelID} />
      <Messages style={css({ flex: 3 })} channelID={channelID} />
    </div>
  );
}

export default Channel;
