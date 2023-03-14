import React, { PropsWithChildren, ReactNode } from "react";
import { FieldError } from "react-hook-form";


export const Field = ({ children, label, error }: PropsWithChildren & { label: string, error?: FieldError }) => {
  const id = getChildId(children);

  return (
    <div className="formfield">
      <label htmlFor={id} className="formlabel">
        {label}
      </label>
      {children}
      {error && <small className="error">{error.message}</small>}
    </div>
  )

}

const getChildId = (children: React.ReactNode) => {
  //field should have only one child passed
  const child = React.Children.only(children);

  if ("id" in child?.props) {
    return child.props.id;
  }
};