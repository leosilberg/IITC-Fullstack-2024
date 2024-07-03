export default function Input({
  label,
  type,
  name,
  placeholder,
  onChange,
  defaultValue,
}) {
  return (
    <>
      <div className="flex flex-col gap-2 text-gray-400">
        <label className="text-sm font-medium text-[#111827]">{label}</label>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          defaultValue={defaultValue}
          onChange={onChange}
          className="w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-600 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
      </div>
    </>
  );
}
