import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Upload, FileText, Image, X, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
}

export const FileDropCard: React.FC = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    processFiles(files);
  };

  const processFiles = (files: File[]) => {
    const newFiles: UploadedFile[] = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.type,
      size: file.size
    }));
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="w-4 h-4" />;
    return <FileText className="w-4 h-4" />;
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="group h-full"
    >
      <div className="h-full rounded-2xl shadow-md bg-white/60 dark:bg-neutral-900/70 backdrop-blur-sm p-6 transition-all duration-300 hover:shadow-xl border border-white/20 dark:border-neutral-700/50">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-[#3dd66d] to-[#5ae072] rounded-lg flex items-center justify-center">
            <Upload className="w-4 h-4 text-white" />
          </div>
          <h3 className="font-['Poppins'] text-lg font-semibold text-[#343030] dark:text-white">
            File Drop Zone
          </h3>
        </div>

        {/* Drop Zone */}
        <div
          className={`relative border-2 border-dashed rounded-xl p-6 transition-all duration-300 cursor-pointer ${
            isDragOver
              ? 'border-[#3dd66d] bg-[#3dd66d]/5'
              : 'border-gray-300 dark:border-neutral-600 hover:border-[#3dd66d] hover:bg-[#3dd66d]/5'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
          aria-label="Click to upload files or drag and drop"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileSelect}
            accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.txt"
          />
          
          <div className="text-center">
            <motion.div
              animate={{ 
                scale: isDragOver ? 1.1 : 1,
                rotate: isDragOver ? 5 : 0 
              }}
              className="inline-flex items-center justify-center w-12 h-12 bg-[#3dd66d]/10 rounded-full mb-3"
            >
              <Upload className="w-6 h-6 text-[#3dd66d]" />
            </motion.div>
            
            <p className="font-['Satoshi'] text-sm text-[#343030] dark:text-white mb-1">
              {isDragOver ? 'Drop files here' : 'Drag files here or click to browse'}
            </p>
            <p className="font-['Satoshi'] text-xs text-gray-500 dark:text-gray-400">
              Supports images, PDFs, and documents
            </p>
          </div>
        </div>

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div className="mt-4 space-y-2">
            <h4 className="font-['Satoshi'] text-sm font-medium text-gray-600 dark:text-gray-400">
              Uploaded Files ({uploadedFiles.length})
            </h4>
            
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {uploadedFiles.map((file, index) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-2 bg-gray-50 dark:bg-neutral-800/50 rounded-lg group/file"
                >
                  <div className="flex items-center space-x-2 flex-1 min-w-0">
                    <div className="text-[#3dd66d]">
                      {getFileIcon(file.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-['Satoshi'] text-sm text-gray-700 dark:text-gray-300 truncate">
                        {file.name}
                      </p>
                      <p className="font-['Satoshi'] text-xs text-gray-500">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-[#3dd66d]" />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(file.id);
                      }}
                      className="opacity-0 group-hover/file:opacity-100 transition-opacity p-1 hover:bg-gray-200 dark:hover:bg-neutral-700 rounded"
                      aria-label={`Remove ${file.name}`}
                    >
                      <X className="w-3 h-3 text-gray-500" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};