## Sistema de diagnóstico de trastornos de ansiedad

Sistema experto para el diagnóstico de trastornos psicológicos de ansiedad.


### Backend

#### Requerimientos previos

Como único requerimiento previo, se debe tener *Poetry* instalado.
Para Linux, macOS, Windows (WSL) puede obtenerse con el siguiente comando:

```$ curl -sSL https://install.python-poetry.org | python3 -```

#### Dependencias

- Python 3.9
- FastAPI 0.66.0
- Uvicorn 0.14.0
- Experta 1.9.4

#### Instalación

Habiendo ingresado a la carpeta app, primero ejecutar el siguiente comando que generará el archivo *poetry.lock* para garantizar que las dependencias instaladas sean consistentes con la última vez que se actualizaron explícitamente en el archivo *pyproject.toml*:

```$ poetry lock```

Y, finalmente, el *poetry.lock* será leído instalando todas las dependencias y cualquier dependencia transitiva, asegurando así que siempre se instalen versiones específicas y predecibles de las dependencias con el siguiente comando:

```$ poetry install```

#### Ejecución

```$ poetry run python3 app.py```
