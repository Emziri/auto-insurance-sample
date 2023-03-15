import { useForm } from 'react-hook-form';
import { TAddress } from '../../../types';
import { Field } from '../../Field';
import React from 'react';

type TAddressFormProps = {
  address?: TAddress,
  saveAddress: (a: TAddress) => void
}

const AddressForm = ({ address, saveAddress }: TAddressFormProps) => {
  const { register, handleSubmit, formState } = useForm({ defaultValues: address });
  const { errors } = formState;

  const handleSave = (data: TAddress) => {
    saveAddress(data);
  };

  // form validation
  const regOpts = {
    street: { required: "Street Address required" },
    city: { required: "City required" },
    state: { required: "State required" },
    zip: {
      required: "ZIP Code required", pattern: {
        value: /(^\d{5}$)|(^\d{5}-\d{4}$)/,
        message: 'must be valid zipcode'
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSave)}>
      <Field label="Street Addess" error={errors?.street}>
        <input maxLength={250} {...register('street', regOpts.street)} />
      </Field>
      <Field label="Suite/Apt (Optional)" error={errors?.street2}>
        <input maxLength={250} {...register('street2')} />
      </Field>
      <Field label="City" error={errors?.city}>
        <input maxLength={30} {...register('city', regOpts.city)} />
      </Field>
      <Field label="State" error={errors?.state}>
        <input maxLength={30} {...register('state', regOpts.state)} />
      </Field>
      <Field label="ZIP Code" error={errors?.zip}>
        <input maxLength={11} {...register('zip', regOpts.zip)} />
      </Field>
      <button>Save Address</button>
    </form >
  );


};

export default AddressForm;