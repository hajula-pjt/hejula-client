import { useEffect, useState } from "react";

import * as api from "../../../api/roomDetail/getRoomDetail";

const useRoomDetail = ({ id }: { id: string }) => {
  const [detail, setDetail] = useState(null);

  const getRoomDetail = async ({ id }: { id: string }) => {
    const room = await api.getRoomDetail({ id });

    setDetail(room?.accommodation);
  };

  useEffect(() => {
    getRoomDetail({ id });
  }, [id]);

  return { detail, getRoomDetail };
};

export default useRoomDetail;
