import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import {
  Trash2,
  Copy,
  GripVertical,
  Type,
  Mail,
  List,
  CheckSquare,
  Settings,
  AlertCircle
} from 'lucide-react';

const fieldIcons = {
  text: Type,
  email: Mail,
  select: List,
  checkbox: CheckSquare,
};

const FieldPreview = ({ field, index, isSelected, onRemove, onDuplicate, darkMode }) => {
  const Icon = fieldIcons[field.type] || Settings;

  return (
    <Draggable draggableId={field.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`enhanced-card p-4 transition-all duration-200 group ${
            isSelected 
              ? 'ring-2 ring-lime-500 bg-lime-50/50 dark:bg-lime-900/20 shadow-lime-glow' 
              : 'hover:shadow-md'
          } ${snapshot.isDragging ? 'shadow-lg scale-[1.02]' : ''}`}
        >
          <div className="flex items-start space-x-3">
            {/* Drag Handle */}
            <div
              {...provided.dragHandleProps}
              className="flex-shrink-0 cursor-grab active:cursor-grabbing mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <div className="w-9 h-9 rounded-xl bg-lime-100 dark:bg-dark-400 flex items-center justify-center">
                <GripVertical className="w-5 h-5 text-lime-600 dark:text-lime-400" />
              </div>
            </div>

            {/* Field Icon */}
            <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${
              field.type === 'checkbox' 
                ? 'bg-gradient-to-br from-green-400 to-green-500' 
                : 'bg-gradient-to-br from-lime-400 to-lime-500'
            }`}>
              <Icon className="w-6 h-6 text-white" />
            </div>

            {/* Field Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="font-bold text-secondary-900 dark:text-white truncate">
                  {field.label}
                </h3>
                {field.required && (
                  <span className="text-red-500 text-sm font-bold">*</span>
                )}
                {isSelected && (
                  <span className="badge-success text-xs">Editing</span>
                )}
              </div>
              
              <div className="flex items-center space-x-2 mb-3">
                <span className="badge-secondary capitalize text-xs">{field.type}</span>
                <span className="text-xs font-mono text-secondary-400 dark:text-secondary-500 bg-lime-100 dark:bg-dark-400 px-2 py-0.5 rounded-lg">
                  {field.name}
                </span>
              </div>

              {/* Preview of the field */}
              <div className="mt-3">
                {field.type === 'text' || field.type === 'email' ? (
                  <div className="w-full px-4 py-3 border-2 border-lime-200 dark:border-dark-300 rounded-xl bg-lime-50 dark:bg-dark-400 text-secondary-400 dark:text-secondary-500 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="flex-1">{field.placeholder || `Enter ${field.label.toLowerCase()}...`}</span>
                    </div>
                  </div>
                ) : field.type === 'select' ? (
                  <div className="custom-select bg-lime-50 dark:bg-dark-400 text-secondary-400 dark:text-secondary-500 cursor-not-allowed border-lime-200 dark:border-dark-300">
                    {field.placeholder || 'Select an option...'}
                  </div>
                ) : field.type === 'checkbox' ? (
                  <div className="flex items-center space-x-3 p-3 bg-lime-50 dark:bg-dark-400 rounded-xl">
                    <div className="w-6 h-6 border-2 border-lime-300 dark:border-dark-300 rounded-lg bg-white dark:bg-dark-500" />
                    <span className="text-sm text-secondary-600 dark:text-secondary-300 font-medium">{field.helpText || 'Checkbox option'}</span>
                  </div>
                ) : null}
              </div>

              {/* Help Text */}
              {field.helpText && (
                <p className="mt-3 text-xs text-secondary-500 dark:text-secondary-400 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1 flex-shrink-0 text-lime-500" />
                  <span className="line-clamp-1">{field.helpText}</span>
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex-shrink-0 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDuplicate();
                }}
                className="btn-icon"
                title="Duplicate field"
              >
                <Copy className="w-4 h-4 text-secondary-500 dark:text-secondary-400" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove();
                }}
                className="btn-icon text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                title="Remove field"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default FieldPreview;

