import React, { useState, useEffect } from 'react';
import { TApplication } from '../types';
import LinkButton from './LinkButton';

const Applications = () => {
  const [applications, setApplications] = useState<TApplication[]>([]);

  useEffect(() => {
    fetch("/api/applications/").then((resp) => resp.json()).then((data) => setApplications(data));
  }, []);

  return (
    <main>
      <h1>Applications</h1>
      <section>
        <ul>
          {applications.map((application) => <li key={application.id}><LinkButton to={`/applications/${application.id}`}>Application {application.id}</LinkButton></li>)}
        </ul>
        <LinkButton to={'/apply'}>New Application</LinkButton>
      </section>
    </main>
  );
};

export default Applications;
