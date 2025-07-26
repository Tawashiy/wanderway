type ErrorDialogProps = {
  onClose: () => void;
};

export const ErrorDialog = ({ onClose }: ErrorDialogProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl border border-secondary">
        <h2 className="text-xl font-semibold text-secondary mb-3">Oops!</h2>
        <p className="text-gray-700 leading-relaxed">
          Something went wrong. Try reloading the page. After reloading, please
          allow location access.
        </p>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#3374e0] text-white font-medium hover:bg-[#dd822f]/90 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorDialog;
