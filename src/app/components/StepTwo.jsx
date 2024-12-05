import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function StepTwo({ formAction, elfCount, resetForm }) {
  const [timeLeft, setTimeLeft] = useState(3); 
  const router = useRouter();

  useEffect(() => {
    if (timeLeft <= 0) {
      alert("Tiden er udløbet");
      resetForm(); // Nulstil state til at starte fra Step 1
      formAction(null) //refresh form 
      // router.push("/form"); 
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, resetForm, router]);

  return (
    <form>
      <p className="timer">
        Tid tilbage: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
      </p>
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
      <button type="submit" formAction={formAction}>
        Næste
      </button>
    </form>
  );
}
