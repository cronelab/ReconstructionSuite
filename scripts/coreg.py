
# For CT to MRI registration
from nipy.core.api import AffineTransform
import nipy.algorithms
import nipy.algorithms.resample
import nipy.algorithms.registration.histogram_registration
import os
import sys


def main(patient='PY', source='CT.nii', target='orig.mgz', smooth=0., reg_type='rigid', interp='pv', xtol=0.0001, ftol=0.0001):
    '''Runs nmi coregistration between two images.
    Parameters are arguments for nipy.algorithms.registration.histogram_registration.HistogramRegistration
    (for more information, see help for nipy.algorithms.registration.optimizer).
    Parameters
    ----------
    smooth : float
        a smoothing parameter in mm
    reg_type : {'rigid', 'affine'}
        Registration type
    interp : {'pv','tri'} 
        changes the interpolation method for resampling
    xtol : float
        tolerance parameter for function minimization
    ftol : float
        tolerance parameter for function minimization
    '''
    subjDir = "{dir}{patient}".format(
        dir=os.environ['SUBJECTS_DIR'], patient=patient)
    ctimg = nipy.load_image("{dir}/CT/CT.nii".format(dir=subjDir))
    mriimg = nipy.load_image("{dir}/mri/orig.mgz".format(dir=subjDir))

    ct_cmap = ctimg.coordmap
    mri_cmap = mriimg.coordmap

    # Compute registration
    ct_to_mri_reg = nipy.algorithms.registration.histogram_registration.HistogramRegistration(
        ctimg, mriimg, similarity='nmi', smooth=smooth, interp=interp)
    aff = ct_to_mri_reg.optimize(reg_type).as_affine()

    ct_to_mri = AffineTransform(
        ct_cmap.function_range, mri_cmap.function_range, aff)
    reg_CT = nipy.algorithms.resample.resample(
        ctimg, mri_cmap, ct_to_mri.inverse(), mriimg.shape)

    nipy.save_image(reg_CT, "{dir}/CT/rCT.nii".format(dir=subjDir))


if __name__ == "__main__":
    main(sys.argv[1])
