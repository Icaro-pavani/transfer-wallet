import dayjs from "dayjs";
import valueToCurrency from "../../utils/valueToCurrency";

import "./style.css";

interface Props {
  date: string;
  username: string;
  value: number;
}

export default function IncomeTransaction({ date, username, value }: Props) {
  return (
    <li className="transaction">
      <p className="date">{dayjs(date.split("T")[0]).format("DD/MM")}</p>
      <p className="user">Crédito de: {username}</p>
      <p className="income-value">{valueToCurrency(value)}</p>
    </li>
  );
}
