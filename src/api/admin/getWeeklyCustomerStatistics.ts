import axios from "axios";
import { IWeeklyCustomerStatistics } from "../../domain/admin/type/Statistics";

const getWeeklyCustomerStatistics = async ({
  adminId,
}: {
  adminId: string;
}): Promise<IWeeklyCustomerStatistics> => {
  const result = await axios.get(
    `/admin/weekly/customer/statistics/${adminId}`
  );

  return result.data.resultValue;
};

export default getWeeklyCustomerStatistics;
