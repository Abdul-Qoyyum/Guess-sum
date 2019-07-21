import React from 'react';
import './App.css';
import classnames from 'classnames';

class Quiz extends React.Component{ 

  constructor(props) {
    super(props);

    let data = this.playGame();

    this.state = {
      ...data,
      correct: false,
      wrong: false,
      gameOver: false
    };

    this.sendAns = this.sendAns.bind(this);
    this.renderMessage = this.renderMessage.bind(this);
    this.startAgain = this.startAgain.bind(this);
  }

  randomNumber = (min, max) => {
    return Math.floor(Math.random() * max - min + 1) + min;
  }

  generateRandomNumbers = (sum) => {
    let randomValue = [];
    let randomArray = [];

    while (randomArray.length <= 3) {
      let randomElement = this.randomNumber(1, 19);
      if (randomArray.indexOf(randomElement) > -1) {
        continue
      };
      randomArray.push(randomElement);
    }

    for (let i = 0; i < 3; i++) {
      let randomFlag = this.randomNumber(0, 1);
      let result = sum;
      if (randomFlag === 1) {
        result += randomArray[i];
        randomValue.push(result);
      } else {
        result -= randomArray[i];
        randomValue.push(result);
      }
    }

    return randomValue;
  }



  playGame = () => {

    let field1 = this.randomNumber(20, 50);
    let field2 = this.randomNumber(20, 50);
    let answer = field1 + field2;
    let randomOptions = this.generateRandomNumbers(answer);
    randomOptions.push(answer);
    randomOptions.sort((a, b) => 0.5 - Math.random());
    
    let riddle = {
      field1,
      field2,
      answer: field1 + field2,
        array_fields: randomOptions
    }
    
    if(this.state && this.state.correct ){

     this.setState({
       field1,
       field2,
       answer: field1 + field2,
       array_fields: randomOptions
     });

    }else{
      return riddle;
    }

  }




 //i think props is the event object for component... Quiz function...
 sendAns(e){
    let ans = e.target.innerHTML;
        
    ans = parseInt(ans, 10);

    if(this.state.answer === ans){
      // console.log(`clicked correct answer ${ans}`);
       this.setState({
         correct: true,
         gameOver: false
       })
      
     }else{
       //console.log(`clicked wrong answer ${ans} !`);
       
       this.setState(
           {
             wrong: true,
             gameOver: false
           }
       );
      
      }

      
   }
 
renderMessage = () => {
   if(this.state.correct){

    return(
        <p>Right answer</p>
      );
   }else{
     
     return(
         <p>Wrong answer</p>   
       );
   }
  }

startAgain = () => {
    this.playGame();
    this.setState({
      correct: false,
      wrong: false,
      gameOver: false
    });
} 

 render(){
    return( 

      <div className="Container">

        <p>What is the sum of <span>{this.state.field1}</span> and <span>{this.state.field2}</span> ?</p>
        <div className='options'>
          {this.state.array_fields.map((options, id) => <div  onClick={this.sendAns} className="animated zoomInUp"  key={id}>{options}</div>)}
        </div>
        
        <div className={classnames('after',{'correct animated zoomInDown': this.state.correct},{'wrong animated zoomInUp': this.state.wrong})}>{this.renderMessage()}</div>        
        <div className="playAgain" onClick={this.startAgain}><button className="submitButton">Play again</button></div>
        
      </div>
    );
    }

  }




export default Quiz;