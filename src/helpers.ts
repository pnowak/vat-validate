export const fetchJSON = async (input: string): Promise<Record<string, unknown>> => {
  const res = await fetch(input);
  const data = await res.json();

  return data;
};