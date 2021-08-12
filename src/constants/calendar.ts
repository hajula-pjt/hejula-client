import dayjs from "dayjs";

const CURRENT_YEAR = dayjs().year();
const FIRST_MONTH = 1;
const LAST_MONTH = 12;

const CURRENT_MONTH = dayjs().month() + 1;
const NEXT_MONTH = CURRENT_MONTH + 1;

export { CURRENT_YEAR, FIRST_MONTH, LAST_MONTH, CURRENT_MONTH, NEXT_MONTH };
