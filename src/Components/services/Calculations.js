import DataService from '../services/DataService'

//DATE-FNS
import isWithinRange from 'date-fns/is_within_range'
import isDate from 'date-fns/is_date';
import isValid from 'date-fns/is_valid';
import isAfter from 'date-fns/is_after';
import isEqual from 'date-fns/is_equal';
import format from 'date-fns/format';
import areRangesOverlapping from 'date-fns/are_ranges_overlapping';
import getDate from 'date-fns/get_date';
import getMonth from 'date-fns/get_month';
import getYear from 'date-fns/get_year';


export default class Calculations {

    static getCurrentAptContracts(contracts) {  
        console.log('input del getCurrentContract', contracts)
        const date = new Date();
        let currentContracts = [];

        for ( let x = 0; x<contracts.length; x++){

            if (isWithinRange(date, contracts[x].checkIn, contracts[x].checkOut)) {
                let contract = {};
                contract.Name = contracts[x].tenantName;
                contract.Surname = contracts[x].tenantSurname;
                contract.checkIn = contracts[x].checkIn;
                contract.checkOut = contracts[x].checkOut;
                contract.rentPrice = contracts[x].rentPrice;

                currentContracts.push(contract);
            }
        }
        console.log('currentAptContract en e calculations', currentContracts)

        return currentContracts  
    }
        
 
    static getMonthsOccupationInPercentage(newStartDate, newEndDate) { 
        
        // https://stackoverflow.com/questions/4345045/javascript-loop-between-date-ranges

        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dic'];
        const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        console.log("no hay error en el book");
     
        let startDate = format(newStartDate, ['Do-MMM-YYYY']);
        let bookStartDay = getDate(startDate);   //Día (en número) del final de la reserva
        let bookStartMonth = getMonth(startDate);   //Mes (en número) del inicio de reserva
        let bookStartYear = getYear(startDate);     // Año del inicio de reserv
        

        let endDate = format(newEndDate,['Do-MMM-YYYY']);
        let bookEndDay = getDate(endDate);       //Día (en número) del inicio de la reserva
        let bookEndMonth = getMonth(endDate);    //Mes (en número) del final de la reserva
        let bookEndYear = getYear(endDate);      // Año del final de la reserva


        let newBookingDays = {
            currentYear: [0,0,0,0,0,0,0,0,0,0,0,0],
            nextYear:[0,0,0,0,0,0,0,0,0,0,0,0]
        };

        if(bookStartYear == bookEndYear){

            for (let i = bookStartMonth; i<= bookEndMonth; i++){
                if (i == bookStartMonth){
                newBookingDays.currentYear[i] = Math.round((((days[i]-bookStartDay)/days[i])*100))
                } else if (i === bookEndMonth){             
                    newBookingDays.currentYear[i] = Math.round(((bookEndDay/days[i])*100))
                } else if (bookStartMonth < i && i < bookEndMonth){
                    newBookingDays.currentYear[i] = 100;
                }else {
                    newBookingDays[i] = 0;
                }
            };

            return newBookingDays;

        } else if ( bookStartYear < bookEndYear){

            for (let j = bookStartMonth; j<= 11; j++){
                if (j == bookStartMonth){
                    newBookingDays.currentYear[j] = Math.round((((days[j]-bookStartDay) /days[j])*100))
                } else {
                    newBookingDays.currentYear[j] = 100;
                }
            }

            for (let k = 0; k<= bookEndMonth; k++){
                if (k < bookEndMonth){
                    newBookingDays.nextYear[k] = 100;
                } else if (k === bookEndMonth){             
                    newBookingDays.nextYear[k] = Math.round(((bookEndDay/days[k])*100))
                }
            }

            return newBookingDays;
        };

        
       
    };

    static generateCode(){
     // GENERATE BOOKING CODE
     const letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
     let codeArray = [];

     for (let l=0; l<4; l++){
        let capital = Math.round(Math.random()*10);
        let random = Math.round(Math.random()*26);

        if(Number.isInteger(capital/2)){
            codeArray[l]=(letters[random]).toUpperCase();
        } else {
            codeArray[l]=letters[random];
        }
     }

     let d = new Date();
     let t = d.getTime().toString().slice(-8);  // el bookCode = milisegundos

     let code = codeArray.join("").concat(t);

     // CHECK POINT
     // console.log('El code generado es: ', code

     return code
     
    }

    static bookingsDatesValidation(newStartDate, newEndDate){
        
        let startDate = new Date(newStartDate);
        let endDate = new Date(newEndDate);
       
        if(!isDate(startDate)){
             let validationResult = {
                error : true,
                message : 'Start Date Error'
            }
            return validationResult
            
        };

        if(!isDate(endDate)){
            let validationResult = {
                error : true,
                message : 'The end Date is not valid'
            }

            return validationResult
        };

        if(isAfter(newStartDate, newEndDate) ){
            let validationResult = {
                error : true,
                message : 'End date must be greater than Start Date'
            }

            
            return validationResult

        };

        // if(areRangesOverlapping(startDate, endDate, this.state.currentBookStartDate,  this.state.currentBookEndDate)){
        //     let validationResult = {
        //         error : true,
        //         message : 'The range overlaps with a BOOKED range'
        //     }
        //     return validationResult 
        // };
        
        let validationResult = {
                error : false,
                message : "Dates are OK"
        }

        return validationResult
    }
}