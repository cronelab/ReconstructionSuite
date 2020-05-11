mri = MRIread('brain.mgz');
VoxVal = [74 61 166 0];
IntRas = VoxVal * mri.tkrvox2ras';
% CenterRAS = IntRas + [mri.c_r mri.c_a mri.c_s 0];
IntRas(2) = IntRas(2)*-1;
Rasval = IntRas + [128 128 128 0]
