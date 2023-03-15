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

  const hasPerson = person && (person.first || person.last || person.birth);
  return (<section>
    <h2>Personal Information</h2>
    <PersonForm person={person} savePerson={saveClientInfo} isclient edit={!hasPerson} />
  </section>);
};

export default PersonalInfoSection;
