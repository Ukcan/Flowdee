import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useEditableContent } from '../../contexts/EditableContentContext';
import { Pencil, ArrowCounterClockwise as RotateCcw } from '@phosphor-icons/react';

interface EditableTextProps {
  /** Unique key for localStorage persistence */
  contentKey: string;
  /** Default/fallback text value */
  defaultValue: string;
  /** HTML tag or component to render in view mode */
  as?: keyof JSX.IntrinsicElements;
  /** Additional className for the rendered element */
  className?: string;
  /** Use textarea instead of input (for multiline) */
  multiline?: boolean;
}

export function EditableText({
  contentKey,
  defaultValue,
  as: Tag = 'span',
  className = '',
  multiline = false,
}: EditableTextProps) {
  const { isEditMode, getContent, setContent, resetContent, hasOverride } =
    useEditableContent();

  const currentValue = getContent(contentKey, defaultValue);
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(currentValue);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  // Sync draft when value changes externally
  useEffect(() => {
    if (!isEditing) {
      setDraft(currentValue);
    }
  }, [currentValue, isEditing]);

  // Focus input when entering edit
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = useCallback(() => {
    const trimmed = draft.trim();
    if (trimmed && trimmed !== defaultValue) {
      setContent(contentKey, trimmed);
    } else if (trimmed === defaultValue) {
      // If reverted to default, remove override
      resetContent(contentKey);
    }
    setIsEditing(false);
  }, [draft, defaultValue, contentKey, setContent, resetContent]);

  const handleCancel = useCallback(() => {
    setDraft(currentValue);
    setIsEditing(false);
  }, [currentValue]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !multiline) {
        e.preventDefault();
        handleSave();
      }
      if (e.key === 'Enter' && multiline && e.metaKey) {
        e.preventDefault();
        handleSave();
      }
      if (e.key === 'Escape') {
        handleCancel();
      }
    },
    [handleSave, handleCancel, multiline]
  );

  // View mode (no edit mode active)
  if (!isEditMode) {
    return <Tag className={className}>{currentValue}</Tag>;
  }

  // Edit mode active but not currently editing this field
  if (!isEditing) {
    return (
      <Tag
        className={`${className} relative group/editable cursor-pointer`}
        role="button"
        tabIndex={0}
        aria-label={`Edit: ${currentValue.slice(0, 50)}`}
        onClick={() => setIsEditing(true)}
        onKeyDown={(e: React.KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsEditing(true);
          }
        }}
      >
        {currentValue}
        {/* Edit indicator overlay */}
        <span
          className="
            absolute -top-1 -right-1 z-10
            opacity-0 group-hover/editable:opacity-100
            transition-opacity duration-150
            flex items-center gap-1
          "
          aria-hidden="true"
        >
          <span className="p-1 bg-accent-primary text-white rounded-md shadow-md">
            <Pencil size={10} />
          </span>
          {hasOverride(contentKey) && (
            <button
              className="p-1 bg-red-500/80 text-white rounded-md shadow-md hover:bg-red-600 transition-colors min-h-[22px] min-w-[22px] flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                resetContent(contentKey);
              }}
              aria-label="Reset to default"
              title="Reset to default"
            >
              <RotateCcw size={10} />
            </button>
          )}
        </span>
        {/* Dashed border hint */}
        <span
          className="
            absolute inset-0 -m-1
            border border-dashed border-accent-primary/40
            rounded-md pointer-events-none
            opacity-0 group-hover/editable:opacity-100
            transition-opacity duration-150
          "
          aria-hidden="true"
        />
      </Tag>
    );
  }

  // Currently editing this field
  const sharedInputClasses = `
    w-full bg-surface-1 text-text-primary
    border border-accent-primary/60 rounded-lg
    px-3 py-2 font-body text-[14px]
    outline-none ring-2 ring-accent-primary/30
    transition-all duration-150
  `;

  return (
    <div className="relative inline-block w-full">
      {multiline ? (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className={`${sharedInputClasses} min-h-[80px] resize-y`}
          rows={3}
        />
      ) : (
        <input
          ref={inputRef as React.RefObject<HTMLInputElement>}
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className={sharedInputClasses}
        />
      )}
      <span className="font-body text-[10px] text-text-muted mt-1 block">
        {multiline ? 'Cmd+Enter pour sauver, Esc pour annuler' : 'Enter pour sauver, Esc pour annuler'}
      </span>
    </div>
  );
}
