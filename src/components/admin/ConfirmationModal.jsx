import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Loader2 } from 'lucide-react';

const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Konfirmasi Penghapusan", 
  message = "Apakah Anda yakin ingin menghapus data ini?\nData yang telah dihapus tidak dapat dikembalikan.",
  confirmText = "Hapus",
  cancelText = "Batal",
  isLoading = false 
}) => {
  const cancelBtnRef = useRef(null);

  // Focus on cancel button when modal opens
  useEffect(() => {
    if (isOpen && cancelBtnRef.current) {
      cancelBtnRef.current.focus();
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && !isLoading) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isLoading, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            onClick={() => !isLoading && onClose()}
          />
          
          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden border border-gray-100"
            role="dialog"
            aria-modal="true"
          >
            <div className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <div className="flex-1 mt-1">
                  <h3 className="text-lg font-bold text-gray-900 leading-tight">
                    {title}
                  </h3>
                  <div className="mt-2 text-sm text-gray-500 whitespace-pre-line">
                    {message}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 px-6 py-4 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3">
              <button
                type="button"
                ref={cancelBtnRef}
                onClick={onClose}
                disabled={isLoading}
                className="mt-3 sm:mt-0 w-full sm:w-auto inline-flex justify-center items-center px-4 py-2.5 bg-white text-gray-700 text-sm font-medium border border-gray-300 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {cancelText}
              </button>
              <button
                type="button"
                onClick={onConfirm}
                disabled={isLoading}
                className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2.5 bg-red-600 text-white text-sm font-medium rounded-xl hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                    Memproses...
                  </>
                ) : (
                  confirmText
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationModal;
