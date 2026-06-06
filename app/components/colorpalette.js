const colors = [
  { name: "Pink", hex: "#E89EB1" },
  { name: "Blue", hex: "#7FB6D8" },
];

const ColorPalette = () => {
  return (
    <div className="flex gap-3 justify-center">
      {colors.map((color) => (
        <div
          key={color.hex}
          title={color.name}
          className="w-11 h-11 md:w-12 md:h-12 rounded-full border-2 border-white/40 shadow-md"
          style={{ backgroundColor: color.hex }}
        />
      ))}
    </div>
  );
};

export default ColorPalette;
