import { Link } from 'react-router-dom';
import React, { PropsWithChildren } from 'react';

type TLinkButtonProps = { to: string } & PropsWithChildren;

const LinkButton = ({ to, children }: TLinkButtonProps) => {
  return (<Link to={to}>{children}</Link>);
};

export default LinkButton;