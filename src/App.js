import React, { useState, useCallback, useEffect } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { v4 as uuidv4 } from 'uuid';
import { 
  Plus, 
  Type, 
  Mail, 
  List, 
  CheckSquare, 
  Eye, 
  Code, 
  Settings,
  X,
  Upload,
  Sun,
  Moon,
  Sparkles,
  FormInput
} from 'lucide-react';
import FieldEditor from './components/FieldEditor';
import FieldPreview from './components/FieldPreview';
import FormPreview from './components/FormPreview';
import JSONExport from './components/JSONExport';

// Field types configuration
const FIELD_TYPES = [
  { type: 'text', icon: Type, label: 'Text Field', description: 'Single line text input' },
  { type: 'email', icon: Mail, label: 'Email Field', description: 'Email address input' },
  { type: 'select', icon: List, label: 'Dropdown', description: 'Select from options' },
  { type: 'checkbox', icon: CheckSquare, label: 'Checkbox', description: 'Boolean selection' },
];

const initialFields = [
  {
    id: uuidv4(),
    type: 'text',
    label: 'Full Name',
    name: 'fullName',
    placeholder: 'Enter your full name',
    required: true,
    helpText: '',
    validation: { minLength: 2, maxLength: 50 },
  },
  {
    id: uuidv4(),
    type: 'email',
    label: 'Email Address',
    name: 'email',
    placeholder: 'Enter your email',
    required: true,
    helpText: 'We will never share your email',
    validation: {},
  },
  {
    id: uuidv4(),
    type: 'select',
    label: 'Country',
    name: 'country',
    placeholder: 'Select your country',
    required: true,
    options: [
      { id: uuidv4(), value: 'us', label: 'United States' },
      { id: uuidv4(), value: 'uk', label: 'United Kingdom' },
      { id: uuidv4(), value: 'ca', label: 'Canada' },
    ],
    helpText: '',
    validation: {},
  },
];

function App() {
  const [fields, setFields] = useState(initialFields);
  const [selectedField, setSelectedField] = useState(null);
  const [view, setView] = useState('builder'); // 'builder' | 'preview' | 'json'
  const [showFieldPicker, setShowFieldPicker] = useState(false);
  const [formTitle, setFormTitle] = useState('My Form');
  const [formDescription, setFormDescription] = useState('A sample form built with Form Builder');
  const [darkMode, setDarkMode] = useState(false);

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      setDarkMode(JSON.parse(savedDarkMode));
    } else {
      setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Toggle dark mode
  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => !prev);
  }, []);

  // Add new field
  const addField = useCallback((type) => {
    const newField = {
      id: uuidv4(),
      type,
      label: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
      name: `field_${Date.now()}`,
      placeholder: '',
      required: false,
      helpText: '',
      options: type === 'select' ? [
        { id: uuidv4(), value: 'option1', label: 'Option 1' },
        { id: uuidv4(), value: 'option2', label: 'Option 2' },
      ] : [],
      validation: {},
    };
    
    setFields(prev => [...prev, newField]);
    setSelectedField(newField.id);
    setShowFieldPicker(false);
  }, []);

  // Update field
  const updateField = useCallback((id, updates) => {
    setFields(prev => prev.map(field => 
      field.id === id ? { ...field, ...updates } : field
    ));
  }, []);

  // Remove field
  const removeField = useCallback((id) => {
    setFields(prev => prev.filter(field => field.id !== id));
    if (selectedField === id) {
      setSelectedField(null);
    }
  }, [selectedField]);

  // Reorder fields
  const reorderFields = useCallback((result) => {
    if (!result.destination) return;

    const items = Array.from(fields);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFields(items);
  }, [fields]);

  // Duplicate field
  const duplicateField = useCallback((id) => {
    const field = fields.find(f => f.id === id);
    if (!field) return;

    const newField = {
      ...field,
      id: uuidv4(),
      name: `${field.name}_copy`,
      label: `${field.label} (Copy)`,
    };

    const index = fields.findIndex(f => f.id === id);
    const newFields = [...fields];
    newFields.splice(index + 1, 0, newField);
    setFields(newFields);
    setSelectedField(newField.id);
  }, [fields]);

  // Export JSON
  const exportJSON = useCallback(() => {
    const schema = {
      title: formTitle,
      description: formDescription,
      fields: fields.map(({ id, ...field }) => field),
      metadata: {
        createdAt: new Date().toISOString(),
        version: '1.0',
      },
    };
    return JSON.stringify(schema, null, 2);
  }, [fields, formTitle, formDescription]);

  // Import JSON
  const importJSON = useCallback((jsonString) => {
    try {
      const schema = JSON.parse(jsonString);
      if (schema.fields && Array.isArray(schema.fields)) {
        setFields(schema.fields.map(field => ({ ...field, id: uuidv4() })));
        if (schema.title) setFormTitle(schema.title);
        if (schema.description) setFormDescription(schema.description);
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }, []);

  // Form validation
  const validateField = useCallback((field, value) => {
    const errors = [];
    
    if (field.required && !value) {
      errors.push(`${field.label} is required`);
    }
    
    if (field.validation?.minLength && value?.length < field.validation.minLength) {
      errors.push(`${field.label} must be at least ${field.validation.minLength} characters`);
    }
    
    if (field.validation?.maxLength && value?.length > field.validation.maxLength) {
      errors.push(`${field.label} must be no more than ${field.validation.maxLength} characters`);
    }
    
    if (field.type === 'email' && value && !/\S+@\S+\.\S+/.test(value)) {
      errors.push(`${field.label} must be a valid email`);
    }
    
    return errors;
  }, []);

  return (
    <div className="min-h-screen bg-lime-50 dark:bg-dark-200 transition-colors duration-300">
      {/* Header - Centered with bigger size */}
      <header className="bg-white/80 dark:bg-dark-300/80 backdrop-blur-xl border-b border-lime-200 dark:border-dark-400 sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            {/* Left side - View switcher */}
            <div className="flex items-center w-1/3">
              <div className="flex items-center bg-lime-100 dark:bg-dark-400 rounded-xl p-1.5">
                <button
                  onClick={() => setView('builder')}
                  className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    view === 'builder' 
                      ? 'bg-white dark:bg-dark-300 text-lime-700 dark:text-lime-400 shadow-sm' 
                      : 'text-secondary-600 dark:text-secondary-400 hover:text-lime-700 dark:hover:text-lime-400'
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  <span className="hidden sm:inline">Builder</span>
                </button>
                <button
                  onClick={() => setView('preview')}
                  className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    view === 'preview' 
                      ? 'bg-white dark:bg-dark-300 text-lime-700 dark:text-lime-400 shadow-sm' 
                      : 'text-secondary-600 dark:text-secondary-400 hover:text-lime-700 dark:hover:text-lime-400'
                  }`}
                >
                  <Eye className="w-5 h-5" />
                  <span className="hidden sm:inline">Preview</span>
                </button>
                <button
                  onClick={() => setView('json')}
                  className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    view === 'json' 
                      ? 'bg-white dark:bg-dark-300 text-lime-700 dark:text-lime-400 shadow-sm' 
                      : 'text-secondary-600 dark:text-secondary-400 hover:text-lime-700 dark:hover:text-lime-400'
                  }`}
                >
                  <Code className="w-5 h-5" />
                  <span className="hidden sm:inline">JSON</span>
                </button>
              </div>
            </div>
            
            {/* Center - Logo, Name, Motto - Bigger */}
            <div className="flex flex-col items-center justify-center w-1/3">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-to-br from-lime-400 to-lime-600 rounded-xl flex items-center justify-center shadow-lg shadow-lime-500/30 animate-float">
                  <FormInput className="w-8 h-8 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold bg-gradient-to-r from-lime-600 to-lime-700 bg-clip-text text-transparent dark:from-lime-400 dark:to-lime-500 font-display tracking-tight">
                    Form Builder
                  </span>
                  <p className="text-sm text-secondary-500 dark:text-lime-400/70 flex items-center mt-1">
                    <Sparkles className="w-4 h-4 mr-1.5 text-lime-500" />
                    Create beautiful forms
                  </p>
                </div>
              </div>
            </div>
            
            {/* Right side - Dark mode toggle */}
            <div className="flex items-center justify-end w-1/3">
              <button
                onClick={toggleDarkMode}
                className="relative w-14 h-14 rounded-xl bg-lime-100 dark:bg-dark-400 flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-lime-500/20"
                title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                <div className="relative w-7 h-7">
                  <Sun 
                    className={`w-7 h-7 text-lime-600 absolute inset-0 transition-all duration-300 ${
                      darkMode ? 'rotate-90 opacity-0 scale-50' : 'rotate-0 opacity-100 scale-100'
                    }`} 
                  />
                  <Moon 
                    className={`w-7 h-7 text-lime-400 absolute inset-0 transition-all duration-300 ${
                      darkMode ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-50'
                    }`} 
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === 'builder' ? (
          <div className="flex flex-col lg:flex-row gap-8 animate-fade-in">
            {/* Field Picker Sidebar */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="card p-5 sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-9 h-9 bg-gradient-to-br from-lime-400 to-lime-500 rounded-lg flex items-center justify-center">
                      <Plus className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-lg font-bold text-secondary-900 dark:text-white">Add Fields</h2>
                  </div>
                  <span className="badge-primary">{fields.length} fields</span>
                </div>
                
                <button
                  onClick={() => setShowFieldPicker(!showFieldPicker)}
                  className="btn-primary w-full mb-4 py-3"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add New Field
                </button>
                
                {showFieldPicker && (
                  <div className="space-y-3 mb-4 animate-slide-down">
                    {FIELD_TYPES.map(({ type, icon: Icon, label, description }) => (
                      <button
                        key={type}
                        onClick={() => addField(type)}
                        className="w-full flex items-center space-x-3 p-4 rounded-xl border-2 border-lime-200 dark:border-dark-400 hover:border-lime-400 hover:bg-lime-50 dark:hover:bg-dark-400 transition-all text-left group"
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-lime-100 to-lime-50 dark:from-dark-400 dark:to-dark-300 rounded-xl flex items-center justify-center group-hover:from-lime-200 group-hover:to-lime-100 transition-colors">
                          <Icon className="w-6 h-6 text-lime-600 dark:text-lime-400" />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-secondary-900 dark:text-white">{label}</p>
                          <p className="text-xs text-secondary-500 dark:text-secondary-400">{description}</p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-lime-100 dark:bg-dark-400 flex items-center justify-center group-hover:bg-lime-500 transition-colors">
                          <Plus className="w-4 h-4 text-lime-600 dark:text-lime-400 group-hover:text-white transition-colors" />
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                
                {/* Form Info */}
                <div className="border-t border-lime-200 dark:border-dark-400 pt-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-7 h-7 bg-gradient-to-br from-lime-400 to-lime-500 rounded-lg flex items-center justify-center">
                      <Settings className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-sm font-bold text-secondary-900 dark:text-white">Form Details</h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="label">Form Title</label>
                      <input
                        type="text"
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                        className="input"
                        placeholder="Enter form title"
                      />
                    </div>
                    <div>
                      <label className="label">Description</label>
                      <textarea
                        value={formDescription}
                        onChange={(e) => setFormDescription(e.target.value)}
                        className="input resize-none"
                        rows={2}
                        placeholder="Enter form description"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="border-t border-lime-200 dark:border-dark-400 pt-4 mt-4">
                  <div className="grid grid-cols-2 gap-2">
                    <JSONExport 
                      data={{ title: formTitle, description: formDescription, fields }}
                      filename="form-schema.json"
                    />
                    <label className="btn-secondary cursor-pointer text-center">
                      <Upload className="w-4 h-4 mr-2" />
                      Import
                      <input
                        type="file"
                        accept=".json"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              if (importJSON(event.target?.result)) {
                                alert('Form imported successfully!');
                              } else {
                                alert('Invalid JSON format');
                              }
                            };
                            reader.readAsText(file);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Builder Canvas */}
            <div className="flex-1">
              <div className="card overflow-hidden">
                <div className="p-5 border-b border-lime-200 dark:border-dark-400 bg-gradient-to-r from-lime-100/50 to-transparent dark:from-dark-400 dark:to-transparent">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold text-secondary-900 dark:text-white">Form Fields</h2>
                      <p className="text-sm text-secondary-500 dark:text-secondary-400 flex items-center space-x-1">
                        <span>Drag to reorder, click to edit</span>
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-secondary-500 dark:text-secondary-400">
                        {fields.length} {fields.length === 1 ? 'field' : 'fields'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <DragDropContext onDragEnd={reorderFields}>
                  <Droppable droppableId="fields">
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`p-4 min-h-[400px] transition-colors duration-300 ${
                          snapshot.isDraggingOver 
                            ? 'bg-lime-50 dark:bg-dark-400' 
                            : ''
                        }`}
                      >
                        {fields.length === 0 ? (
                          <div className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="w-24 h-24 bg-gradient-to-br from-lime-100 to-lime-200 dark:from-dark-400 dark:to-dark-300 rounded-full flex items-center justify-center mb-4 animate-float">
                              <Plus className="w-12 h-12 text-lime-500" />
                            </div>
                            <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-2">No fields yet</h3>
                            <p className="text-secondary-500 dark:text-secondary-400 mb-6 max-w-sm">
                              Click "Add New Field" to start building your form. Choose from text, email, dropdown, or checkbox fields.
                            </p>
                            <button
                              onClick={() => addField('text')}
                              className="btn-primary"
                            >
                              <Plus className="w-4 h-4 mr-2" />
                              Add Text Field
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {fields.map((field, index) => (
                              <div
                                key={field.id}
                                className={`field-enter transition-all duration-200 ${
                                  selectedField === field.id 
                                    ? 'ring-2 ring-lime-500 shadow-lime-glow' 
                                    : ''
                                }`}
                                onClick={() => setSelectedField(field.id)}
                              >
                                <FieldPreview
                                  field={field}
                                  index={index}
                                  isSelected={selectedField === field.id}
                                  onRemove={() => removeField(field.id)}
                                  onDuplicate={() => duplicateField(field.id)}
                                  darkMode={darkMode}
                                />
                              </div>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            </div>
            
            {/* Field Editor Panel */}
            {selectedField && (
              <div className="lg:w-96 flex-shrink-0">
                <div className="card p-5 sticky top-24">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-9 h-9 bg-gradient-to-br from-lime-400 to-lime-500 rounded-lg flex items-center justify-center">
                        <Settings className="w-5 h-5 text-white" />
                      </div>
                      <h2 className="text-lg font-bold text-secondary-900 dark:text-white">Edit Field</h2>
                    </div>
                    <button
                      onClick={() => setSelectedField(null)}
                      className="btn-icon"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <FieldEditor
                    field={fields.find(f => f.id === selectedField)}
                    onUpdate={(updates) => updateField(selectedField, updates)}
                    onRemove={() => removeField(selectedField)}
                    darkMode={darkMode}
                  />
                </div>
              </div>
            )}
          </div>
        ) : view === 'preview' ? (
          <FormPreview
            title={formTitle}
            description={formDescription}
            fields={fields}
            validateField={validateField}
            darkMode={darkMode}
          />
        ) : (
          <div className="card overflow-hidden animate-fade-in">
            <div className="p-5 border-b border-lime-200 dark:border-dark-400 bg-gradient-to-r from-lime-50 to-transparent dark:from-dark-400 dark:to-transparent">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-11 h-11 bg-gradient-to-br from-lime-400 to-lime-500 rounded-xl flex items-center justify-center">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-secondary-900 dark:text-white">Form Schema (JSON)</h2>
                    <p className="text-sm text-secondary-500 dark:text-secondary-400">Export or copy this schema</p>
                  </div>
                </div>
                <JSONExport
                  data={{ title: formTitle, description: formDescription, fields }}
                  filename="form-schema.json"
                  showPreview={false}
                />
              </div>
            </div>
            <div className="p-4">
              <pre className="bg-secondary-800 dark:bg-dark-600 text-secondary-100 dark:text-secondary-100 p-4 rounded-xl overflow-auto max-h-[600px] text-sm font-mono transition-colors duration-300">
                {exportJSON()}
              </pre>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

