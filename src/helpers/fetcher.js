export const fetcher = async (url) => {
  const res = await fetch(url);
  if (res.ok) {
    return await res.json();
  } else {
    console.error("cannot read data");
  }
};
