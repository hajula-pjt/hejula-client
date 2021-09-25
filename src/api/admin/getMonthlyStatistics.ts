import axios from "axios";
import { IMonthlyStatistics } from "../../domain/admin/type/Statistics";

export const getMonthlyStatistics = async ({
  adminId,
}: {
  adminId: string;
}): Promise<IMonthlyStatistics> => {
  const result = await axios.get(`/admin/monthly/statistics/${adminId}`);

  return result.data.resultValue;
};
