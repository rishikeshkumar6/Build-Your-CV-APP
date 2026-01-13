import "./App.css";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import Router from "./router/Router";
import store from "./Redux/store.js";

function App() {
  return (
    <Provider store={store}>
      <ToastContainer
        hideProgressBar
        autoClose={3000}
        pauseOnHover={false}
        className="!w-[400px]"
      />
      <Router />
    </Provider>
  );
}

export default App;
