import { getBillList } from "@/store/modules/billStore";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { TabBar } from "antd-mobile";
import './index.scss';
import { 
    BillOutline,
    CalculatorOutline,
    AddCircleOutline
 } from 'antd-mobile-icons';

const tabs = [
    {
      key: '/month',
      title: '月度账单',
      icon: <BillOutline />,
    },
    {
      key: '/new',
      title: '记账',
      icon: <AddCircleOutline />,
    },
    {
      key: '/year',
      title: '年度账单',
      icon: <CalculatorOutline />
    }
  ]

export default function Layout(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(1);
        dispatch(getBillList());
        console.log(2);
    }, [dispatch]);

    function switchRoute(path){
        navigate(path);
    }

    return (
        <div className="layout">
            <div className="container">
                <Outlet />
            </div>
            <div className="footer">
                <TabBar onChange={switchRoute}>
                    {tabs.map(item => (
                        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                    ))}
                </TabBar>
            </div>
        </div>
    );
}