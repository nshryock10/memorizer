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

    const totalLength = Math.min(answerArry.length, legendArry.length);

    for(let i=0; i < totalLength; i++){

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

    const accuracy = Math.round((correct / (legendArry.length) ) * 100);

    return [answerArry, legendArry, accuracy]

}

export const getLegend = () => {
 return [{
            id: 1,
            queue: 'Faith',
            legend: 'I have been crucified with Christ. It is no longer I who live, but Christ who lives in me. And the life I now live in the flesh I live by faith in the Son of God, who loved me and gave himself for me. Galatians 2:20',
            category: 'mentor group'
         },
         {
            id: 2,
            queue: 'First',
            legend: 'But seek first his kingdom and his righteousness',
            category: 'mentor group'
         },
         {
            id: 3,
            queue: 'Abba Father',
            legend: 'God sent the spirit of his son, the spirit that calls out Abba Father',
            category: 'mentor group'
         }
        ]
}