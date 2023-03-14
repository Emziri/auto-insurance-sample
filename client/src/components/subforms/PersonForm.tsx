import { useForm } from 'react-hook-form';
import { TPerson } from '../../types';

const getAge = (dob: Date) => {
  const diff = Date.now() - dob.getTime();
  const ageDt = new Date(diff);

  const age = Math.abs(ageDt.getUTCFullYear() - 1970);
  console.log(age);
  return age;
};


const PersonForm = () => {
  // TODO: make this a modal, or only have it show up when you add a new person

  const { register, handleSubmit, reset, formState } = useForm<TPerson>();
  const { errors } = formState;


  // create and save a new person
  const handleAddPerson = (person: TPerson) => {
    const requestOpts = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(person)
    }
    fetch('/api/people', requestOpts).then(resp => resp.json()).then(data => console.log(data))
    reset();
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
      <h2>Add Person</h2>
      <div>
        <label>First Name</label>
        <input name="first" {...register('first', regOpts.first)} />
        {errors?.first && errors.first.message}
      </div>
      <div>
        <label>Last Name</label>
        <input name="last" {...register('last', regOpts.last)} />
        {errors?.last && errors.last.message}
      </div>
      <div>
        <label>Date of Birth</label>
        <input type="date" name="birth" {...register('birth', regOpts.birth)} />
        {errors?.birth && errors.birth.message}
      </div>
      <button>Save Person</button>
    </form >
  );


}

export default PersonForm