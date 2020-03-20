/*
? The View Port Percentage Lengths
* VW = 1% view width
* VH = 1% view height
* vmin is the smaller of the two at that moment
* vmax is the opposite
* % is based on the parent measurement of the same name
*/ 

const elements = ['screenWidth','screenHeight','value','unit','output','button','save'].map(name=>document.getElementById(name));
const [screenWidth , screenHeight , value , unit , output, button] = elements

const CalculateVW =         (width,height,value) => value / (width/100);
const CalculateVH =         (width,height,value) => value / (height/100);
const CalculateVMAX =       (width,height,value) => value / ((width<height?width:height)/100);
const CalculateVMIN =       (width,height,value) => value / ((width>height?width:height)/100);
const CalculatePercentage = (width,height,value) => parentValue / value;

const formulas = {
    "vh":CalculateVH,
    "vw":CalculateVW,
    "vmax":CalculateVMAX,
    "vmin":CalculateVMIN,
    "%":CalculatePercentage
}
const savePreset = (e) =>{
    e.preventDefault();
    let preset = {};
    [screenWidth,screenHeight,unit].forEach(el=> preset[el.id]=el.value);
    localStorage.setItem('preset',JSON.stringify(preset));
    console.log('Preset Saved!',preset);
}
const handleClick = (e) =>{ 
    e.preventDefault();
    output.value = formulas[unit.value](screenWidth.value,screenHeight.value,value.value)
}
const loadPreset = () =>{
    const preset =localStorage.getItem('preset');
    const presetObj = JSON.parse(preset);
    if(preset)[screenWidth,screenHeight,unit].forEach(el=>el.value = presetObj[el.id]);
}
button.addEventListener('click',handleClick);
save.addEventListener('click',savePreset);
window.addEventListener('load',loadPreset);