import { useCallback, useEffect, useState } from "react";

import getAddressSearchResult, {
  guData,
} from "../../../../api/searchForm/getAddressSearchResult";

const useSearchAddress = ({ gu }: { gu: string | null }) => {
  const [addressSearchResult, setAddressSearchResult] = useState<guData[]>([]);

  const searchAddress = useCallback(async () => {
    const result = await getAddressSearchResult({ name: gu || "" });

    setAddressSearchResult(result || []);
  }, [gu]);

  useEffect(() => {
    searchAddress();
  }, [searchAddress]);

  return { addressSearchResult };
};

export default useSearchAddress;
