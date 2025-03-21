import Icon from '@/components/Icon';
import { billTypeToName } from './billTypeTranform';
import './index.scss';
import { useMemo, useState } from 'react';

function BillList({ billList }){
  return (
    <div className="billList">
        {billList.map(item => {
          return (
            <div className="bill" key={item.id}>
              <Icon type={ item.useFor }/>
              <div className="detail">
                <div className="billType">{billTypeToName[item.useFor]}</div>
              </div>
              <div className={'money ' + item.type}>
                {item.money.toFixed(2)}
              </div>
            </div>
          )
        })}
    </div>  
  );
}

export default function DailyBill({ date, billList }){
  const [billListVisible, setBillListVisible] = useState(false);

  const dayResult = useMemo(() => {
          const pay = billList.filter(item => item.type === 'pay').reduce((sum, item) => sum += item.money, 0);
          const income = billList.filter(item => item.type === 'income').reduce((sum, item) => sum += item.money, 0);
          return {
              pay,
              income,
              total: pay + income
          }
  }, [billList]);

  return (
    <div className="dailyBill">
      <div className="header">
        <div className="dateIcon">
          <span className="date">{date}</span>
          <span 
            className={ 'arrow ' + (billListVisible ? '' : 'expand') }
            onClick={() => { setBillListVisible(!billListVisible);}}
            ></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{dayResult.pay}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{dayResult.income}</span>
          </div>
          <div className="balance">
            <span className="money">{dayResult.total}</span>
            <span className="type">结余</span>
          </div>
        </div>
      </div>
      {billListVisible && <BillList billList={billList} />}
    </div>
  )
}
