"use client";

import { useState } from "react";

type Evento = React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
type EventoBlur = React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;

// maneja los valores y errores de cualquier formulario
export function useFormulario<T extends Record<string, string>>(
  initialForm: T,
  validateField: (name: string, value: string) => string,
) {
  const [formData, setFormData] = useState<T>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleChange(e: Evento) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  }

  function handleBlur(e: EventoBlur) {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  }

  // valida todos los campos, devuelve true si no hay errores
  function validarTodo(): boolean {
    const newErrors: Record<string, string> = {};
    for (const [name, value] of Object.entries(formData)) {
      const error = validateField(name, value);
      if (error) newErrors[name] = error;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function reset() {
    setFormData(initialForm);
    setErrors({});
  }

  return { formData, errors, handleChange, handleBlur, validarTodo, reset };
}
