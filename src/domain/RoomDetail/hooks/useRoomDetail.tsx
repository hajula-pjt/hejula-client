import { useEffect, useState } from "react";

import * as api from "../../../api/roomDetail/getRoomDetail";

import { IRoomDetail } from "../type";

const useRoomDetail = ({ id }: { id: string }): { detail: IRoomDetail } => {
  const [detail, setDetail] = useState<IRoomDetail>(null);

  const getRoomDetail = async ({ id }: { id: string }) => {
    const room = await api.getRoomDetail({ id });

    setDetail(room?.accommodation);
  };

  useEffect(() => {
    getRoomDetail({ id });
  }, [id]);

  return { detail };
};

export default useRoomDetail;
