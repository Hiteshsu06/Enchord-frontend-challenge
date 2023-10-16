import { TabView, TabPanel } from "primereact/tabview";
import { ImagesTab, PredictionsTab } from "./components";
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
            <ImagesTab />
          </TabPanel>
          <TabPanel header="Predictions">
            <PredictionsTab />
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
}

export default App;
