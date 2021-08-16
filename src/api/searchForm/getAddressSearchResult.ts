import server from "../server";

export interface guData {
  guSeq: number;
  name: string;
}

const getAddressSearchResult = async ({ name }: { name: string }) => {
  try {
    const {
      data: { resultValue },
    } = await server.post(`/accommodation/gu`, {
      name,
    });

    return resultValue;
  } catch (e) {
    console.error(e);
  }
};

export default getAddressSearchResult;
