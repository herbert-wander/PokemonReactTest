import './styles.css';
import pokemonLogoSVG from '/src/images/pokemonLogo.svg';
import { useState } from 'react';
import { useEffect } from 'react';

export function PresentationTextCard({ titleText, isCaseSense, textContent, highlightTerm, highLightAll })
{
    const [formatedTitle, setFormatedTitle] = useState(<div></div>);
    useEffect(() =>
    {
        let termPos = isCaseSense ? titleText.indexOf(highlightTerm) : titleText.toLowerCase().indexOf(highlightTerm.toLowerCase());
        let endSring;
        let componentResult;
        if (termPos != -1) 
        {
            let inBetweenText = "";
            let firstWordOffset = -1;
            do 
            {
                let formatedHighlighBundle = formatWordBreak(titleText, termPos);
                endSring = titleText.substring(termPos + highlightTerm.length + formatedHighlighBundle.wordEndLenght);
                if (firstWordOffset == -1) 
                {
                    firstWordOffset = termPos - formatedHighlighBundle.wordStartLenght;
                }
                componentResult = <>{componentResult}{inBetweenText}{formatedHighlighBundle.reactObject}</>;
                if (highLightAll) 
                {
                    let lastPos = termPos;
                    termPos = isCaseSense ? titleText.indexOf(highlightTerm, termPos + highlightTerm.length + formatedHighlighBundle.wordEndLenght) : titleText.toLowerCase().indexOf(highlightTerm.toLowerCase(), termPos + highlightTerm.length + formatedHighlighBundle.wordEndLenght);
                    inBetweenText = titleText.substring(lastPos + highlightTerm.length + formatedHighlighBundle.wordEndLenght, termPos);
                }
            } while (highLightAll && termPos > -1);
            componentResult = <>{titleText.substring(0, firstWordOffset)}{componentResult}</>;
        }
        else
        {
            componentResult = titleText;
        }
        componentResult = <>{componentResult}{endSring}</>
        setFormatedTitle(componentResult);
    }, []);

    function formatWordBreak(strToCheck, pos) 
    {
        let wordStartPart = "";
        let wordEndPart = "";
        let componentResult;
        if (pos > 0) 
        {
            if (strToCheck[pos - 1] != " ")
            {
                wordStartPart = strToCheck[pos - 1];
                let index = pos - 2;
                while (index >= 0 && strToCheck[index] != " ") 
                {
                    wordStartPart += strToCheck[index];
                    index--;
                }
            }
        }
        componentResult = <>{wordStartPart.split("").reverse()}<span className="yellowHighLight">{strToCheck.substring(pos, pos + highlightTerm.length)}</span></>;
        if (pos + 1 < strToCheck.length) 
        {
            if (strToCheck[pos + 1] != " ")
            {
                wordEndPart = strToCheck[pos + 1];
                let index = pos + 2;
                while (index < strToCheck.length && strToCheck[index] != " ") 
                {
                    wordEndPart += strToCheck[index];
                    index++;
                }
            }
            if (highLightAll) 
            {
                let extraHighLighPos;
                let lastPos = -1;
                let inBetweenText;
                do 
                {
                    extraHighLighPos = isCaseSense ? wordEndPart.indexOf(highlightTerm) : wordEndPart.toLowerCase().indexOf(highlightTerm.toLowerCase());
                    if (extraHighLighPos > -1) 
                    {
                        inBetweenText = wordEndPart.substring(lastPos, extraHighLighPos);
                        componentResult = <>{componentResult}{inBetweenText} < span className="yellowHighLight" > {wordEndPart.substring(extraHighLighPos, highlightTerm.length)}</span ></>;
                        lastPos = extraHighLighPos;
                        extraHighLighPos = wordEndPart.substring(lastPos + highlightTerm.length).indexOf(highlightTerm);
                        inBetweenText = wordEndPart.substring(lastPos + highlightTerm.length, extraHighLighPos);
                    }
                } while (extraHighLighPos > -1);
                componentResult = <>{componentResult}{wordEndPart.substring(highlightTerm.length + lastPos)}</>;
                //console.log(wordEndPart.substring(extraHighLighPos, highlightTerm.length));
            }
            else
            {
                componentResult = <>{componentResult}{wordEndPart}</>;
            }
        }
        componentResult = <div className="nobr">{componentResult}</div>
        return { reactObject: componentResult, wordStartLenght: wordStartPart.length, wordEndLenght: wordEndPart.length };
    }

    return (
        <div>
            <h1>{formatedTitle}</h1>
            <p>{textContent}</p>
        </div>
    );
}