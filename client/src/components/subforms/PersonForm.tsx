import { useForm } from 'react-hook-form';
import { TPerson } from '../../types';
import { Field } from '../Field';

const getAge = (dob: Date) => {
  const diff = Date.now() - dob.getTime();
  const ageDt = new Date(diff);

  const age = Math.abs(ageDt.getUTCFullYear() - 1970);
  console.log(age);
  return age;
};


const PersonForm = ({ person, isclient, savePerson }: { person?: Partial<TPerson>, isclient?: boolean, savePerson: (p: TPerson) => void }) => {
  const { register, handleSubmit, formState } = useForm<TPerson>({ defaultValues: person });
  const { errors } = formState;


  // create and save a new person
  const handleAddPerson = (person: TPerson) => {
    savePerson(person);
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
    }
  };


  return (
    <form onSubmit={handleSubmit(handleAddPerson)} >
      <h2>Person</h2>
      <Field label="First Name" error={errors?.first}>
        <input name="first" {...register('first', regOpts.first)} />
      </Field>

      <Field label="Last Name" error={errors?.last}>
        <input name="last" {...register('last', regOpts.last)} />
      </Field>

      <Field label="Date of Birth" error={errors?.birth}>
        <input type="date" name="birth" {...register('birth', regOpts.birth)} />
      </Field>
      <button>Save Person</button>
    </form >
  );


}

export default PersonForm