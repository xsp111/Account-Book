import { getBillList } from "@/store/modules/billStore";
import { useEffect, useState } from "react";
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
      key: '/',
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
    const [activeKey, setActiveKey] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getBillList());
    }, [dispatch]);

    function switchRoute(path){
        setActiveKey(path);
        navigate(path);
    }

    return (
        <div className="layout">
            <div className="container">
                <Outlet />
            </div>
            <div className="footer">
                <TabBar 
                    onChange={switchRoute}
                    activeKey={activeKey}
                >
                    {tabs.map(item => (
                        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                    ))}
                </TabBar>
            </div>
        </div>
    );
}