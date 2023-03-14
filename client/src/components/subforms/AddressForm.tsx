import { useForm } from 'react-hook-form';
import { TAddress } from '../../types';
import { Field } from '../Field';


const AddressForm = ({ address, saveAddress }: { address?: TAddress, saveAddress: (a: TAddress) => void }) => {
  const { register, handleSubmit, formState } = useForm({ defaultValues: address });
  const { errors } = formState;

  // Create and save a new address
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

  // TODO: make state a select
  // TODO: limiting input lengths

  return (
    <form onSubmit={handleSubmit(handleSave)}>
      <h2>Address</h2>
      <Field label="Street Addess" error={errors?.street}>
        <input name="street" {...register('street', regOpts.street)} />
      </Field>
      <Field label="Suite/Apt (Optional)" error={errors?.street2}>
        <input name="street2" {...register('street2')} />
      </Field>
      <Field label="City" error={errors?.city}>
        <input name="city" {...register('city', regOpts.city)} />
      </Field>
      <Field label="State" error={errors?.state}>
        <input name="state" {...register('state', regOpts.state)} />
      </Field>
      <Field label="ZIP Code" error={errors?.zip}>
        <input name="zip" {...register('zip', regOpts.zip)} />
      </Field>
      <button>Save Address</button>
    </form >
  );


}

export default AddressForm