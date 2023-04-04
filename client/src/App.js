import { Outlet }       from "react-router-dom";
import LayoutContainer  from "./Layouts/LayoutContainer";




function App() {

  return (

      <LayoutContainer>
        <Outlet/>
      </LayoutContainer>

  );
}

export default App;
