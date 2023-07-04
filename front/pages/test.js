function createSelectField({ labelText, selectId, selectName, selectOptions }) {
  return (
    <div className="sm:col-span-3">
      <label htmlFor={selectId} className="block text-sm font-medium leading-6 text-gray-900">
        {labelText}
      </label>
      <div className="mt-2">
        <select
          id={selectId}
          name={selectName}
          autoComplete="country-name"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:max-w-xs sm:text-sm sm:leading-6"
        >
          {selectOptions.map(option => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

function renderSelectFields(fieldsArray) {
  return fieldsArray.map(field => createSelectField(field));
}

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
    labelText: 'Ansiedad',
    selectId: 'ansiedad',
    selectName: 'ansiedad',
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

export default function Test() {

  return (
    <div className="flex justify-center">
      <form>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-xl font-semibold leading-7 text-gray-900">Test de diagnóstico</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">Completar con información del paciente</p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
              {renderSelectFields(fields)}
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
            Cancelar
          </button>
          <button
            type="submit"
            className="rounded-md bg-black-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Diagnosticar
          </button>
        </div>

      </form>
    </div>
  )
}
