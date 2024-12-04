export default function StepOne({formAction}) {
  //undgår at refresh
  const handleSubmit = (formData) => {
    // console.log(e, state);
    
    // e.preventDefault();
    // const count = parseInt(e.target.value, 10);
    formAction(formData);
  };

  return (
    <form>
      <label htmlFor="nisseCount">
        Vælg hvor mange julenisser du vil have med hjem
        <input
          className="text-black"
          type="number"
          name="elfCount"
          min="1"
          max="10"
          required
        />
      </label>
      <button type="submit" formAction={handleSubmit}>Næste</button>
    </form>
  );
}
