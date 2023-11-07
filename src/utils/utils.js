const convertToArry = (text) => {

    //loop through text and push an object with each single word and correcy key (t/f)
        //remove all punctuation
        const noPunc = text.replace(/[.,\/#!$%\^&\*;{}=\-_`~()]/g,"");
        //console.log(noPunc)
        const removeSpace = noPunc.replace(/\s{2,}/g," ");
        //console.log(removeSpace)
        const allLower = removeSpace.toLowerCase();
        //console.log(allLower)

        let finalArry = []; //array to put string in an object for each word

        const stringSplit = allLower.split(" "); //split sentence into words separated by spaces
        for(let i=0; i < stringSplit.length; i++){
            finalArry.push({
                word: stringSplit[i],
                className: null,
            })
        }
        return finalArry;
}

export const scoreAnswer = ( answer, legend ) => {
    const answerArry = convertToArry(answer);
    const legendArry = convertToArry(legend);
    let correct = 0;
    let incorrect = 0;

    for(let i=0; i < legendArry.length; i++){

        

        //check if first words match
        if(legendArry[i].word == answerArry[i].word){
            //if they match count answer correct
            legendArry[i].className = 'correct';
            answerArry[i].className = 'correct';
            correct++;
        }else if(legendArry[i + 1] === answerArry[i]){ //check if word mathes next legend word
            //count i incorrect for word
            //count i + 1 correct
            //move i forward 
        }else{
            legendArry[i].className = 'incorrect';
            answerArry[i].className = 'incorrect';
            incorrect++;
        }

        //check if word matches next 2 legend words

        //check if word matches previous legend word

        //else count i incorrect

    }

    const accuracy = Math.round((correct / (incorrect + correct) ) * 100);

    return [answerArry, legendArry, accuracy]

}

export const getLegend = () => {
 return 'I have been crucified with Christ. It is no longer I who live, but Christ who lives in me. And the life I now live in the flesh I live by faith in the Son of God, who loved me and gave himself for me. Galatians 2:20'
}

export const getAnswer = () => {
    return 'i have been crucified in christ. it is no longer i who live but christ who lives in me. and this life I now live in the flesh i live by faith in the son of god who loved me and gave himself for me. galatians 2:20'
}