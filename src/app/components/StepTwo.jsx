//Bruger react hooks. useState holder styr på vores tilstand i en funktionskomponent.
// Tiden (useState) bliver sporet i useEffect mens useEffect viser effekten på når tiden er udløbet.
import { useEffect, useState } from "react";
//Vi bruger den funktion til at håndtere ruteændringer i komponenten.
import { useRouter } from "next/navigation";
// export component funktion med props vi sender vider til komponenten. Det er indgridienser vi skal bruge til vores opskrift.
export default function StepTwo({ formAction, elfCount, resetForm }) {
  const [timeLeft, setTimeLeft] = useState(6); //Fortæller bare her hvor længe brugeren har tid.
  const router = useRouter(); //Nextjs hook til at styre navigation.

  useEffect(() => {
    if (timeLeft <= 0) {
      alert("Tiden er udløbet");
      resetForm(); // Nulstil state til at starte fra step 1
      formAction(null); //refresh form
      return;
    }
    // Bruger setInterval, så vi kan planlægge at bruge vores callback hver forsinkelse i millisekunder.
    const timer = setInterval(() => {
      // Går ned i tiden.
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000); //sætter 1000 som en værdi er bliver erstattet med tiden i useState.
    //Clean up. clearInterval stopper tiden. Så når den er på 0 skulle den gerne skifte router.
    return () => clearInterval(timer);
  }, [timeLeft, resetForm, router]);

  return (
    <form>
      <p>
        {/* Vi regner og deler timeleft antal sekunder. Med String formerer antallet af sekunder med to cifrer for udseenest skyld.*/}
        {/* Teknisk set skriver jeg her hvordan minutter skal så sammen med sekunder. */}
        Tid tilbage: {Math.floor(timeLeft / 60)}:
        {String(timeLeft % 60).padStart(2, "0")}
      </p>
      {/* Mapper vores antal form. per nisser kommer der 1 bruger op. */}
      {Array.from({ length: elfCount }, (_, i) => (
        <div key={i}>
          <label htmlFor={`name_${i}`}>
            Navn
            <input
              className="text-blue-800 my-2 mx-2"
              type="text"
              name={`name_${i}`}
            />
          </label>
          <label htmlFor={`email_${i}`}>
            Email
            <input
              className="text-blue-800 my-2 mx-2"
              type="email"
              name={`email_${i}`}
            />
          </label>
        </div>
      ))}
      {/* Tilføjer en callback i button. Sender argumentet vider  */}
      <button type="submit" formAction={formAction}>
        Næste
      </button>
    </form>
  );
}
