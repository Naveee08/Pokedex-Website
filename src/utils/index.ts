export const getOficialArtwork = (id: number): string => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};

export const capitalize = (value: string): string => {
  const valueLower = value.toLocaleLowerCase();
  return valueLower.charAt(0).toUpperCase() + valueLower.slice(1);
};
