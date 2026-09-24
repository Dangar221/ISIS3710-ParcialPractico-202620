"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Campo from "@/components/Campo";
import { useFormulario } from "@/hooks/useFormulario";
import { createPlan } from "@/services/plans";
import { getSession } from "@/services/session";

type FormData = {
  name: string;
  estimatedPrice: string;
  estimatedTime: string; // en minutos
  address: string;
  image: string;
  description: string;
  recomendations: string;
};

const initialForm: FormData = {
  name: "",
  estimatedPrice: "",
  estimatedTime: "",
  address: "",
  image: "",
  description: "",
  recomendations: "",
};

const MAX_DESCRIPCION = 600;

// Devuelve el mensaje de error del campo, o "" si está bien
function validateField(name: string, value: string): string {
  const v = value.trim();
  switch (name) {
    case "name":
      if (!v) return "El nombre es obligatorio";
      if (v.length < 2 || v.length > 50) return "El nombre debe tener entre 2 y 50 caracteres";
      return "";
    case "estimatedPrice":
      if (!v) return "El precio es obligatorio";
      if (isNaN(Number(v)) || Number(v) <= 0) return "El precio debe ser mayor a 0";
      return "";
    case "estimatedTime":
      if (!v) return "La duración es obligatoria";
      if (!/^\d+$/.test(v) || Number(v) <= 0) return "La duración debe ser un número entero de minutos";
      return "";
    case "address":
      if (!v) return "La dirección es obligatoria";
      return "";
    case "image":
      if (!v) return "La imagen es obligatoria";
      if (!/^https?:\/\/\S+$/.test(v)) return "Ingresa una URL válida (http o https)";
      return "";
    case "description":
      if (!v) return "La descripción es obligatoria";
      if (value.length >= MAX_DESCRIPCION) return `La descripción debe tener menos de ${MAX_DESCRIPCION} caracteres`;
      return "";
    case "recomendations":
      return ""; // opcional
    default:
      return "";
  }
}

export default function NewPlanPage() {
  const router = useRouter();
  const { formData, errors, handleChange, handleBlur, validarTodo } =
    useFormulario(initialForm, validateField);
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);

  // Solo un usuario con sesión puede crear planes
  useEffect(() => {
    if (!getSession().id) {
      router.push("/auth/login");
    }
  }, [router]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitError("");
    if (!validarTodo()) return;

    const session = getSession();
    if (!session.id) {
      router.push("/auth/login");
      return;
    }

    setLoading(true);
    try {
      await createPlan({
        name: formData.name.trim(),
        description: formData.description.trim(),
        estimatedPrice: Number(formData.estimatedPrice),
        estimatedTime: Number(formData.estimatedTime),
        recomendations: formData.recomendations.trim(),
        address: formData.address.trim(),
        image: formData.image.trim(),
        userId: session.id,
      });
      router.push("/plans");
    } catch (err) {
      setSubmitError("No se pudo publicar el plan. Intenta de nuevo.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="flex justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="w-full max-w-lg rounded-2xl bg-white p-8 shadow"
      >
        <h1 className="text-3xl font-bold text-slate-900">Crear plan</h1>

        <Campo name="name" label="Nombre del plan" value={formData.name} error={errors.name} onChange={handleChange} onBlur={handleBlur} />
        <Campo name="estimatedPrice" label="Precio estimado" type="number" value={formData.estimatedPrice} error={errors.estimatedPrice} onChange={handleChange} onBlur={handleBlur} />
        <Campo name="estimatedTime" label="Duración (minutos)" type="number" value={formData.estimatedTime} error={errors.estimatedTime} onChange={handleChange} onBlur={handleBlur} />
        <Campo name="address" label="Dirección" value={formData.address} error={errors.address} onChange={handleChange} onBlur={handleBlur} />
        <Campo name="image" label="URL de la imagen" type="url" value={formData.image} error={errors.image} onChange={handleChange} onBlur={handleBlur} />
        <Campo name="description" label="Descripción del plan" textarea value={formData.description} error={errors.description} onChange={handleChange} onBlur={handleBlur} />
        <Campo name="recomendations" label="Recomendaciones" textarea opcional value={formData.recomendations} error={errors.recomendations} onChange={handleChange} onBlur={handleBlur} />

        {submitError && (
          <p role="alert" className="mt-4 text-red-700">
            {submitError}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-8 w-full rounded-xl bg-blue-700 py-3 font-semibold text-white disabled:opacity-50"
        >
          {loading ? "Publicando..." : "Publicar plan"}
        </button>
      </form>
    </div>
  );
}