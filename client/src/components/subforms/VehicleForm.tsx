import { useForm } from 'react-hook-form';
import { TVehicle } from '../../types';


const VehicleForm = () => {
  // TODO: make this a modal, or only have it show up when you add a new person

  const { register, handleSubmit, reset, formState } = useForm<TVehicle>();
  const { errors } = formState;

  // Create and save a new vehicle
  const handleAddVehicle = (data: TVehicle) => {
    const requestOpts = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }
    fetch('/api/vehicles', requestOpts).then(resp => resp.json()).then(data => console.log(data))
    reset();
  };


  // form validation
  const regOpts = {
    vin: {
      required: "VIN is required.",
      minLength: { value: 17, message: "VIN must be 17 characters" },
      maxLength: { value: 17, message: "VIN must be 17 characters" }
    },
    year: {
      required: "year is required",
      valueAsNumber: true,
      validate: {
        range: (val: number) => val >= 1985 && val <= (new Date().getFullYear() + 1) || "year out of valid range"
      }
    },
    make: { required: "make is required" },
    model: { required: "model is required." }
  };


  return (
    <form onSubmit={handleSubmit(handleAddVehicle)} >
      <h2>Add Vehicle</h2>
      <div>
        <label>VIN</label>
        <input name="vin" {...register('vin', regOpts.vin)} />
        {errors?.vin && errors.vin.message}
      </div>
      <div>
        <label>Year</label>
        <input type="number" name="year" {...register('year', regOpts.year)} />
        {errors?.year && errors.year.message}
      </div>
      <div>
        <label>Make</label>
        <input name="make" {...register('make', regOpts.make)} />
        {errors?.make && errors.make.message}
      </div>
      <div>
        <label>Model</label>
        <input name="model" {...register('model', regOpts.model)} />
        {errors?.model && errors.model.message}
      </div>
      <button>Save Vehicle</button>
    </form >
  );


}

export default VehicleForm