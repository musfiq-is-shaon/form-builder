import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Trash2,
  GripVertical,
  ChevronDown,
  ChevronUp,
  Plus,
  X,
  AlertCircle,
  Settings,
  Info,
  CheckCircle
} from 'lucide-react';

const FieldEditor = ({ field, onUpdate, onRemove, darkMode }) => {
  const [activeTab, setActiveTab] = useState('basic'); // 'basic' | 'validation' | 'options'

  if (!field) return null;

  const handleLabelChange = (e) => {
    const label = e.target.value;
    const name = label.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
    onUpdate({ label, name });
  };

  const handleOptionChange = (optionId, key, value) => {
    const newOptions = field.options.map(opt =>
      opt.id === optionId ? { ...opt, [key]: value } : opt
    );
    onUpdate({ options: newOptions });
  };

  const addOption = () => {
    const newOption = {
      id: uuidv4(),
      value: `option_${Date.now()}`,
      label: 'New Option',
    };
    onUpdate({ options: [...field.options, newOption] });
  };

  const removeOption = (optionId) => {
    const newOptions = field.options.filter(opt => opt.id !== optionId);
    onUpdate({ options: newOptions });
  };

  const moveOption = (index, direction) => {
    const newOptions = [...field.options];
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= newOptions.length) return;
    [newOptions[index], newOptions[newIndex]] = [newOptions[newIndex], newOptions[index]];
    onUpdate({ options: newOptions });
  };

  return (
    <div className="space-y-4">
      {/* Header with Field Type */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-lime-200 dark:border-dark-300">
        <div className="flex items-center space-x-3">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
            field.type === 'checkbox' 
              ? 'bg-gradient-to-br from-green-400 to-green-500' 
              : 'bg-gradient-to-br from-lime-400 to-lime-500'
          } shadow-lg shadow-lime-500/20`}>
            {field.type === 'text' && <Settings className="w-6 h-6 text-white" />}
            {field.type === 'email' && <Settings className="w-6 h-6 text-white" />}
            {field.type === 'select' && <Settings className="w-6 h-6 text-white" />}
            {field.type === 'checkbox' && <Settings className="w-6 h-6 text-white" />}
          </div>
          <div>
            <span className="badge-primary capitalize text-sm font-semibold">{field.type}</span>
            <p className="text-xs text-secondary-500 dark:text-secondary-400 mt-1 font-mono">{field.name}</p>
          </div>
        </div>
        <button
          onClick={onRemove}
          className="btn-icon text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
          title="Remove field"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-lime-100 dark:bg-dark-400 p-1.5 rounded-xl">
        {['basic', 'validation', 'options'].filter(t => t !== 'options' || field.type === 'select').map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2.5 px-3 text-sm font-semibold rounded-lg transition-all duration-200 capitalize ${
              activeTab === tab
                ? 'bg-white dark:bg-dark-300 text-lime-700 dark:text-lime-400 shadow-sm'
                : 'text-secondary-600 dark:text-secondary-400 hover:text-lime-700 dark:hover:text-lime-400'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-4">
        {activeTab === 'basic' && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <label className="label flex items-center space-x-1">
                <span>Label</span>
                <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                type="text"
                value={field.label}
                onChange={handleLabelChange}
                className="input"
                placeholder="Enter field label"
              />
            </div>

            <div>
              <label className="label">Field Name</label>
              <input
                type="text"
                value={field.name}
                onChange={(e) => onUpdate({ name: e.target.value })}
                className="input font-mono"
                placeholder="field_name"
              />
              <p className="text-xs text-secondary-500 dark:text-secondary-400 mt-1 flex items-center">
                <Info className="w-3 h-3 mr-1" />
                Used for form submission data
              </p>
            </div>

            {(field.type === 'text' || field.type === 'email' || field.type === 'select') && (
              <div>
                <label className="label">Placeholder</label>
                <input
                  type="text"
                  value={field.placeholder || ''}
                  onChange={(e) => onUpdate({ placeholder: e.target.value })}
                  className="input"
                  placeholder={field.type === 'select' ? 'Select an option...' : 'Enter text...'}
                />
              </div>
            )}

            <div>
              <label className="label">Help Text</label>
              <input
                type="text"
                value={field.helpText || ''}
                onChange={(e) => onUpdate({ helpText: e.target.value })}
                className="input"
                placeholder="Additional information for users"
              />
              <p className="text-xs text-secondary-500 dark:text-secondary-400 mt-1">
                Show below the field to help users
              </p>
            </div>

            <div className="flex items-center justify-between py-3 px-4 bg-lime-50 dark:bg-dark-400 rounded-xl">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold text-secondary-700 dark:text-secondary-200">Required</span>
                <span className="text-xs text-secondary-500 dark:text-secondary-400">Users must fill this</span>
              </div>
              <button
                onClick={() => onUpdate({ required: !field.required })}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-all duration-300 ${
                  field.required ? 'bg-lime-500' : 'bg-secondary-300 dark:bg-dark-200'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-md transition-all duration-300 ${
                    field.required ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
                {field.required && (
                  <CheckCircle className="absolute right-2 w-4 h-4 text-white" />
                )}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'validation' && (
          <div className="space-y-4 animate-fade-in">
            {field.type === 'text' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="label">Min Length</label>
                    <input
                      type="number"
                      value={field.validation?.minLength || ''}
                      onChange={(e) => onUpdate({
                        validation: { ...field.validation, minLength: parseInt(e.target.value) || undefined }
                      })}
                      className="input"
                      min="0"
                      placeholder="None"
                    />
                    <p className="text-xs text-secondary-500 dark:text-secondary-400">Minimum characters</p>
                  </div>
                  <div className="space-y-2">
                    <label className="label">Max Length</label>
                    <input
                      type="number"
                      value={field.validation?.maxLength || ''}
                      onChange={(e) => onUpdate({
                        validation: { ...field.validation, maxLength: parseInt(e.target.value) || undefined }
                      })}
                      className="input"
                      min="0"
                      placeholder="None"
                    />
                    <p className="text-xs text-secondary-500 dark:text-secondary-400">Maximum characters</p>
                  </div>
                </div>
              </>
            )}

            {field.type === 'email' && (
              <div className="p-4 bg-lime-50 dark:bg-lime-900/20 rounded-xl border-2 border-lime-200 dark:border-lime-800">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-lime-600 dark:text-lime-400" />
                  <span className="text-sm font-bold text-lime-700 dark:text-lime-300">Email format validation enabled</span>
                </div>
                <p className="text-xs text-lime-600 dark:text-lime-400 mt-1 ml-7">
                  Email addresses are automatically validated
                </p>
              </div>
            )}

            {field.type === 'checkbox' && (
              <div className="p-4 bg-lime-50 dark:bg-lime-900/20 rounded-xl border-2 border-lime-200 dark:border-lime-800">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-lime-600 dark:text-lime-400" />
                  <span className="text-sm font-bold text-lime-700 dark:text-lime-300">Checkbox validation available</span>
                </div>
                <p className="text-xs text-lime-600 dark:text-lime-400 mt-1 ml-7">
                  Require the checkbox to be checked
                </p>
              </div>
            )}

            <div className="flex items-start space-x-2 p-4 bg-lime-50 dark:bg-dark-400 rounded-xl">
              <AlertCircle className="w-5 h-5 text-lime-600 dark:text-lime-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-secondary-700 dark:text-secondary-200">Validation in Preview</p>
                <p className="text-xs text-secondary-500 dark:text-secondary-400 mt-1">
                  Validation rules are applied in preview mode to test user experience.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'options' && field.type === 'select' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <label className="label mb-0">Dropdown Options</label>
              <button
                onClick={addOption}
                className="btn-primary text-sm"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Option
              </button>
            </div>
            
            {field.options.length === 0 ? (
              <div className="text-center py-8 bg-lime-50 dark:bg-dark-400 rounded-xl">
                <Settings className="w-12 h-12 text-lime-300 dark:text-lime-600 mx-auto mb-2" />
                <p className="text-sm text-secondary-500 dark:text-secondary-400">
                  No options yet. Click "Add Option" to create one.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {field.options.map((option, index) => (
                  <div key={option.id} className="flex items-center space-x-2 p-3 bg-lime-50 dark:bg-dark-400 rounded-xl group">
                    <div className="cursor-grab active:cursor-grabbing">
                      <GripVertical className="w-5 h-5 text-lime-500" />
                    </div>
                    <input
                      type="text"
                      value={option.label}
                      onChange={(e) => handleOptionChange(option.id, 'label', e.target.value)}
                      className="input flex-1"
                      placeholder="Option Label"
                    />
                    <input
                      type="text"
                      value={option.value}
                      onChange={(e) => handleOptionChange(option.id, 'value', e.target.value)}
                      className="input w-24 font-mono"
                      placeholder="Value"
                    />
                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => moveOption(index, -1)}
                        disabled={index === 0}
                        className="btn-icon"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => moveOption(index, 1)}
                        disabled={index === field.options.length - 1}
                        className="btn-icon"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeOption(option.id)}
                        className="btn-icon text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FieldEditor;

