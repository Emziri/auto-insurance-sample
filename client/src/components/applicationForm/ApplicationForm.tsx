import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TApplication, TPerson } from '../../types';
import AddressSection from './address/AddressSection';
import PeopleSection from './person/PeopleSection';
import PersonalInfoSection from './person/PersonalInfoSection';
import ValidationModal from './ValidationModal';
import VehicleSection from './vehicle/VehicleSection';


const ApplicationForm = () => {
  const { applicationId } = useParams();
  const [applicationData, setApplicationData] = useState<TApplication>({});
  const [loading, setLoading] = useState(applicationId ? true : false);
  const [showValidation, setShowValidation] = useState(false);
  const [vMessage, setVMessage] = useState("");
  const navigate = useNavigate();

  //fetch form data based on route id
  useEffect(() => {
    if (!applicationId) {
      return;
    }

    fetch(`/api/applications/${applicationId}`).then((res) => res.json()).then((data) => {
      setApplicationData(data);
      setLoading(false);
    });
  }, [applicationId]);


  // update application or create application if making new
  const handleSave = useCallback(() => {
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
      fetch(`/api/applications/${applicationId}`, requestOpts).then(resp => resp.json()).then(data => { console.log(data, 'saved'); alert('application saved!'); });
    }
  }, [applicationData]);


  const onEvaluate = () => {
    const requestOpts = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch(`/api/applications/${applicationId}/validate`, requestOpts)
      .then(resp => resp.json())
      .then(data => {
        setVMessage(data.message.toString());
      });

    setShowValidation(true);
  };

  const onSaveSection = (part: Partial<TApplication>) => {
    setApplicationData({ ...applicationData, ...part });
  };

  const client: Partial<TPerson> | undefined = Object.keys(applicationData).length ? { first: applicationData.first, last: applicationData.last, birth: applicationData.birth } : undefined;

  return (
    <main>
      <h1>{applicationId ? `Application ${applicationId}` : `New Application`}</h1>
      {loading ? (<h2>Loading form....</h2>) : (
        <div>
          <PersonalInfoSection person={client} save={onSaveSection} />
          <AddressSection address={applicationData.address} save={onSaveSection} />
          <VehicleSection vehicles={applicationData.vehicles ?? []} save={onSaveSection} />
          <PeopleSection people={applicationData.people ?? []} save={onSaveSection} />
          <button onClick={handleSave}>save </button>
          <button onClick={onEvaluate}>get quote</button>
          <ValidationModal message={vMessage} show={showValidation} close={() => setShowValidation(false)} />
        </div>)}
    </main>
  );

};

export default ApplicationForm;