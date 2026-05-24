const colors = [
  { name: "Blush Pink", hex: "#F7C8D3" },
  { name: "Rose Petal", hex: "#E89EB1" },
  { name: "Cream", hex: "#F8F4F0" },
  { name: "Mint", hex: "#D8ECDF" },
  { name: "Powder Blue", hex: "#BCDCEF" },
  { name: "Sky Blue", hex: "#7FB6D8" },
];

const ColorPalette = () => {
  return (
    <div className="flex gap-2">
      {colors.map((color) => (
        <div
          key={color.hex}
          title={color.name}
          className="w-10 h-10 rounded-full border border-white/30 shadow-md"
          style={{ backgroundColor: color.hex }}
        />
      ))}
    </div>
  );
};

export default ColorPalette;
