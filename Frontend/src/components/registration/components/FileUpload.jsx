// components/FileUpload.jsx
import React, { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import styles from '../Registration.module.css';

export const FileUpload = () => {
  const { register, setValue, watch, formState: { errors } } = useFormContext();
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef(null);
  
  const files = watch('businessLicense');
  const error = errors.businessLicense?.message;
  const currentFile = files && files[0];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setIsDragActive(true);
    else if (e.type === "dragleave") setIsDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setValue('businessLicense', e.dataTransfer.files, { shouldValidate: true });
    }
  };

  const removeFile = () => {
    setValue('businessLicense', null, { shouldValidate: true });
  };

  return (
    <div className={styles.fieldContainer}>
      <span className={styles.fieldLabel}>Business License Document</span>
      <div 
        className={`${styles.uploadZone} ${isDragActive ? styles.uploadZoneActive : ''} ${currentFile ? styles.uploadZoneSuccess : ''}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          ref={fileInputRef}
          className={styles.hiddenInput} 
          accept=".pdf,.png,.jpeg,.jpg"
          onChange={(e) => setValue('businessLicense', e.target.files, { shouldValidate: true })}
        />
        
        {!currentFile ? (
          <div className={styles.uploadPrompt}>
            <span className={styles.uploadIcon}>✦</span>
            <p>Drag & drop your structural authorization file, or <span className={styles.highlightText}>browse</span></p>
            <small>Supports PDF, PNG, JPEG up to 5MB</small>
          </div>
        ) : (
          <div className={styles.uploadSuccessState} onClick={(e) => e.stopPropagation()}>
            <span className={styles.successBadge}>✓</span>
            <div className={styles.fileMeta}>
              <p className={styles.fileName}>{currentFile.name}</p>
              <p className={styles.fileSize}>{(currentFile.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
            <button type="button" className={styles.removeFileBtn} onClick={removeFile}>Remove</button>
          </div>
        )}
      </div>
      {error && <p className={styles.errorMessage} role="alert">{error}</p>}
    </div>
  );
};