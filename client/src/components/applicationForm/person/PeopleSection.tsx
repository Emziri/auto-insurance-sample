import React from "react";
import { TApplication, TPerson } from "../../../types";
import PersonForm from "./PersonForm";

type TPeopleSectionProps = {
  people: TPerson[],
  save: (p: Partial<TApplication>) => void
}

const PeopleSection = ({ people, save }: TPeopleSectionProps) => {

  const savePerson = (person: TPerson, personNo?: number) => {
    const updatedPeople = [...people];

    if (personNo === undefined) {
      updatedPeople.push(person);
    }
    else {
      updatedPeople[personNo] = person;
    }

    save({ people: updatedPeople });
  };


  return (
    <section>
      <h2>Additional People</h2>
      {people.map((person, pNo) =>
        <PersonForm key={pNo + person.first} person={person} pNo={pNo} savePerson={savePerson} />
      )}
      <PersonForm key={'newPer'} savePerson={savePerson} edit />
    </section>);
};

export default PeopleSection;