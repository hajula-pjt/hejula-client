export const setLocalStorageItem = ({
  key,
  value,
}: {
  key: string;
  value: string;
}) => {
  localStorage.setItem(key, value);
};

export const getLocalStorageItem = ({ key }: { key: string }) => {
  const string = localStorage.getItem(key);

  if (!string) {
    return;
  }

  return JSON.parse(string);
};

export const removeLocalStorageItem = ({ key }: { key: string }) => {
  localStorage.removeItem(key);
};
