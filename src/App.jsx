import AuthProvider from "./context/AuthContext";
import Router from "./shared/Router";

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;
