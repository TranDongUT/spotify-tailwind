import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "./routes/Routes";
import Layout from "./layouts/Layout";

function App() {
  const renderRoute = (routes: any) => {
    if (!routes) return;
    return routes.map((route: any, index: number) => (
      <Route key={index} path={route.path} element={route.element}>
        {renderRoute(route?.children)}
      </Route>
    ));
  };

  return (
    <div>
      <Layout>
        <Suspense fallback={<div>"Loading..."</div>}>
          <Routes>{renderRoute(routes)}</Routes>
        </Suspense>
      </Layout>
    </div>
  );
}

export default App;
