import pytest
from blender_addon_tester.addon_helper import get_version


@pytest.mark.usefixtures('bpy_module')
def test_versionID_pass(bpy_module):
    expect_version = (2, 8, 2)
    return_version = get_version(bpy_module)

    # major and minor releases should be the same
    assert return_version[0] == expect_version[0]
    assert return_version[1] == expect_version[1]
    assert return_version[2] >= expect_version[2]

