import NextLink from 'next/link'
import { useState } from 'react';

const fields = [
  {
    labelText: 'Antecedentes familiares',
    selectId: 'antecedentes_familiares',
    selectName: 'antecedentes_familiares',
    selectOptions: ['', 'Sí', 'No'],
  },
  {
    labelText: 'Diagnóstico previo',
    selectId: 'diagnostico_previo',
    selectName: 'diagnostico_previo',
    selectOptions: ['', 'Sí', 'No'],
  },
  {
    labelText: 'Angustia',
    selectId: 'angustia',
    selectName: 'angustia',
    selectOptions: ['', 'Severa', 'Moderada', 'Leve'],
  },
  {
    labelText: 'Apego',
    selectId: 'apego',
    selectName: 'apego',
    selectOptions: ['', 'Constante', 'Ocasional'],
  },
  {
    labelText: 'Miedo irracional',
    selectId: 'miedo_irracional',
    selectName: 'miedo_irracional',
    selectOptions: ['', 'Frecuente', 'Infrecuente'],
  },
  {
    labelText: 'Temor repentino',
    selectId: 'temor_repentino',
    selectName: 'temor_repentino',
    selectOptions: ['', 'Frecuente', 'Infrecuente'],
  },
  {
    labelText: 'Dificultad para sociabilizar',
    selectId: 'dificultad_social',
    selectName: 'dificultad_social',
    selectOptions: ['', 'Alta', 'Baja'],
  },
  {
    labelText: 'Problemas para conciliar sueño',
    selectId: 'problemas_sueño',
    selectName: 'problemas_sueño',
    selectOptions: ['', 'Recurrentes', 'Ocasionales'],
  },
  {
    labelText: 'Dificultad para respirar',
    selectId: 'dificultad_respiratoria',
    selectName: 'dificultad_respiratoria',
    selectOptions: ['', 'Frecuente', 'Infrecuente'],
  }
]

const parseBody = (input) => {
  return {
    "antecedentes_familiares": input.antecedentes_familiares === "Sí" ? "SI" : "NO",
    "diagnostico_previo": input.diagnostico_previo === "Sí" ? "SI" : "NO",
    "sintomas": {
      "angustia": input.angustia === "Severa" ? "ANGUSTIA_ALTA" : ("Moderada" ? "ANGUSTIA_MEDIA" : "ANGUSTIA_BAJA"),
      "apego": input.apego === "Constante" ? "APEGO_ALTO" : "APEGO_BAJO",
      "dificultad_respiratoria": input.dificultad_respiratoria === "Frecuente" ? "DIFICULTAD_RESPIRAR_ALTA" : "DIFICULTAD_RESPIRAR_BAJA",
      "miedo_irracional": input.miedo_irracional === "Infrecuente" ? "MIEDO_IRRACIONAL_BAJO" : "MIEDO_IRRACIONAL_ALTO",
      "temor_repentino": input.temor_repentino === "Infrecuente" ? "TEMOR_REPENTINO_BAJO" : "TEMOR_REPENTINO_ALTO",
      "problemas_sueño": input.problemas_sueño === "Recurrentes" ? "PROBLEMAS_SUEÑO_ALTO" : "PROBLEMAS_SUEÑO_BAJO",
      "dificultad_social": input.dificultad_social === "Alta" ? "DIFICULTAD_SOCIAL_ALTA" : "DIFICULTAD_SOCIAL_BAJA"
    }
  }
}

const DiagnosticResult = ({ result }) => {
  return (
    <div>
      <div className="flex justify-center">
        <h1 className="text-xl font-semibold leading-7 text-gray-900 mb-5">Resultado del diagnóstico</h1>
      </div>
      <h2 className="">{result["diagnóstico"]}</h2>
      <div className="flex justify-center mt-10">
        <NextLink
          href="/home"
          className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        >
          Volver
        </NextLink>
      </div>
    </div>
  );
};

export default function Test() {
  const [formData, setFormData] = useState({});
  const [diagnosticResult, setDiagnosticResult] = useState(null);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    let requestBody = JSON.stringify(parseBody(formData))
    console.log(requestBody)

    // Send the HTTP POST request with the form data
    fetch('http://127.0.0.1:8000/diagnostico', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestBody,
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Request failed with status ${response.status}`);
        }
      })
      .then(data => {
        console.log(data);
        setDiagnosticResult(data);
      })
      .catch((error) => {
        console.error('Error occurred while sending form data:', error);
      });
  };

  function createSelectField({ labelText, selectId, selectName, selectOptions }) {
    return (
      <div key={selectId} className="sm:col-span-3">
        <label htmlFor={selectId} className="block text-sm font-medium leading-6 text-gray-900">
          {labelText}
        </label>
        <div className="mt-2">
          <select
            id={selectId}
            key={selectId}
            name={selectName}
            autoComplete="country-name"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:max-w-xs sm:text-sm sm:leading-6"
            onChange={handleInputChange}
            required
          >
            {selectOptions.map(option => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  function renderSelectFields(fieldsArray) {
    return fieldsArray.map(field => createSelectField(field));
  }

  return (
    <div className="flex justify-center">
      {diagnosticResult ? (
        <DiagnosticResult result={diagnosticResult} />
      ) : (
        <form onSubmit={handleFormSubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-xl font-semibold leading-7 text-gray-900">Test de diagnóstico</h2>
              <p  className="mt-1 text-sm leading-6 text-gray-600">Completar con información del paciente</p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
                {renderSelectFields(fields)}
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-16">
            <NextLink
              href="home"
            >
              <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                Cancelar
              </button>
            </NextLink>
            <button
              type="submit"
              className="rounded-md bg-black-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Diagnosticar
            </button>
          </div>

        </form>
      )}
    </div>
  )
}
