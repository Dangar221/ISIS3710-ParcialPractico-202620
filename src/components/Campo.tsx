// label + input (o textarea) + mensaje de error, conectados para lectores de pantalla
type Props = {
  name: string;
  label: string;
  value: string;
  error?: string;
  type?: string;
  textarea?: boolean;
  placeholder?: string;
  opcional?: boolean;
  ayuda?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

// label + input (o textarea / select) + mensaje de error
export default function Campo({
  name,
  label,
  value,
  error,
  type = "text",
  textarea = false,
  placeholder,
  opcional = false,
  ayuda,
  onChange,
  onBlur,
}: Props) {
  const errorId = `${name}-error`;
  const ayudaId = `${name}-ayuda`;
  const describedBy = [ayuda ? ayudaId : "", error ? errorId : ""].filter(Boolean).join(" ") || undefined;

  const clases = `w-full bg-slate-50 border rounded-xl px-4 py-3 mt-1 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
    error ? "border-red-600" : "border-slate-200"
  }`;

  const props = {
    id: name,
    name,
    value,
    placeholder,
    onChange,
    onBlur,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
    "aria-required": opcional ? undefined : true,
    className: clases,
  };

  return (
    <div className="mt-5">
      <label htmlFor={name} className="block text-sm font-semibold text-slate-700">
        {label}
        {opcional && <span className="font-normal text-slate-600"> (opcional)</span>}
      </label>
      {textarea ? (
        <textarea {...props} rows={5} />
      ) : (
        <input {...props} type={type} />
      )}
      {ayuda && (
        <p id={ayudaId} className="text-xs text-slate-600 mt-1">
          {ayuda}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="text-sm text-red-700 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
