import os
import platform

import numpy as np
import pytest


@pytest.fixture
def freesurfer_env(monkeypatch):
    
    # set temporary paths for the FREESURFER subject dir
    monkeypatch.setenv("BIDS_ROOT", str(tmpdir))



@pytest.fixture
def bpy_module(cache):
    return cache.get("bpy_module", None)