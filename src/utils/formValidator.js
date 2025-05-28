export class FormValidator {
  constructor(rules = {}) {
    this.rules = rules
  }

  validate(values) {
    const errors = {}
    
    Object.entries(this.rules).forEach(([field, fieldRules]) => {
      const value = values[field]
      
      for (const rule of fieldRules) {
        if (rule.required && !value) {
          errors[field] = rule.message
          break
        }
        
        if (rule.min && String(value).length < rule.min) {
          errors[field] = rule.message
          break
        }
        
        if (rule.max && String(value).length > rule.max) {
          errors[field] = rule.message
          break
        }
        
        if (rule.pattern && !rule.pattern.test(value)) {
          errors[field] = rule.message
          break
        }
        
        if (rule.validator) {
          const result = rule.validator(value)
          if (!result) {
            errors[field] = rule.message
            break
          }
        }
      }
    })
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    }
  }

  addField(name, rules) {
    this.rules[name] = rules
  }

  removeField(name) {
    delete this.rules[name]
  }
}

export const createFormValidator = (rules) => {
  return new FormValidator(rules)
}

// 預定義的驗證規則
export const rules = {
  required: (message) => ({
    required: true,
    message
  }),
  
  min: (min, message) => ({
    min,
    message
  }),
  
  max: (max, message) => ({
    max,
    message
  }),
  
  pattern: (pattern, message) => ({
    pattern,
    message
  }),
  
  validator: (validator, message) => ({
    validator,
    message
  })
}