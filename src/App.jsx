import Form from './components/Form.jsx';
import { useState } from 'react';

const general = [
  {id:"name", label:"Full Name:", type:"text"},
  {id:"email", label:"Email:", type:"email"},
  {id:"phone", label:"Phone Number:", type:"tel"}
]

const education = [
  {id:"schoolName", label:"School Name:", type:"text"},
  {id:"titileOfStudy", label:"Title of Study:", type:"text"},
  {id:"graduationDate", label:"Graduation Date:", type:"date"}
]

const emptyValues = (fields) => 
  Object.fromEntries(fields.map((field) => [field.id, ""]));

const newEducationEntry = () => ({
  entryId: crypto.randomUUID(),
  ...emptyValues(education),
});

function App() {
  const [generalValues, setGeneralValues] = useState(emptyValues(general));
  const [educationList, setEducationList] = useState([newEducationEntry()]);

  function handleGeneralChange(e) {
    setGeneralValues({...generalValues, [e.target.name]: e.target.value})
  }

  function handleEducationChange(entryId, e) {
    const { name, value } = e.target;
    setEducationList((list) => 
      list.map((entry) =>
        entry.entryId === entryId ? { ...entry, [name]: value} : entry
      )
    );
  }
  
  function addEducation() {
      setEducationList([...educationList, newEducationEntry()]);
  }

  function handleGeneralSubmit(e) {
    e.preventDefault();
    console.log(generalValues);
  }

  function handleEducationSubmit(e) {
    e.preventDefault();
    console.log(educationList);
  }

  return (
    <>
      <section id="general">
        <form onSubmit={handleGeneralSubmit}>
          <Form fields={general} values={generalValues} onChange={handleGeneralChange}/>
          <button type="submit">Submit</button>
        </form>
      </section>

      <section id="education">
        <form onSubmit={handleEducationSubmit}>
          { educationList.map(entry => (
            <Form 
              key={entry.entryId} 
              fields={education} 
              values={entry}
              onChange={(e) => handleEducationChange(entry.entryId, e)} 
              idPrefix={entry.entryId}/>)) }
          <button type="button" onClick={addEducation}>Add Education</button> 
          <button type="submit">Submit</button>
        </form>
      </section>
    </>
  )
}

export default App;
