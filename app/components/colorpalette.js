const colors = [
    { name: "Blush Pink", hex: "#E8B7B7" },
    { name: "Dusty Rose", hex: "#C9A29C" },
    { name: "Champagne Rose", hex: "#E3C9C3" },
    
    { name: "Taupe Tapestry", hex: "#B49B87" },
    { name: "Nude Blush", hex: "#D9B9A3" },
    { name: "Gold Champagne", hex: "#E4C17C" },

  ];
  const ColorPalette = () => {
    return (
      <div className="flex">
        {colors.map((color) => (
          <div
            key={color.hex}
            className="w-10 h-10 rounded-full"
            style={{ backgroundColor: color.hex }}
          ></div>
        ))}
      </div>
    );
  };
  
  export default ColorPalette;
  