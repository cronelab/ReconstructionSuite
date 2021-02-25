import { Color } from "three";


const modifySize = (electrodeObject, size) => {
  electrodeObject.scale.set(size,size,size);
}
const modifyColor = (electrodeObject, color) => {
  let clone = electrodeObject.material.clone();
  clone.color = new Color(color)
  electrodeObject.material = clone;
  electrodeObject.material.name = `${electrodeObject.name}_color`
}


  // fetch(`/anatomy/${props.activeSubject}`)
  //   .then((response) => response.json())
  //   .then((text) => {
  //     let data = text.map((element) => {
  //       return {
  //         name: element[0],
  //         location: element[4],
  //       };
  //     });
  //     setLabels(data);
  //   });
  

export {
    modifySize,
    modifyColor
}