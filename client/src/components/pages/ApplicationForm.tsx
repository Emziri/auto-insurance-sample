import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { TApplication } from '../../types';
import AddressForm from '../subforms/AddressForm';
import PersonForm from '../subforms/PersonForm';
import VehicleForm from '../subforms/VehicleForm';


const ApplicationForm = () => {
  const { applicationId } = useParams();
  const [applicationData, setApplicationData] = useState<TApplication>();

  useEffect(() => {
    if (!applicationId) {
      return;
    };

    fetch(`/api/applications/${applicationId}`).then((res) => res.json()).then((data) => setApplicationData(data));
  }, [applicationId]);

  return (
    <div className='container'>
      {applicationData ? <div>{JSON.stringify(applicationData)}</div> : <div>empty app form or loading</div>}
      <PersonForm />
      <VehicleForm />
      <AddressForm />
    </div>
  )

};

export default ApplicationForm