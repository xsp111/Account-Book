import { DatePicker, NavBar } from "antd-mobile";
import './index.scss'
import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import _ from "lodash";


export default function Month(){
    const billList = useSelector(state => state.bill.billList);
    const [dateVisible, setDateVisible] = useState(false);
    const [currentDate, setCurrentDate] = useState( dayjs(new Date()).format('YYYY | M') );
    const [monthList, setMonthList] = useState([]);
    const monthGroup = useMemo(() => {
        return _.groupBy(billList, item => dayjs(item.date).format('YYYY | M'));
    }, [billList]);

    useEffect(() => {
        if(monthGroup[dayjs().format('YYYY | M')]){
            setMonthList(monthGroup[dayjs().format('YYYY | M')]);
        }
    }, [monthGroup]);

    const monthResult = useMemo(() => {
        const pay = monthList.filter(item => item.type === 'pay').reduce((sum, item) => sum += item.money, 0);
        const income = monthList.filter(item => item.type === 'income').reduce((sum, item) => sum += item.money, 0);
        return {
            pay,
            income,
            total: pay + income
        }
    }, [monthList]);

    function handleOnConfirm(date){
        const formatDate = dayjs(date).format('YYYY | M');
        setCurrentDate(formatDate);
        setMonthList(monthGroup[formatDate]);
        setDateVisible(false);
    }

    return (
        <div className="monthlyBill">
            <NavBar className="nav" backArrow={false}>
                月度收支
            </NavBar>
            <div className="content">
                <div className="header">
                    {/* time change */}
                    <div className="date" onClick={() => { setDateVisible(true); }}>
                        <span className="text">
                            { currentDate }月账单
                        </span>
                        <span className={'arrow ' + (dateVisible ? '' : 'expand')}></span>
                    </div>
                    {/* total */}
                    <div className="twoLineOverview">
                        <div className="item">
                            <span className="money">{monthResult.pay.toFixed(2)}</span>
                            <span className="type">支出</span>
                        </div>
                        <div className="item">
                            <span className="money">{monthResult.income.toFixed(2)}</span>
                            <span className="type">收入</span>
                        </div>
                        <div className="item">
                            <span className="money">{monthResult.total.toFixed(2)}</span>
                            <span className="type">结余</span>
                        </div>
                    </div>
                    {/* time selector */}
                    <DatePicker
                        className="kaDate"
                        title="记账日期"
                        precision="month"
                        visible={dateVisible}
                        max={new Date()}
                        min={new Date('2025-1')}
                        onClose={() => { setDateVisible(false); }}
                        onConfirm={handleOnConfirm}
                    />
                </div>
            </div>
        </div>
    );
}