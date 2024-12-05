export default function StepOne({ formAction }) {
  //undgår at refresh
  const handleSubmit = (formData) => {
    formAction(formData); //den hjælper allerede med at refreshe som default.
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
      {/* Tilføjer en callback i button. Sender argumentet vider  */}
      <button type="submit" formAction={handleSubmit}>
        Næste
      </button>
    </form>
  );
}
