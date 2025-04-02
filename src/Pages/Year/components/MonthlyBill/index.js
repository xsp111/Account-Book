import dayjs from "dayjs";
import "./index.scss";

export default function MonthlyBill({ data }){
    return (
        <div className="monthlyBill">
            <div className="header">
                <div className="dateIcon">
                    <span className="date">{dayjs(data.month).format('M')}月</span>
                </div>
            <div className="oneLineOverview">
                <div className="pay">
                    <span className="type">支出</span>
                    <span className="money">{data.pay}</span>
                </div>
            <div className="income">
                <span className="type">收入</span>
                <span className="money">{data.income}</span>
            </div>
            <div className="balance">
                <span className="money">{data.total}</span>
                <span className="type">结余</span>
            </div>
            </div>
        </div>
        </div>
    );
}