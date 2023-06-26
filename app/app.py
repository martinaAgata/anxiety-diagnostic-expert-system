import uvicorn
import logging
from fastapi import FastAPI, HTTPException
from starlette import status

from modelo import DiagnosticoRequest
from sistema_experto import *


app = FastAPI()
logger = logging.getLogger('app')


@app.post('/diagnostico', status_code=status.HTTP_200_OK)
async def diagnostico(request: DiagnosticoRequest):

    experto_diagnosticador = Diagnosticador()
    experto_diagnosticador.reset()

    request_json = request.json()
    logger.critical(request_json)
    experto_diagnosticador.declare(Fact(DiagnosticoPrevio[request_json['diagnostico_previo']]))
    logger.critical(request_json)
    experto_diagnosticador.declare(Fact(AntecedentesFamiliares[request_json['antecedentes_familiares']]))


    for sintoma in request_json.get('sintomas').values():
        logger.critical(sintoma)
        experto_diagnosticador.declare(Fact(Sintomas[sintoma]))

    experto_diagnosticador.run()

    if experto_diagnosticador.diagnostico:
        return {'diagnostico': experto_diagnosticador.diagnostico.value}
    raise HTTPException(status_code=400, detail="No se pudo hacer el diagnóstico.")


if __name__ == '__main__':
    uvicorn.run("app:app", host='0.0.0.0', port=8000, reload=True)
