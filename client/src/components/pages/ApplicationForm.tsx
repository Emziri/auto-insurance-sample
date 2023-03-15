import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TAddress, TApplication, TPerson, TVehicle } from '../../types';
import AddressForm from '../subforms/AddressForm';
import PersonForm from '../subforms/PersonForm';
import VehicleForm from '../subforms/VehicleForm';


const ApplicationForm = () => {
  const { applicationId } = useParams();
  const [applicationData, setApplicationData] = useState<TApplication>({});
  const [people, setPeople] = useState<TPerson[]>([]);
  const [vehicles, setVehicles] = useState<TVehicle[]>([]);
  const [loading, setLoading] = useState(applicationId ? true : false);
  const navigate = useNavigate();


  useEffect(() => {
    if (!applicationId) {
      return;
    }

    fetch(`/api/applications/${applicationId}`).then((res) => res.json()).then((data) => {
      setApplicationData(data);
      setPeople(data.people ?? []);
      setVehicles(data.vehicles ?? []);
      setLoading(false);
    });
    //TODO handle 404 application not found here
  }, [applicationId]);

  const saveAddress = (address: TAddress) => {
    setApplicationData({ ...applicationData, address });
  };

  const saveClientInfo = (person: Partial<TPerson>) => {
    setApplicationData({ ...applicationData, ...person });
  };

  const savePerson = (person: TPerson, personNo?: number) => {
    //if personNo doesn't exist, append to list
    setPeople((currentPeople) => {
      const newPeople = [...currentPeople];
      if (!personNo) {
        newPeople.push(person);
      }
      else {
        newPeople[personNo] = person;
      }
      setApplicationData({ ...applicationData, people: newPeople });
      return newPeople;
    });
  };

  const saveVehicle = (vehicle: TVehicle, vehicleNo?: number) => {
    setVehicles((currentVehicles) => {
      const newVehicles = [...currentVehicles];
      if (!vehicleNo) {
        if (newVehicles.length === 3) return newVehicles;
        newVehicles.push(vehicle);
      } else {
        if (vehicleNo < 0 || vehicleNo >= 3) return newVehicles;
        newVehicles[vehicleNo] = vehicle;
      }
      setApplicationData({ ...applicationData, vehicles: newVehicles });
      return newVehicles;

    });
  };


  const onSave = () => {
    if (!applicationId) {
      const requestOpts = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(applicationData)
      };
      fetch(`/api/applications/`, requestOpts)
        .then(resp => resp.json())
        .then(data => {
          const url = new URL((data.applicationUrl as string));
          navigate(url.pathname);
        });
    }
    else {
      const requestOpts = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(applicationData)
      };
      fetch(`/api/applications/${applicationId}`, requestOpts).then(resp => resp.json()).then(data => console.log(data, 'saved!!!'));
    }
  };
  const onEvaluate = () => console.log("evaluating whole application");

  const client: Partial<TPerson> | undefined = Object.keys(applicationData).length ? { first: applicationData.first, last: applicationData.last, birth: applicationData.birth } : undefined;

  return (
    <div>
      <h1>{applicationId ? `Application ${applicationId}` : `New Application`}</h1>
      <section>
        {loading ? (<h2>Loading form....</h2>) : (
          <div>
            <fieldset>
              <h2>Personal Information</h2>
              <PersonForm person={client} savePerson={saveClientInfo} isclient />
            </fieldset>
            <fieldset>
              <h2>Address</h2>
              <AddressForm address={applicationData?.address} saveAddress={saveAddress} />
            </fieldset>
            <fieldset>
              <h2>Vehicles</h2>
              {vehicles.map((vehicle, vNo) =>
                <VehicleForm key={vNo + vehicle.vin} vehicle={vehicle} vNo={vNo} saveVehicle={saveVehicle} />
              )}
              {vehicles?.length < 3 && <VehicleForm key={'newVeh'} saveVehicle={saveVehicle} />}
            </fieldset>
            <fieldset>
              <h2>Additional People</h2>
              {people.map((person, pNo) =>
                <PersonForm key={pNo + person.first} person={person} pNo={pNo} savePerson={savePerson} />
              )}
              <PersonForm key={'newPer'} savePerson={savePerson} />
            </fieldset>
            <button onClick={onSave}>save </button>
            <button onClick={onEvaluate}>get quote</button>

          </div>)}
      </section>

    </div>
  );

};

export default ApplicationForm;