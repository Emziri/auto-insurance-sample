import { useForm } from 'react-hook-form';
import { TVehicle } from '../../types';
import { Field } from '../Field';
import React from 'react';

type TVehicleForm = {
  vehicle?: TVehicle,
  vNo?: number,
  saveVehicle: (v: TVehicle, vNo?: number) => void
}

const VehicleForm = ({ vehicle, vNo, saveVehicle }: TVehicleForm) => {
  const { register, handleSubmit, reset, formState } = useForm<TVehicle>({ defaultValues: vehicle });
  const { errors } = formState;

  // Create and save a new vehicle
  const handleAddVehicle = (vehicle: TVehicle) => {
    saveVehicle(vehicle, vNo);
    if (!vNo) reset();
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
      <Field label="VIN" error={errors?.vin}>
        <input maxLength={17} {...register('vin', regOpts.vin)} />
      </Field>
      <Field label="Year" error={errors?.year}>
        <input type="number" {...register('year', regOpts.year)} />
      </Field>
      <Field label="Make" error={errors?.make}>
        <input maxLength={60} {...register('make', regOpts.make)} />
      </Field>
      <Field label="Model" error={errors?.model}>
        <input maxLength={60} {...register('model', regOpts.model)} />
      </Field>
      <button>Save Vehicle</button>
    </form >
  );


};

export default VehicleForm;