import './styles.css';
import { useState } from 'react';
import dropDownArrowSVG from '/src/images/dropDownArrow.svg'

export function DropDownMenu({ options, menuLabel })
{
    const [optBoxClassCycle, setOptBoxClassCycle] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState({});

    function handleOptBoxView()
    {
        setOptBoxClassCycle(prevState =>
        {
            if (prevState == 0 || prevState == 2) 
            {
                return 1;
            }
            else if (prevState == 1)
            {
                return 2;
            }

        });
    }
    function handleCssClassSwitch(initialClass, activeStatusClass, restartClass)
    {
        if (optBoxClassCycle == 0) 
        {
            return initialClass;
        }
        else if (optBoxClassCycle == 1) 
        {
            return activeStatusClass;
        }
        else
        {
            return restartClass;
        }
    }
    function handleMenuSelection(element) 
    {
        setSelectedOptions(prevState => prevState[element.value] = element.checked)
    }
    function searchByType(params) 
    {
        //Reorganizar o fetch pra padronizar numa func só que seja de uma forma mais generalista    
    }
    return (
        <div className="dropDownMenu">
            <span onClick={handleOptBoxView}>{menuLabel}<img src={dropDownArrowSVG} alt="" /></span>
            <fieldset className={handleCssClassSwitch("", "showOptions", "removeOptions")} onChange={e => handleMenuSelection(e.target)} >
                {
                    options.length <= 1 ? <span>{options[0]}</span> : options.map(value =>
                        <div className="boxOptionDropMenu" key={menuLabel + value.name + "OptBox"}>
                            <input type="checkbox" id={menuLabel + value.name + "Opt"} value={value.name} />
                            <label htmlFor={menuLabel + value.name + "Opt"}>{value.name}</label>
                        </div>
                    )
                }
            </fieldset >
        </div>
    )
}