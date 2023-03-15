import React, { PropsWithChildren } from "react";
import { FieldError } from "react-hook-form";

type TFormFieldProps = {
  label: string,
  error?: FieldError
} & PropsWithChildren;


export const Field = ({ children, label, error }: TFormFieldProps) => {
  return (
    <div className="formfield">
      <label className="formlabel">
        {label}
      </label>
      {children}
      {error && <small className="error">{error.message}</small>}
    </div>
  );
};