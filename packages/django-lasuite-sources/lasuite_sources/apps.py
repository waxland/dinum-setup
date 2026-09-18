"""Django AppConfig for lasuite_sources."""

from django.apps import AppConfig


class LaSuiteSourcesConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "lasuite_sources"
    verbose_name = "La Suite Sources Souveraines"

    def ready(self):
        # Auto-import providers to trigger registration
        import lasuite_sources.providers  # noqa: PLC0415 - registration requires the app registry to be ready
