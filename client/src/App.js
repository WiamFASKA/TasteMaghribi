

import {DataProvider} from "./GlobalState"
import Header from "./components/header/Header"
import MainPages from './components/mainpages/Pages'

function App() {
  return (
   < DataProvider>
   
    <div className="App">
   <Header/>
   <MainPages/>
    </div>
   
    </DataProvider>
  );
}

export default App;