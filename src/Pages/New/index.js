import { Button, DatePicker, Input, NavBar } from 'antd-mobile';
import Icon from '@/components/Icon';
import './index.scss';
import { billListData } from '../Month/components/DayBill/billTypeTranform';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { addBillList } from '@/store/modules/billStore';
import { useDispatch } from 'react-redux';

export default function New(){
    const dispatch = useDispatch();
    const [bill, setBill] = useState({
        type: 'pay',
        money: 0,
        date: new Date(),
        useFor: ''
    });

    function saveBill(){
        const data = {
            ...bill,
            money: Number(bill.type === 'pay' ? -bill.money : bill.money)
        };
        dispatch(addBillList(data));
        alert('已 保 存')
    }

    const navigate = useNavigate();
    return (
        <div className="keepAccounts">
            <NavBar className="nav" onBack={() => navigate(-1)}>
                记一笔
            </NavBar>

            <div className="header">
                <div className="kaType">
                <Button
                    shape="rounded"
                    className={ bill.type === 'pay' ? 'selected' : '' }
                    onClick={() => { setBill({ ...bill, type: 'pay'}); } }
                >
                    支出
                </Button>
                <Button
                    shape="rounded"
                    className={ bill.type === 'income' ? 'selected' : '' }
                    onClick={() => { setBill({ ...bill, type: 'income'}); } }
                >
                    收入
                </Button>
                </div>

                <div className="kaFormWrapper">
                <div className="kaForm">
                    <div className="date">
                    <Icon type="calendar" className="icon" />
                    <span className="text">{'今天'}</span>
                    <DatePicker
                        className="kaDate"
                        title="记账日期"
                        max={new Date()}
                    />
                    </div>
                    <div className="kaInput">
                    <Input
                        className="input"
                        placeholder="0.00"
                        type="number"
                        value={bill.money}
                        onChange={ value => { setBill({ ...bill, money: value }); } }
                    />
                    <span className="iconYuan">¥</span>
                    </div>
                </div>
                </div>
            </div>

            <div className="kaTypeList">
                {billListData[bill.type].map(item => {
                return (
                    <div className="kaType" key={item.type}>
                        <div className="title">{item.name}</div>
                        <div className="list">
                            {item.list.map(item => {
                            return (
                                <div
                                className={ 'item '+ (bill.useFor === item.type ? 'selected' : '') }
                                key={item.type}
                                onClick={ () => { setBill({ ...bill, useFor: item.type})}}
                                >
                                    <div className="icon">
                                        <Icon type={item.type} />
                                    </div>
                                    <div className="text">{item.name}</div>
                                </div>
                            )
                            })}
                        </div>
                    </div>
                )
                })}
            </div>

            <div className="btns">
                <Button 
                    className="btn save"
                    onClick={saveBill}
                >
                保 存
                </Button>
            </div>
        </div>
    );
}