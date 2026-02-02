import React, { useState } from 'react';
import {
  CheckCircle,
  AlertCircle,
  Check,
  ChevronDown,
  Sparkles,
  Send
} from 'lucide-react';

const FormPreview = ({ title, description, fields, validateField, darkMode }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (fieldName, value) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    
    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  const handleBlur = (fieldName) => {
    setFocusedField(null);
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    
    const field = fields.find(f => f.name === fieldName);
    if (field) {
      const fieldErrors = validateField(field, formData[fieldName]);
      if (fieldErrors.length > 0) {
        setErrors(prev => ({ ...prev, [fieldName]: fieldErrors }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    const newTouched = {};
    
    // Validate all fields
    fields.forEach(field => {
      newTouched[field.name] = true;
      const fieldErrors = validateField(field, formData[field.name]);
      if (fieldErrors.length > 0) {
        newErrors[field.name] = fieldErrors;
      }
    });
    
    setTouched(newTouched);
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
    }
  };

  const getFieldError = (fieldName) => {
    if (touched[fieldName] && errors[fieldName]) {
      return errors[fieldName][0];
    }
    return null;
  };

  const isFieldValid = (fieldName) => {
    return touched[fieldName] && !errors[fieldName] && formData[fieldName];
  };

  const renderField = (field) => {
    const hasError = !!getFieldError(field.name);
    const isValid = isFieldValid(field.name);
    const isFocused = focusedField === field.name;

    const fieldClassName = `input w-full transition-all duration-200 ${
      hasError 
        ? 'border-red-400 focus:ring-red-500 focus:border-red-500' 
        : isValid 
          ? 'border-green-400 focus:ring-green-500 focus:border-green-500' 
          : 'border-lime-300 dark:border-dark-300 focus:border-lime-500'
    } ${isFocused ? 'ring-2 ring-lime-500/20 shadow-lime-glow' : ''}`;

    switch (field.type) {
      case 'text':
      case 'email':
        return (
          <input
            type={field.type}
            className={fieldClassName}
            placeholder={field.placeholder}
            value={formData[field.name] || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
            onBlur={() => handleBlur(field.name)}
            onFocus={() => setFocusedField(field.name)}
          />
        );

      case 'select':
        return (
          <div className="relative">
            <select
              className={`${fieldClassName} appearance-none cursor-pointer`}
              value={formData[field.name] || ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
              onBlur={() => handleBlur(field.name)}
              onFocus={() => setFocusedField(field.name)}
            >
              <option value="">{field.placeholder || 'Select an option'}</option>
              {field.options?.map(option => (
                <option key={option.id} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400 pointer-events-none" />
          </div>
        );

      case 'checkbox':
        return (
          <div className="flex items-center space-x-3 p-4 bg-lime-50 dark:bg-dark-400 rounded-xl border-2 border-lime-200 dark:border-dark-300 transition-all duration-200 hover:border-lime-400 dark:hover:border-lime-600">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="custom-checkbox"
                checked={formData[field.name] || false}
                onChange={(e) => handleChange(field.name, e.target.checked)}
                onBlur={() => handleBlur(field.name)}
              />
              <span className="ml-4 text-sm font-medium text-secondary-700 dark:text-secondary-200">
                {field.helpText || field.label}
              </span>
            </label>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Form Card */}
      <div className="card overflow-hidden">
        {/* Form Header */}
        <div className="p-8 border-b border-lime-200 dark:border-dark-300 bg-gradient-to-br from-lime-100/50 via-white to-lime-50/50 dark:from-lime-900/20 dark:via-dark-200 dark:to-lime-900/10 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-lime-400 to-lime-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-lime-500/30 animate-float">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-lime-600 to-lime-700 bg-clip-text text-transparent dark:from-lime-400 dark:to-lime-500 mb-2">
            {title}
          </h1>
          {description && (
            <p className="text-secondary-600 dark:text-secondary-400 max-w-lg mx-auto">
              {description}
            </p>
          )}
        </div>

        {/* Success Message */}
        {submitted && (
          <div className="p-6 bg-gradient-to-r from-green-500 to-green-600 text-white animate-slide-up">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-7 h-7" />
              </div>
              <div>
                <p className="font-bold text-lg">Form submitted successfully!</p>
                <p className="text-green-100 text-sm">Thank you for your submission.</p>
              </div>
            </div>
          </div>
        )}

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {fields.length === 0 ? (
            <div className="text-center py-12 bg-lime-50 dark:bg-dark-400 rounded-xl">
              <div className="w-16 h-16 bg-lime-200 dark:bg-lime-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-lime-500" />
              </div>
              <p className="text-secondary-500 dark:text-secondary-400">
                No fields in this form yet. Go back to the builder to add fields.
              </p>
            </div>
          ) : (
            fields.map((field) => (
              <div key={field.id} className="space-y-2 animate-fade-in">
                {field.type !== 'checkbox' && (
                  <label className="label flex items-center space-x-2">
                    <span className="font-bold text-secondary-800 dark:text-secondary-100">{field.label}</span>
                    {field.required && <span className="text-red-500 font-bold">*</span>}
                    {isFieldValid(field.name) && (
                      <Check className="w-4 h-4 text-green-500" />
                    )}
                  </label>
                )}
                
                <div className={field.type === 'checkbox' ? '' : 'transition-all duration-200'}>
                  {renderField(field)}
                </div>
                
                {/* Error Message */}
                {getFieldError(field.name) && (
                  <div className="flex items-center space-x-2 text-sm text-red-500 animate-fade-in">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{getFieldError(field.name)}</span>
                  </div>
                )}
                
                {/* Help Text */}
                {!getFieldError(field.name) && field.helpText && field.type !== 'checkbox' && (
                  <p className="text-xs text-secondary-500 dark:text-secondary-400 flex items-center">
                    <span className="w-1 h-1 bg-lime-400 rounded-full mr-2"></span>
                    {field.helpText}
                  </p>
                )}
              </div>
            ))
          )}

          {/* Submit Button */}
          {fields.length > 0 && (
            <div className="pt-6">
              <button
                type="submit"
                className="btn-primary w-full py-4 text-base font-semibold group"
              >
                <Send className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Submit Form
              </button>
            </div>
          )}
        </form>

        {/* Form Footer */}
        <div className="px-8 py-4 bg-gradient-to-r from-lime-50 to-transparent dark:from-dark-400 dark:to-transparent border-t border-lime-200 dark:border-dark-300">
          <p className="text-xs text-secondary-500 dark:text-secondary-400 text-center flex items-center justify-center">
            <span className="w-2 h-2 bg-lime-400 rounded-full mr-2 animate-pulse"></span>
            This is a preview of how your form will appear to users.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormPreview;

