from enum import Enum
from typing import Dict, List
from pydantic import BaseModel, Field


class DiagnosticoPrevio(str, Enum):
    NO = "NO"
    SI = "SI"


class AntecedentesFamiliares(str, Enum):
    NO = "NO"
    SI = "SI"


class DiagnosticoRequest(BaseModel):
    antecedentes_familiares: AntecedentesFamiliares = Field(..., example="SI")
    diagnostico_previo: DiagnosticoPrevio = Field(..., example="NO")
    sintomas: Dict[str, str] = Field(..., example={
                                                    "angustia": "ANGUSTIA_ALTA",
                                                    "apego": "APEGO_BAJO",
                                                    "dificultad_respiratoria": "DIFICULTAD_RESPIRAR_ALTA",
                                                    "miedo_irracional": "MIEDO_IRRACIONAL_BAJO",
                                                    "temor_repentino": "TEMOR_REPENTINO_BAJO",
                                                    "problemas_sueño": "PROBLEMAS_SUEÑO_BAJO",
                                                    "dificultad_social": "DIFICULTAD_SOCIAL_ALTA"
                                                })
