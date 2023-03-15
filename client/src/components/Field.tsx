import React, { PropsWithChildren } from "react";
import { FieldError } from "react-hook-form";


export const Field = ({ children, label, error }: PropsWithChildren & { label: string, error?: FieldError }) => {
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