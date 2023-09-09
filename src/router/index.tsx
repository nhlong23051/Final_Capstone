import { Route } from "react-router-dom";
import { lazy } from "react";

let id: number = 0
const routes = [
    {
        path: "",
        element: lazy(() => import("../page/HomePageTemplate")),
        nested: [
            { path: "", element: lazy(() => import("../page/HomePageTemplate/Project")) },
            { path: "profile", element: lazy(() => import("../page/HomePageTemplate/Profile")) },
            { path: "create-project", element: lazy(() => import("../page/HomePageTemplate/CreateProject")) },
            { path: "all-user", element: lazy(() => import("../page/HomePageTemplate/User")) },
            { path: `project/:id`, element: lazy(() => import("../page/HomePageTemplate/DetailProject")) },
            { path: `edit-project/:id`, element: lazy(() => import("../page/HomePageTemplate/EditProject")) },

        ]
    },

    { path: "login", element: lazy(() => import("../page/LoginTemplate")) },
    { path: "register", element: lazy(() => import("../page/RegisterTemplate")) },
    { path: "*", element: lazy(() => import("../page/404PageTemplate")) },


];

const renderRoutes = () => {
    return routes.map((route) => {
        if (route.nested) {
            return (
                <Route
                    key={route.path}
                    path={route.path}
                    element={<route.element />}
                >
                    {route.nested.map((item) => {
                        return (
                            <Route
                                key={item.path}
                                path={item.path}
                                element={<item.element />}
                            />
                        )
                    })}
                </Route>
            )
        } else {
            return (
                <Route
                    key={route.path}
                    path={route.path}
                    element={<route.element />}
                />
            )
        }
    })
};



export default renderRoutes;