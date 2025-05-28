// 定義基礎驗證規則
const rules = {
  required: (fieldName) => (value) => ({
    valid: value !== undefined && value !== null && value !== '',
    message: `${fieldName}為必填`
  }),
  
  min: (min) => (value) => ({
    valid: String(value).length >= min,
    message: `長度不能小於 ${min} 個字符`
  }),
  
  max: (max) => (value) => ({
    valid: String(value).length <= max,
    message: `長度不能超過 ${max} 個字符`
  }),
  
  email: (value) => ({
    valid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message: '請輸入正確的電子郵件格式'
  }),
  
  matches: (pattern, msg) => (value) => ({
    valid: pattern.test(value),
    message: msg
  }),
  
  equals: (compareValue, msg) => (value) => ({
    valid: value === compareValue,
    message: msg || '兩個值不相等'
  })
}

// 創建驗證器
export const createValidator = (schema) => {
  return (data) => {
    const errors = {}
    
    Object.entries(schema).forEach(([field, validations]) => {
      const value = data[field]
      
      for (const validation of validations) {
        const result = validation(value)
        if (!result.valid) {
          errors[field] = result.message
          break
        }
      }
    })
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    }
  }
}

// 導出驗證規則
export const validate = {
  required: rules.required,
  min: rules.min,
  max: rules.max,
  email: rules.email,
  matches: rules.matches,
  equals: rules.equals
}