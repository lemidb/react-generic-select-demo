import { ModeToggle } from "./components/mode-toggle";
import ReactGenericDemo from "./components/react-generic-demo";

function App() {
  return (
    <div>
      <div className="flex flex-row justify-end px-5 py-2 mx-auto max-w-3xl border-b-2 ">
        <ModeToggle />
      </div>
      <ReactGenericDemo />
    </div>
  );
}

export default App;
