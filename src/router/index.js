import Layout from "@/Pages/Layout";
import Month from "@/Pages/Month";
import New from "@/Pages/New";
import Year from "@/Pages/Year";
import { createBrowserRouter } from "react-router-dom"; 


const router = createBrowserRouter([
   {
        path: '/',
        element: <Layout />,
        children:[
            {
                path: 'month',
                element: <Month />
            },
            {
                path: 'year',
                element: <Year />
            }
        ]
   },
   {
        path: '/new',
        element: <New />
   }
]);

export default router;