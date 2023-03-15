import React from 'react';
import { TApplication, TVehicle } from '../../../types';
import VehicleForm from './VehicleForm';

type TVehicleSectionProps = {
  vehicles: TVehicle[],
  save: (p: Partial<TApplication>) => void
}
const VehicleSection = ({ vehicles, save }: TVehicleSectionProps) => {

  const saveVehicle = (vehicle: TVehicle, vehicleNo?: number) => {
    const updatedVehicles = [...vehicles];

    if (vehicleNo === undefined) {
      if (updatedVehicles.length === 3) return;
      updatedVehicles.push(vehicle);
    } else {
      if (vehicleNo < 0 || vehicleNo >= 3) return;
      updatedVehicles[vehicleNo] = vehicle;
    }

    save({ vehicles: updatedVehicles });
  };

  return (
    <section>
      <h2>Vehicles</h2>
      {vehicles.map((vehicle, vNo) =>
        <VehicleForm key={vNo + vehicle.vin} vehicle={vehicle} vNo={vNo} saveVehicle={saveVehicle} />
      )}
      {vehicles?.length < 3 && <VehicleForm key={'newVeh'} saveVehicle={saveVehicle} />}
    </section>);
};

export default VehicleSection;