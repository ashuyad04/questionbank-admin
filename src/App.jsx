import { BrowserRouter } from "react-router-dom";
import RoutesFile from "./routes";

export default function App() {
  return (
    <BrowserRouter>
      <RoutesFile />
    </BrowserRouter>
  );
}
