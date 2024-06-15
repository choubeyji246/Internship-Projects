import Header from "./Components/Header";
import Menu from "./Components/Menu";
import { CartContextProvider } from "./store/CartContext";

function App() {
  return (
    <CartContextProvider>
     <Header/>
     <Menu/>
     </CartContextProvider>
   
  );
}

export default App;
