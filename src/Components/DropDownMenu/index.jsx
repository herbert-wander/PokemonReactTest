import './styles.css';
import { useState } from 'react';

export function DropDownMenu({ options, menuLabel })
{
    const [optBoxClassCycle, setOptBoxClassCycle] = useState(0);
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

    return (
        <div className="dropDownMenu">
            <span onClick={handleOptBoxView}>{menuLabel}<img src="/src/images/dropDownArrow.svg" alt="" /></span>
            <fieldset className={handleCssClassSwitch("", "showOptions", "removeOptions")}>
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