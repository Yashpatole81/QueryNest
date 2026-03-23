import React, { useRef, useState } from 'react';
import { UploadCloud, File, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { uploadDocument } from '../services/api';
import clsx from 'clsx';

const FileUpload = () => {
  const fileInputRef = useRef(null);
  const [status, setStatus] = useState('idle'); // idle, uploading, success, error
  const [message, setMessage] = useState('');

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setStatus('uploading');
    setMessage(`Uploading ${file.name}...`);

    try {
      await uploadDocument(file);
      setStatus('success');
      setMessage('Document uploaded');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error(error);
      setStatus('error');
      setMessage('Upload failed');
      setTimeout(() => setStatus('idle'), 4000);
    }

    // reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="relative">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf,.txt,.md"
      />

      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={status === 'uploading'}
        className={clsx(
          "flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 shadow-sm border",
          status === 'idle' && "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600",
          status === 'uploading' && "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed",
          status === 'success' && "bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400",
          status === 'error' && "bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400"
        )}
      >
        {status === 'idle' && <UploadCloud size={18} />}
        {status === 'uploading' && <Loader2 size={18} className="animate-spin" />}
        {status === 'success' && <CheckCircle2 size={18} />}
        {status === 'error' && <AlertCircle size={18} />}

        <span className="hidden sm:inline">
          {status === 'idle' ? 'Upload Doc' : message}
        </span>
      </button>
    </div>
  );
};

export default FileUpload;
