import React from 'react';
import { TApplication, TPerson } from '../../../types';
import PersonForm from './PersonForm';

type TPersonalInfoSectionProps = {
  person?: Partial<TPerson>,
  save: (p: Partial<TApplication>) => void
}

const PersonalInfoSection = ({ person, save }: TPersonalInfoSectionProps) => {

  const saveClientInfo = (person: Omit<TPerson, "relation">) => {
    save(person);
  };

  return (<section>
    <h2>Personal Information</h2>
    <PersonForm person={person} savePerson={saveClientInfo} isclient edit={!person} />
  </section>);
};

export default PersonalInfoSection;
