// Her samler vi vores componenter sammen på en side.
// bliver kørt på klientens side, derfor use client.
"use client";
// Importere hooks fra nextjs
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
// Når vi bruger useFormState kan vi ændre handlingens funktionssignatur
// til at modtage en ny prevState- eller
//initial State parameter so mdets første argument.
import Step1 from "@/app/components/StepOne";
import Step2 from "@/app/components/StepTwo";
import Step3 from "@/app/components/StepThree";

// Når vi bruger useActionState-hook
const defaultState = {
  step: 0,
  elfCount: undefined,
  elfs: [],
};

const handleStep = (prev, formData) => {
  // Hvis der ikke er noget data så gå tilbage til defaultState.
  if (!formData) {
    return defaultState;
  }
  //Vis at man kan vælge nisser.
  if (prev.step === 0) {
    //spread & object destructuring
    return { ...prev, step: prev.step + 1, elfCount: formData.get("elfCount") };
  }
  //vis de samme antal inputs af de antal nisser man har valgt.
  if (prev.step === 1) {
    const elfs = Array.from({ length: prev.elfCount }, (_, i) => ({
      name: formData.get(`name_${i}`),
      email: formData.get(`email_${i}`),
    }));

    //object destructuring, vider til det næste step med elfs. Objekter går til det næste step.
    //Hvordan skal det næste Object være? Den bliver ændret i hver komponent.
    return { ...prev, step: prev.step + 1, elfs };
  }
};

export default function Form() {
  //tilføje vores array, som fyldes op med nisser.
  const [state, formAction] = useActionState(handleStep, defaultState);
  //Kontrollere om formen mens den bliver sendt.
  const status = useFormStatus();

  const resetForm = () => {
    formAction(new FormData()); // Tvinger state tilbage til defaultState ved at kalde formAction uden data
  };

  return (
    <>
      <h1>Julenisse Gaveuddeling</h1>
      {/* Step 1 er det første der bliver renderet. klikker man vider kommer den næste komponent op. */}
      {/* tilføjer prop (objekt. sender data fra parent til children) i komponenterne */}
      {state.step === 0 && <Step1 formAction={formAction} />}
      {state.step === 1 && (
        <Step2
          formAction={formAction}
          elfCount={state.elfCount}
          resetForm={resetForm}
        />
      )}
      {state.step === 2 && <Step3 data={state} formStatus={status} />}
    </>
  );
}
