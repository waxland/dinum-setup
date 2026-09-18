"""Tests for Germany, Netherlands, Spain, International & Federated sovereign source providers."""

import pytest

from lasuite_sources.providers.federation import (
    BrisFederatedSourceProvider,
    InspireAddressFederatedProvider,
    InspireCadastreFederatedProvider,
    YourEuropeSourceProvider,
)
from lasuite_sources.providers.germany import (
    BundestagSourceProvider,
    DestatisSourceProvider,
    GesetzeSourceProvider,
    GovDataSourceProvider,
    HandelsregisterSourceProvider,
)
from lasuite_sources.providers.international import (
    HudocSourceProvider,
    OecdSourceProvider,
    WhoSourceProvider,
    WorldBankSourceProvider,
)
from lasuite_sources.providers.netherlands import (
    BagSourceProvider,
    CbsSourceProvider,
    DataOverheidSourceProvider,
    KvkSourceProvider,
    WettenbankSourceProvider,
)
from lasuite_sources.providers.spain import (
    BoeSourceProvider,
    CatastroSourceProvider,
    DatosGobSourceProvider,
    IneSourceProvider,
    PlacspSourceProvider,
    RegistroMercantilSourceProvider,
)


def test_germany_providers():
    """Verify Germany providers (Gesetze, Handelsregister, Bundestag, Destatis, GovData)."""
    gesetz = GesetzeSourceProvider()
    assert gesetz.source_type == "gesetz"
    assert len(gesetz.search("bgb")) >= 1

    register = HandelsregisterSourceProvider()
    assert register.source_type == "register_de"
    assert len(register.search("sap")) >= 1

    bundestag = BundestagSourceProvider()
    assert bundestag.source_type == "bundestag"
    assert len(bundestag.search("digital")) >= 1

    destatis = DestatisSourceProvider()
    assert destatis.source_type == "destatis"
    assert len(destatis.search("vpi")) >= 1

    govdata = GovDataSourceProvider()
    assert govdata.source_type == "govdata"
    assert len(govdata.search("grenzen")) >= 1


def test_netherlands_providers():
    """Verify Netherlands providers (Wettenbank, KVK, BAG, CBS, Data.overheid.nl)."""
    wet = WettenbankSourceProvider()
    assert wet.source_type == "wet"
    assert len(wet.search("burgerlijk")) >= 1

    kvk = KvkSourceProvider()
    assert kvk.source_type == "kvk"
    assert len(kvk.search("asml")) >= 1

    bag = BagSourceProvider()
    assert bag.source_type == "bag"
    assert len(bag.search("turfmarkt")) >= 1

    cbs = CbsSourceProvider()
    assert cbs.source_type == "cbs"
    assert len(cbs.search("cpi")) >= 1

    dataoverheid = DataOverheidSourceProvider()
    assert dataoverheid.source_type == "dataoverheid"
    assert len(dataoverheid.search("grenzen")) >= 1


def test_spain_providers():
    """Verify Spain providers (BOE, Registro Mercantil, PLACSP, Catastro, INE, Datos.gob.es)."""
    boe = BoeSourceProvider()
    assert boe.source_type == "ley"
    assert len(boe.search("datos")) >= 1

    mercantil = RegistroMercantilSourceProvider()
    assert mercantil.source_type == "empresa_es"
    assert len(mercantil.search("telefonica")) >= 1

    placsp = PlacspSourceProvider()
    assert placsp.source_type == "licitacion"
    assert len(placsp.search("cloud")) >= 1

    catastro = CatastroSourceProvider()
    assert catastro.source_type == "catastro"
    assert len(catastro.search("madrid")) >= 1

    ine = IneSourceProvider()
    assert ine.source_type == "ine_es"
    assert len(ine.search("ipc")) >= 1

    datosgob = DatosGobSourceProvider()
    assert datosgob.source_type == "datosgob"
    assert len(datosgob.search("lineas")) >= 1


def test_international_providers():
    """Verify International providers (World Bank, OECD, WHO, HUDOC/CEDH)."""
    wb = WorldBankSourceProvider()
    assert wb.source_type == "worldbank"
    assert len(wb.search("gdp")) >= 1

    oecd = OecdSourceProvider()
    assert oecd.source_type == "oecd"
    assert len(oecd.search("pisa")) >= 1

    who = WhoSourceProvider()
    assert who.source_type == "who"
    assert len(who.search("life")) >= 1

    hudoc = HudocSourceProvider()
    assert hudoc.source_type == "hudoc"
    assert len(hudoc.search("expression")) >= 1


def test_federated_providers():
    """Verify European Federated providers (BRIS, INSPIRE Address & Cadastre, Your Europe)."""
    bris = BrisFederatedSourceProvider()
    assert bris.source_type == "eu_company"
    assert len(bris.search("dinum")) >= 1

    inspire_adr = InspireAddressFederatedProvider()
    assert inspire_adr.source_type == "eu_address"
    assert len(inspire_adr.search("paris")) >= 1

    inspire_cad = InspireCadastreFederatedProvider()
    assert inspire_cad.source_type == "eu_cadastre"
    assert len(inspire_cad.search("madrid")) >= 1

    your_europe = YourEuropeSourceProvider()
    assert your_europe.source_type == "your_europe"
    assert len(your_europe.search("business")) >= 1
