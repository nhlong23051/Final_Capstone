import { Route } from "react-router-dom";
import { lazy } from "react";

const routes = [
    {
        path: "",
        element: lazy(() => import("../page/HomePageTemplate/index")),
        nested: [
            { path: "", element: lazy(() => import("../page/HomePageTemplate/index")) },
        ]
    },

    // {
    //     path: "admin",
    //     element: lazy(() => import("../page/AdminTemplate")),
    //     nested: [
    //         { path: "dashboard", element: lazy(() => import("../page/AdminTemplate/DashBoard")) },
    //         { path: "manage-user", element: lazy(() => import("../page/AdminTemplate/User"))},
    //         { path: "add-user", element: lazy(() => import("../page/AdminTemplate/AddUser")) },
    //         { path: "edit-user/:id", element: lazy(() => import("../page/AdminTemplate/EditUser")) },
    //         { path: "add-film", element: lazy(() => import("../page/AdminTemplate/AddFilm")) },
    //         { path: "edit-film/:id", element: lazy(() => import("../page/AdminTemplate/EditFilm")) },
    //         { path: "add-show-time/:id", element: lazy(() => import("../page/AdminTemplate/AddShowTime")) },
    //     ],
    // },
    { path: "login", element: lazy(() => import("../page/LoginTemplate/LoginPageTemplate")) },
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