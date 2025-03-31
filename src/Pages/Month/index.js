import { DatePicker, NavBar } from "antd-mobile";
import './index.scss'
import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import _ from "lodash";
import DailyBill from "./components/DayBill";


export default function Month(){
    const billList = useSelector(state => state.bill.billList);
    const [dateVisible, setDateVisible] = useState(false);
    const [currentDate, setCurrentDate] = useState( dayjs(new Date()).format('YYYY | M') );
    const [monthList, setMonthList] = useState([]);

    // 将billList按月分组
    const { monthGroup, firstMonth } = useMemo(() => {
        const monthGroup =  _.groupBy(billList, item => dayjs(item.date).format('YYYY | M'));
        const Monthskey =  Object.keys(_.groupBy(billList, item => dayjs(item.date).format('YYYY-MM'))).sort();
        const firstMonth = Monthskey[0];
        return {
            monthGroup,
            firstMonth
        };
    }, [billList]);


    useEffect(() => {
        if(monthGroup[dayjs().format('YYYY | M')]){
            setMonthList(monthGroup[dayjs().format('YYYY | M')]);
        }
    }, [monthGroup]);

    // 计算收支结余
    const monthResult = useMemo(() => {
        const pay = monthList.filter(item => item.type === 'pay').reduce((sum, item) => sum += item.money, 0);
        const income = monthList.filter(item => item.type === 'income').reduce((sum, item) => sum += item.money, 0);
        return {
            pay,
            income,
            total: pay + income
        }
    }, [monthList]);

    //切换月份
    function handleOnConfirm(date){
        const formatDate = dayjs(date).format('YYYY | M');
        setCurrentDate(formatDate);
        setMonthList(monthGroup[formatDate]);
        setDateVisible(false);
    }

    // 将monthList按日分组，返回日期数组和对应的bill
    const dayGroup = useMemo(() => {
        const groupDay =  _.groupBy(monthList, item => dayjs(item.date).format('YYYY-MM-DD'));
        const keys = Object.keys(groupDay);
        return {
            keys,
            groupDay
        };
    }, [monthList]);

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
                        min={new Date(firstMonth)}
                        onClose={() => { setDateVisible(false); }}
                        onConfirm={handleOnConfirm}
                    />
                </div>

                {/* 单日列表统计 */}
                {
                    dayGroup.keys.map( item => {
                        return <DailyBill key={item} date={item} billList={dayGroup.groupDay[item]} />
                    })
                }
            </div>
        </div>
    );
}