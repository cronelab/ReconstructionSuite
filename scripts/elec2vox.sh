#!/bin/bash

echo "RAS            Electrode    Label" >> test.txt

while IFS=$'\t' read -r -a myArray; do
    
    x=$(printf "%1.0f" "${myArray[3]}")
    y=$(printf "%1.0f" "${myArray[4]}")
    z=$(printf "%1.0f" "${myArray[5]}")
    seg=$(mri_info $SUBJECTS_DIR/$1/mri/aparc+aseg.mgz --voxel $x $y $z)
    segment=$(printf "%1.0f" "${seg}")
    
    while IFS=" " read -a line; do
        # echo "${line[0]}"
        # echo "${line[1]}"
        labelIndex=$(printf "%1.0f" ${line[0]})
        if [ "$segment" -eq "$labelIndex" ]; then
            echo $x $y $z "    " "${myArray[2]}" "    " ${line[1]} >> $SUBJECTS_DIR/$1/electrodes/electrodeLocations.txt
        fi
        
        
        
        
    done < LUT.txt
    
done < $SUBJECTS_DIR/$1/electrodes/electrodes.txt

