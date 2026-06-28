import { ImageUploadField, ImagesUploadField, ReportsField } from './FileUploadField';

// Renders one input based on the field's `type` from the content schema.
export default function FormField({ field, value, onChange }) {
  if (field.type === 'image')  return <ImageUploadField  field={field} value={value} onChange={onChange} />;
  if (field.type === 'images') return <ImagesUploadField field={field} value={value} onChange={onChange} />;
  if (field.type === 'files')  return <ReportsField      field={field} value={value} onChange={onChange} />;

  const v = value ?? '';

  return (
    <label className="admin-field">
      <span>{field.label}</span>
      {field.type === 'textarea' ? (
        <textarea rows={3} value={v} onChange={(e) => onChange(e.target.value)} />
      ) : field.type === 'date' ? (
        <input type="date" value={v} onChange={(e) => onChange(e.target.value)} />
      ) : field.type === 'number' ? (
        <input type="number" value={v} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input type="text" value={v} onChange={(e) => onChange(e.target.value)} />
      )}
    </label>
  );
}
