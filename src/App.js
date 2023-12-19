import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import HomePage from "./pages/HomePage/HomePage";
import CartPage from "./pages/CartPage/CartPage";
import OrdersPage from "./pages/OrdersPage/OrdersPage";


function App() {

  const router = createBrowserRouter([
    {path: "/", element: <NavigationBar /> ,children:[
      {index: true, element: <HomePage />},
      {path: "cart", element: <CartPage />},
      {path: "orders", element: <OrdersPage />}
    ]}
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
