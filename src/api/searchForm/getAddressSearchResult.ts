import axios from "axios";

export interface guData {
  guSeq: number;
  name: string;
}

const getAddressSearchResult = async ({ name }: { name: string }) => {
  try {
    const {
      data: { resultValue },
    } = await axios.get(`/accommodation/gu`, {
      params: {
        name,
      },
    });

    return resultValue;
  } catch (e) {
    console.error(e);
  }
};

export default getAddressSearchResult;
