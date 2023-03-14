import { useState, useEffect } from 'react'
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { TAddress, TApplication, TPerson, TVehicle } from '../../types';
import AddressForm from '../subforms/AddressForm';
import PersonForm from '../subforms/PersonForm';
import VehicleForm from '../subforms/VehicleForm';


const ApplicationForm = () => {
  const { applicationId } = useParams();
  const [applicationData, setApplicationData] = useState<TApplication>({});
  const [loading, setLoading] = useState(applicationId ? true : false);
  const navigate = useNavigate();


  useEffect(() => {
    if (!applicationId) {
      return;
    };

    fetch(`/api/applications/${applicationId}`).then((res) => res.json()).then((data) => {
      setApplicationData(data);
      setLoading(false)
    });
    //TODO handle 404 application not found here
  }, [applicationId]);


  const saveAddress = (address: TAddress) => {
    setApplicationData({ ...applicationData, address });
  }

  const saveClientInfo = (person: Partial<TPerson>) => {
    setApplicationData({ ...applicationData, ...person })
  }

  const savePerson = (person: TPerson, personNo: number) => {
    //if personNo doesn't exist, append to list
  }

  const saveVehicle = (vehicle: TVehicle, vehicleNo: number) => {
    if (vehicleNo < 0 || vehicleNo >= 3) {
      console.log("can't add more than 3 vehicles");
      return;
    }


    //if vehicle no doesn't exist, append it to list
    //if list of vehicles == 3, can't add any more, only 0, 1, and 2
    //
  }


  const onSave = () => {
    if (!applicationId) {
      console.log('creating new application');
      const requestOpts = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(applicationData)
      }
      fetch(`/api/applications/`, requestOpts)
        .then(resp => resp.json())
        .then(data => {
          const url = new URL((data.applicationUrl as string));
          navigate(url.pathname);
        });
    }
    else {
      console.log('updating application', applicationId);
      const requestOpts = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(applicationData)
      }
      fetch(`/api/applications/${applicationId}`, requestOpts).then(resp => resp.json()).then(data => console.log(data, 'saved!!!'));
    }
  };
  const onEvalutate = () => console.log("evaluating whole application");

  const client: Partial<TPerson> | undefined = Object.keys(applicationData).length ? { first: applicationData.first, last: applicationData.last, birth: applicationData.birth } : undefined

  return (
    <div>
      <h1>{applicationId ? `Application ${applicationId}` : `New Application`}</h1>
      <section>
        {loading ? (<h2>Loading form....</h2>) : (
          <div>
            <div>{JSON.stringify(applicationData)}</div>
            <PersonForm person={client} savePerson={saveClientInfo} isclient />
            <AddressForm address={applicationData?.address} saveAddress={saveAddress} />
            <button onClick={onSave}>save application</button>
          </div>)}
      </section>

    </div>
  )

};

export default ApplicationForm