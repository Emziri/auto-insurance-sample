import { Link } from 'react-router-dom';
import { PropsWithChildren } from 'react';

const LinkButton = ({ to, children }: { to: string } & PropsWithChildren) => {
  return (<Link to={to}>{children}</Link>)
}

export default LinkButton