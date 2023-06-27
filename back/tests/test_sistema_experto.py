from unittest import TestCase
from experta import *

from app.sistema_experto import *


class TestsSistemaExperto(TestCase):
    def test_ansiedad_por_separacion(self):
        diagnostico = Diagnosticador()
        diagnostico.reset()
        diagnostico.declare(Fact(Sintomas.ANGUSTIA_ALTA))
        diagnostico.declare(Fact(Sintomas.APEGO_ALTO))
        diagnostico.run()
        self.assertEqual(diagnostico.diagnostico, Diagnostico.ANSIEDAD_POR_SEPARACION)

    def test_ansiedad_generalizada(self):
        diagnostico = Diagnosticador()
        diagnostico.reset()
        diagnostico.declare(Fact(Sintomas.ANGUSTIA_ALTA))
        diagnostico.declare(Fact(Sintomas.DIFICULTAD_RESPIRAR_ALTA))
        diagnostico.declare(Fact(AntecedentesFamiliares.SI))
        diagnostico.run()
        self.assertEqual(diagnostico.diagnostico, Diagnostico.ANSIEDAD_GENERALIZADA)

    def test_panico(self):
        diagnostico = Diagnosticador()
        diagnostico.reset()
        diagnostico.declare(Fact(Sintomas.ANGUSTIA_MEDIA))
        diagnostico.declare(Fact(Sintomas.DIFICULTAD_RESPIRAR_ALTA))
        diagnostico.declare(Fact(Sintomas.TEMOR_REPENTINO_ALTO))
        diagnostico.declare(Fact(DiagnosticoPrevio.SI))
        diagnostico.run()
        self.assertEqual(diagnostico.diagnostico, Diagnostico.TRASTORNO_DE_PANICO)

    def test_ansiedad_social(self):
        diagnostico = Diagnosticador()
        diagnostico.reset()
        diagnostico.declare(Fact(Sintomas.MIEDO_IRRACIONAL_ALTO))
        diagnostico.declare(Fact(Sintomas.DIFICULTAD_SOCIAL_ALTA))
        diagnostico.run()
        self.assertEqual(diagnostico.diagnostico, Diagnostico.FOBIA_SOCIAL)

    def test_default(self):
        diagnostico = Diagnosticador()
        diagnostico.reset()
        diagnostico.run()
        self.assertEqual(diagnostico.diagnostico, Diagnostico.SIN_DIAGNOSTICO)
