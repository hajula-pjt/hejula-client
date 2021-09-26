import axios from "axios";
import { IMonthlyStatistics } from "../../domain/admin/type/Statistics";


const getMonthlyStatistics = async ({
  adminId,
}: {
  adminId: string;
}): Promise<IMonthlyStatistics> => {
  const result = await axios.get(`/admin/monthly/statistics/${adminId}`);

  return result.data.resultValue;
}

export default getMonthlyStatistics;
