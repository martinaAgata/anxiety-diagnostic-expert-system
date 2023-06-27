import uvicorn
import logging
from fastapi import FastAPI, HTTPException
from starlette import status

from modelo import DiagnosticoRequest
from sistema_experto import *


app = FastAPI()
logger = logging.getLogger("app")


@app.post("/diagnostico", status_code=status.HTTP_200_OK)
async def diagnostico(request: DiagnosticoRequest):
    experto_diagnosticador = Diagnosticador()
    experto_diagnosticador.reset()

    experto_diagnosticador.declare(
        Fact(obtener_diagnostico_previo(request.diagnostico_previo.value))
    )
    experto_diagnosticador.declare(
        Fact(obtener_antecedentes(request.antecedentes_familiares.value))
    )

    for _sintoma_nombre, sintoma_valor in request.sintomas.items():
        experto_diagnosticador.declare(Fact(obtener_sintoma(sintoma_valor)))

    print(experto_diagnosticador.facts)
    experto_diagnosticador.run()

    if experto_diagnosticador.diagnostico:
        return {"diagnostico": experto_diagnosticador.diagnostico}
    raise HTTPException(status_code=400, detail="No se pudo hacer el diagnóstico.")


def obtener_sintoma(nombre_sintoma):
    sintoma = ""
    for s in Sintomas:
        if s.name == nombre_sintoma:
            sintoma = s
            break
    return sintoma

def obtener_diagnostico_previo(nombre_diagnostico_previo):
    diagnostico_previo = ""
    for d in DiagnosticoPrevio:
        if d.name == nombre_diagnostico_previo:
            diagnostico_previo = d
            break
    return diagnostico_previo

def obtener_antecedentes(nombre_antecedentes):
    antecedentes = ""
    for a in AntecedentesFamiliares:
        if a.name == nombre_antecedentes:
            antecedentes = a
            break
    return antecedentes


if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
