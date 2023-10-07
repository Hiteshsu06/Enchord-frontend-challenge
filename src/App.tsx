import { TabView, TabPanel } from "primereact/tabview";
import { Images, Predictions } from "./components";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div>
      <div className="align-center">
        <h1>Encord-frontend-challenge</h1>
      </div>
      <div>
        <TabView>
          <TabPanel header="Images">
            <Images />
          </TabPanel>
          <TabPanel header="Predictions">
            <Predictions />
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
}

export default App;
