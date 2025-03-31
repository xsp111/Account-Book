import { DatePicker, NavBar, Avatar } from 'antd-mobile';
import './index.scss';
import { BarChart, Bar, ResponsiveContainer, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import _ from 'lodash';
import dayjs from 'dayjs';
import { addTypeToBills } from '../Month/components/DayBill/billTypeTranform';
import CategoryPieCharts from './components/PieChart';


  

export default function Year(){
    const billList = useSelector(state => state.bill.billList);
    const [currentYear, setCurrentYear] = useState(dayjs(new Date()).format('YYYY'));
    const [ yearList, setYearList ] = useState([]);
    const [ yearSelect, setYearSelect ] = useState(false);

    console.log(yearList);
    // 计算年度收支结余
    const yearResult = useMemo(() => {
        const pay = yearList.filter(item => item.type === 'pay').reduce((sum, item) => sum += item.money, 0);
        const income = yearList.filter(item => item.type === 'income').reduce((sum, item) => sum += item.money, 0);
        return {
            pay,
            income,
            total: pay + income
        }
    }, [yearList]);

    // 账单列表按年份分组
    const  { firstYear, yearGroup } = useMemo(() => {
            const yearGroup =  _.groupBy(billList, item => dayjs(item.date).format('YYYY'));
            const firstYear = Object.keys(yearGroup).sort()[0];
            return  {
                yearGroup,
                firstYear
            };
    }, [billList]);

    useEffect(() => {
        if(yearGroup[dayjs().format('YYYY')]){
            setYearList(yearGroup[dayjs().format('YYYY')]);
        }
    }, [yearGroup]);

    // 柱状图数据列表：年份账单列表按月份分组，并计算每月的支出和收入
    const monthsList = useMemo(() => {
        const monthGroup = _.groupBy(yearList, item => dayjs(item.date).format('MM'));
        const months  = Object.keys(monthGroup).sort();
        return months.map( month => {
            const dayList = monthGroup[month];
            const pay = dayList.filter(item => item.type === 'pay').reduce((sum, item) => sum += item.money, 0);
            const income = dayList.filter(item => item.type === 'income').reduce((sum, item) => sum += item.money, 0);
            return {
                month: month,
                pay: -pay,
                income
            } ;
        });
    }, [yearList]);

    // 扇形图数据列表： 年份账单列表按类型分组，并计算每个类型的支出和收入
    function sumByCategoryType(bills){
        const result = { pay: {}, income: {} };
        bills.forEach(bill => {
          const group = bill.type === 'pay' ? 'pay' : 'income';
          const categoryType = bill.categoryType || '未分类';
        if (result[group][categoryType]) {
            result[group][categoryType] += bill.money;
        } else {
            result[group][categoryType] = bill.money;
          }
        });
        return {
          pay: Object.entries(result.pay).map(([type, money]) => ({ type, money })),
          income: Object.entries(result.income).map(([type, money]) => ({ type, money }))
        };
    };
    const typeList = useMemo(() => {
        return sumByCategoryType(addTypeToBills(yearList));
    }, [yearList]);

    function handleOnConfirm(date){
        const formatYear = dayjs(date).format('YYYY');
        setCurrentYear(formatYear);
        setYearList(yearGroup[formatYear]);
        setYearSelect(false);
    }

    return (
        <div className='person'>
            <NavBar className="nav" backArrow={true}>
                            总览
            </NavBar>
            <div className='content'>
                <header className='user'>
                    <Avatar 
                        src='' 
                        style={{ '--size': '48px' }}
                    />
                    <span className='username'>用户名</span>
                </header>
                <div className='yearBill'>
                    <div className='yearSelect'>
                        <span 
                            className='text'
                            onClick={ () => { setYearSelect(true); } }                        >
                            {currentYear}年
                            <span className={'arrow ' + (yearSelect ? '' : 'expand')}></span>
                        </span>
                        <div className="pay">
                            <span className="type">支出</span>
                            <span className="money">{yearResult.pay}</span>
                        </div>
                        <div className="income">
                            <span className="type">收入</span>
                            <span className="money">{yearResult.income}</span>
                        </div>
                        <div className="balance">
                            <span className="type">结余</span>
                            <span className="money">{yearResult.total}</span>
                        </div>
                        <DatePicker
                            className="kaDate"
                            title="年份"
                            precision="year"
                            min={new Date(firstYear)}
                            max={new Date()}
                            visible={yearSelect}
                            onConfirm={handleOnConfirm}
                            onCancel={() => { setYearSelect(false); }}
                            onClose={() => { setYearSelect(false); }}
                        />
                    </div>
                    <div className='chart'>
                        <ResponsiveContainer width='100%' height={200}>
                            <BarChart data={monthsList} margin={{top: 10, right:50}}>
                                <XAxis dataKey="month" />
                                <YAxis tick={{ fontSize: 10 }}/>
                                <Tooltip />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Legend />
                                <Bar dataKey="pay" fill="#EF4444" />
                                <Bar dataKey="income" fill="#00C49F" />
                                <Line type="monotone" dataKey="balance" stroke="#ff0000" />
                            </BarChart>
                        </ResponsiveContainer>
                        <ResponsiveContainer className='PieChart' width='100%' height={250}>
                            <CategoryPieCharts data={typeList} />
                        </ResponsiveContainer>
                    </div>
                    <div className='overview'>
                        {/* 每月预览 */}

                    </div>
                </div>
            </div>
        </div>
    );
}