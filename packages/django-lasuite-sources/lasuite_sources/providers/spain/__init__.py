"""Official Spanish State API Slashers (BOE, Registro Mercantil, PLACSP, Catastro, INE, Datos.gob.es)."""

from lasuite_sources.providers.spain.cadastre import CatastroSourceProvider
from lasuite_sources.providers.spain.company import RegistroMercantilSourceProvider
from lasuite_sources.providers.spain.law import BoeSourceProvider
from lasuite_sources.providers.spain.opendata import DatosGobSourceProvider
from lasuite_sources.providers.spain.procurement import PlacspSourceProvider
from lasuite_sources.providers.spain.statistics import IneSourceProvider

__all__ = [
    "BoeSourceProvider",
    "RegistroMercantilSourceProvider",
    "PlacspSourceProvider",
    "CatastroSourceProvider",
    "IneSourceProvider",
    "DatosGobSourceProvider",
]
