const VariantRow = ({ index, variant, onChange, onRemove }) => {
  return (
    <div className="grid grid-cols-5 gap-2 mb-2">
      <input
        placeholder="MOQ"
        className="border p-2"
        value={variant.moq}
        onChange={(e) => onChange(index, "moq", e.target.value)}
      />
      <input
        placeholder="Type"
        className="border p-2"
        value={variant.type}
        onChange={(e) => onChange(index, "type", e.target.value)}
      />
      <input
        placeholder="Price"
        className="border p-2"
        value={variant.price}
        onChange={(e) => onChange(index, "price", e.target.value)}
      />
      <input
        placeholder="Engraving"
        className="border p-2"
        value={variant.engraving}
        onChange={(e) => onChange(index, "engraving", e.target.value)}
      />
      <button
        onClick={() => onRemove(index)}
        className="bg-red-500 text-white rounded"
      >
        ❌
      </button>
    </div>
  );
};

export default VariantRow;
