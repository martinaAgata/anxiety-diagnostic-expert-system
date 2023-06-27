import uvicorn
import logging
from fastapi import FastAPI, HTTPException
from starlette import status
from sistema_experto import *

from utils import DiagnosticoRequest, obtener_antecedentes, obtener_diagnostico_previo, obtener_sintoma


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
        return {"diagnóstico": experto_diagnosticador.diagnostico}
    raise HTTPException(status_code=400, detail="No se pudo realizar el diagnóstico.")


if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
