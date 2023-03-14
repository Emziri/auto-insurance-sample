import { PropsWithChildren } from 'react';

const ActionButton = ({ action, children }: { action: () => void } & PropsWithChildren) => {
  return (<button onClick={action}>{children}</button>)
}

export default ActionButton;

