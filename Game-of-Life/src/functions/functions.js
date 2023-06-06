const createEmptyTileset = (rows,cols) => {
    const newTileset = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => false)
    );
    return newTileset;
  };
export default createEmptyTileset;   