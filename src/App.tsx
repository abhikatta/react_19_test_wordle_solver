import { useActionState } from "react";

const onSubmit = (prevState: any | null, formData: FormData) => {
  {
    Array.from({ length: 5 }).map((_, index) => {
      console.log(prevState, formData?.get(`C_L${index + 1}`));
      console.log(prevState, formData?.get(`Y_L${index + 1}`));
      console.log(prevState, formData?.get(`G_L${index + 1}`));
    });
  }
};

const App = () => {
  const [error, submitAction] = useActionState(onSubmit, null);
  error && <p>{error}</p>;
  return (
    <form
      className="h-screen w-screen bg-slate-600 flex flex-col justify-center items-center gap-5"
      action={submitAction}>
      <div className="gap-2 flex flex-col">
        <label className="text-white">Correct Ones:</label>
        <div className="gap-2 flex flex-row">
          {Array.from({ length: 5 }).map((_, index) => {
            return (
              <input
                key={index}
                maxLength={1}
                className="w-[3rem] h-[3rem] text-center bg-green-700 rounded-md outline-none border-none text-white"
                name={`C_L${index + 1}`}></input>
            );
          })}
        </div>
      </div>
      <div className="gap-2 flex flex-col">
        <label className="text-white">Yellow Ones:</label>
        <div className="gap-2 flex flex-row">
          {Array.from({ length: 5 }).map((_, index) => {
            return (
              <input
                key={index}
                maxLength={1}
                className="w-[3rem] h-[3rem] text-center bg-yellow-400 rounded-md outline-none border-none text-black"
                name={`Y_L${index + 1}`}></input>
            );
          })}
        </div>
      </div>
      {/* TODO: gray ones can be > 5 */}
      <div className="gap-2 flex flex-col">
        <label className="text-white">Gray Ones:</label>
        <div className="gap-2 flex flex-row">
          {Array.from({ length: 5 }).map((_, index) => {
            return (
              <input
                key={index}
                maxLength={1}
                className="w-[3rem] h-[3rem] text-center bg-slate-700 rounded-md outline-none border-none text-white"
                name={`G_L${index + 1}`}></input>
            );
          })}
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default App;
