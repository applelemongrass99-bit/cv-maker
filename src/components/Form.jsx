function Form({ fields, values, onChange, idPrefix }) {
  return (
		<fieldset> 
			{fields.map((field) => (
        <div key={field.id}>
          <label htmlFor={`${idPrefix}-${field.id}`}>{field.label}</label> 
          <input 
            type={field.type} 
            id={`${idPrefix}-${field.id}`} 
            name={field.id}
            value={values[field.id]}
            onChange={onChange} />
        </div>
      ))}
		</fieldset>
	)
}

export default Form;
