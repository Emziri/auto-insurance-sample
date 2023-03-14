import { useForm } from 'react-hook-form';
import { TAddress } from '../../types';


const AddressForm = () => {
  // TODO: make this a modal, or only have it show up when you add a new person

  const { register, handleSubmit, reset, formState } = useForm<TAddress>();
  const { errors } = formState;

  // Create and save a new address
  const handleAddAddress = (data: TAddress) => {
    const requestOpts = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, street2: data.street2 ? data.street2 : undefined })
    }
    fetch('/api/addresses', requestOpts).then(resp => resp.json()).then(data => console.log(data))
    reset();
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
    <form onSubmit={handleSubmit(handleAddAddress)} >
      <h2>Add Address</h2>
      <div>
        <label>Street Address</label>
        <input name="street" {...register('street', regOpts.street)} />
        {errors?.street && errors.street.message}
      </div>
      <div>
        <label>Suite/Apt (Optional)</label>
        <input name="street2" {...register('street2')} />
        {errors?.street2 && errors.street2.message}
      </div>
      <div>
        <label>City</label>
        <input name="city" {...register('city', regOpts.city)} />
        {errors?.city && errors.city.message}
      </div>
      <div>
        <label>State</label>
        <input name="state" {...register('state', regOpts.state)} />
        {errors?.state && errors.state.message}
      </div>
      <div>
        <label>ZIP Code</label>
        <input name="zip" {...register('zip', regOpts.zip)} />
        {errors?.zip && errors.zip.message}
      </div>
      <button>Save Address</button>
    </form >
  );


}

export default AddressForm