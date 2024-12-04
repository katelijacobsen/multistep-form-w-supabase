import Form from "next/form";

export default function StepThree({ data, formStatus }) {
  return (
    <Form>
      <h2>Ordre Bekræftelse</h2>
      <table className="w-full mb-4">
        <thead>
          <tr>
            <th>Navn</th>
            <th>E-mail</th>
          </tr>
        </thead>
        <tbody>
          {data.elfs.map((elf, i) => (
            <tr key={i}>
              <td>{elf.name}</td>
              <td>{elf.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        type="submit"
        disabled={formStatus.pending}
        className="btn-primary"
      >
        {formStatus.pending ? "Sender..." : "Bekræft"}
      </button>
    </Form>
  );
}
