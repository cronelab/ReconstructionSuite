function mgridConverter(a)
elec = read_bioimage_mgrid(sprintf('/home/chris/Subjects/%s/electrodes/%s.mgrid',a, 'elecs'))
electrodes.position = elec.elecpos;
electrodes.label = elec.label;
save(sprintf('/home/chris/Subjects/%s/electrodes/electrodes.mat',a),'electrodes')
end