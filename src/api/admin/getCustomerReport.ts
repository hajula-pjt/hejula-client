import axios from "axios";

import { ICustomerInfomation } from "../../domain/admin/type/customer";

const getCustomerReport = async ({
  adminId,
  rows = 10,
  pageNo = 0,
}: {
  adminId: string;
  rows?: number;
  pageNo?: number;
}): Promise<ICustomerInfomation[]> => {
  const result = await axios.get(
    `/admin/accommodation/report/${adminId}/${rows}/${pageNo}`
  );

  return result.data.resultValue.content;
};

export default getCustomerReport;
