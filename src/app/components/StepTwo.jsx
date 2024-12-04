export default function StepTwo({ formAction, elfCount }) {

  console.log(elfCount);
  
  console.log(Array.from({ length: elfCount }, (_, i) => i));
  return (
    <form>
      {/* mapper vores nisser */}
      {Array.from({ length: elfCount }, (_, i) => {
        console.log("zfdsgadfgfadg");
        
        return (
          <div key={i}>
            <label htmlFor="name">
              Navn
              <input
                className="text-blue-800 my-2 mx-2"
                type="text"
                name={`name_${i}`}
              />
            </label>
            <label htmlFor="name">
              Email
              <input
                className="text-blue-800 my-2 mx-2"
                type="email"
                email={`email_${i}`}
              />
            </label>
          </div>
        );
      })}
      <button type="submit" formAction={formAction}>
        Næste
      </button>
    </form>
  );
}
