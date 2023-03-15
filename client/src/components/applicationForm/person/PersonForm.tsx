import { useForm } from 'react-hook-form';
import { RelationTypes, TPerson } from '../../../types';
import { Field } from '../../Field';
import React, { useState } from 'react';

const getAge = (dob: Date) => {
  if (Date.now() < dob.getTime()) return 0;
  const diff = Date.now() - dob.getTime();
  const ageDt = new Date(diff);
  const age = Math.abs(ageDt.getUTCFullYear() - 1970);
  return age;
};

type TPersonFormProps = {
  person?: Partial<TPerson>,
  pNo?: number,
  isclient?: boolean,
  edit?: boolean
  savePerson: (p: TPerson, pNo?: number) => void
}

const PersonForm = ({ person, pNo, isclient, edit, savePerson }: TPersonFormProps) => {
  const { register, handleSubmit, reset, formState } = useForm<TPerson>({ defaultValues: person });
  const { errors } = formState;

  const [editMode, setEditMode] = useState(Boolean(edit));

  const handleSave = (person: TPerson) => {
    // pNo indicates this was an existing person on the application
    savePerson(person, pNo);
    if (pNo === undefined && !isclient) reset();

    setEditMode(pNo === undefined && !isclient ? true : false);
  };


  // form validation
  const regOpts = {
    first: { required: 'Name is required' },
    last: { required: 'Name is required' },
    birth: {
      required: 'DoB is required',
      valueAsDate: true,
      validate: {
        age: (dob: Date) => getAge(dob) >= 16 || 'Must be at least 16',
        reasonable: (dob: Date) => dob.getFullYear() >= 1900 || 'No vampires allowed'
      }
    },
    relation: {
      required: isclient ? false : 'Relation to person required'
    }
  };

  return (
    <div className='formBox'>
      <form onSubmit={handleSubmit(handleSave)} >
        <Field label="First Name" error={errors?.first}>
          <input disabled={!editMode} maxLength={250} {...register('first', regOpts.first)} />
        </Field>
        <Field label="Last Name" error={errors?.last}>
          <input disabled={!editMode} maxLength={250} {...register('last', regOpts.last)} />
        </Field>
        <Field label="Date of Birth" error={errors?.birth}>
          <input disabled={!editMode} type="date" {...register('birth', regOpts.birth)} />
        </Field>
        {!isclient &&
          <Field label="Relationship to Person" error={errors?.relation}>
            <select disabled={!editMode} {...register('relation', regOpts.relation)}>
              <option value="">Select One</option>
              {RelationTypes.map((relation) =>
                <option key={relation} value={relation}>{relation}</option>
              )}
            </select>
          </Field>}
        {editMode && <button type="submit">Save Person</button>}
      </form >
      {!editMode && <button className='editButton' type="button" onClick={() => setEditMode(true)}>Edit</button>}
    </div>
  );


};

export default PersonForm;