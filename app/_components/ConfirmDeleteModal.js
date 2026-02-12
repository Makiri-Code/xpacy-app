
export default function ConfirmDeleteModal({ title, onConfirm, onClose }) {
  return (
    <div className="flex flex-col">
      <p className="px-6 pt-6 font-mono text-error font-bold">
        {title}
      </p>

      <div className="flex items-center justify-between p-6">
        <button
          onClick={() => {}}
          className="px-4 py-2 bg-red-100 text-primary rounded-lg font-medium"
        >
          Yes, delete
        </button>

        <button
          onClick={onClose}
          className="px-4 py-2 bg-primary text-white rounded-lg font-medium"
        >
          No, undo
        </button>
      </div>
    </div>
  )
}