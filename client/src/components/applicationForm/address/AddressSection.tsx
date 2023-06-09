import React from 'react';
import { TAddress, TApplication } from '../../../types';
import AddressForm from './AddressForm';

type TAddressSectionProps = {
  address?: TAddress,
  save: (p: Partial<TApplication>) => void
}

const AddressSection = ({ address, save }: TAddressSectionProps) => {
  const saveAddress = (address: TAddress) => {
    save({ address });
  };

  return (
    <section>
      <h2>Address</h2>
      <AddressForm address={address} saveAddress={saveAddress} />
    </section>);
};

export default AddressSection;