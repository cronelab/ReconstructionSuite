#!/bin/bash

currentElecLabel=_
prevX=0
prevY=0
prevZ=0
while IFS=$'\t' read -r -a myArray; do
	x=$(printf "%.01f" "${myArray[3]}")
	y=$(printf "%.01f" "${myArray[4]}")
	z=$(printf "%.01f" "${myArray[5]}")
	z_=$(echo "256 - $z" | bc -l)

	seg=$(mri_info $SUBJECTS_DIR/$SUBJECT/mri/aparc+aseg.mgz --voxel $x $y $z_)	
	segment=$(printf "%1.0f" "${seg}")

	while IFS=" " read -a line; do
		labelIndex=$(printf "%1.0f" ${line[0]})
		if [ "$segment" -eq "$labelIndex" ]; then
			echo $x $y $z_ "    " "${myArray[2]}" "    " ${line[1]} >>$SUBJECTS_DIR/$SUBJECT/electrodes/anatomicalLocations.txt
		fi
	done <LUT.txt


	if [ "$currentElecLabel" != ${myArray[2]} ]; then
		_averageX=`echo "($prevX+$x)/2" | bc -l`
		_averageY=`echo "($prevY+$y)/2" | bc -l`
		_averageZ=`echo "($prevZ+$z_)/2" | bc -l`
		averageX=$(printf "%.01f" "$_averageX")
		averageY=$(printf "%.01f" "$_averageY")
		averageZ=$(printf "%.01f" "$_averageZ")
		prevX=$x
		prevY=$y
		prevZ=$z_
		averageElectrode="$currentElecLabel"_"${myArray[2]}"
		currentElecLabel=${myArray[2]}
	fi 

	
	avgSeg=$(mri_info $SUBJECTS_DIR/$SUBJECT/mri/aparc+aseg.mgz --voxel $averageX $averageY $averageZ)
	avgSegment=$(printf "%1.0f" "${avgSeg}")

	while IFS=" " read -a line; do
		labelIndex=$(printf "%1.0f" ${line[0]})
		if [ "$avgSegment" -eq "$labelIndex" ]; then
			echo $averageX $averageY $averageZ "    " "$averageElectrode" "    " ${line[1]} >>$SUBJECTS_DIR/$SUBJECT/electrodes/anatomicalLocations.txt
		fi
	done <LUT.txt




done <$SUBJECTS_DIR/$SUBJECT/electrodes/electrodes.txt