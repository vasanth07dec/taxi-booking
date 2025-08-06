import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { antTheme } from "./theme/theme";
import { router } from "./routes/routes";

const App = () => {
  return (
    <Provider store={store}>
      <ConfigProvider theme={antTheme}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </Provider>
  );
};

export default App;
