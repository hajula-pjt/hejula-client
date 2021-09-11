import { ImCalendar } from "react-icons/im";
import { VscKey } from "react-icons/vsc";

interface IGetCheckInOutInfo {
  checkinTime: string;
  checkoutTime: string;
  selfCheckinWay: string;
}

export const getCheckInOutInfo = ({
  checkinTime,
  checkoutTime,
  selfCheckinWay,
}: IGetCheckInOutInfo) => [
  {
    title: "체크인",
    text: checkinTime,
    Icon: ImCalendar,
  },
  {
    title: "체크아웃",
    text: checkoutTime,
    Icon: ImCalendar,
  },
  {
    title: "체크인 방법",
    text: selfCheckinWay,
    Icon: VscKey,
  },
];
