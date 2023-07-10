import { AcademicCapIcon } from '@heroicons/react/20/solid'
import NextLink from 'next/link'

const features = [
  {
    name: 'Sólo para profesionales.',
    description:
      'Desarrollado como una herramienta complementaria para el diagnóstico de profesionales de la salud mental.',
    icon: AcademicCapIcon,
  },
  {
    name: 'Sistema experto.',
    description: 'Implementado como un sistema que emula el razonamiento de un experto con la ayuda de profesionales en la materia.',
    icon: AcademicCapIcon,
  },
]


export default function Home() {
  return (
    <div className="overflow-hidden py-20 rounded-3xl">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Test de trastornos de ansiedad</p>
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 flex">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Un test para el diagnóstico de trastornos de ansiedad desarrollado con y para profesionales
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon className="absolute left-1 top-1 h-5 w-5 text-teal-900" aria-hidden="true" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <NextLink
                  href="test"
                  className="rounded-md bg-teal-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                  Comenzar evaluación
                </NextLink>
              </div>
            </div>
          </div>
          <img
            src="anxiety-illustration.png"
            alt="Product screenshot"
            className="w-[35rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-900/10 md:-ml-4 lg:-ml-0"
            width={1000}
          />
        </div>
      </div>
    </div>
  )
}

