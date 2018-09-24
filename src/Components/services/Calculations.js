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

    static getCurrentContract(bookings) {  

        let date = new Date();

        for ( x in bookings){

            if (isWithinRange(date, bookings.startDay, bookings.endDay)){
                return bookings.bookingCode
            }

        }
       
    };
 
    static getMonthsOccupationInPercentage(newStartDate, newEndDate) {  

        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dic'];
        const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        console.log("no hay error en el book");
     
        NewstartDate = format(newStartDate, ['Do-MMM-YYYY']);
        let bookStartDay = getDate(newStartDate);   //Día (en número) del final de la reserva
        let bookStartMonth = getMonth(newStartDate);   //Mes (en número) del inicio de reserva
        let bookStartYear = getYear(newStartDate);     // Año del inicio de reserv
        

        NewkEndDate = format(newEndDate,['Do-MMM-YYYY']);
        let bookEndDay = getDate(newEndDate);       //Día (en número) del inicio de la reserva
        let bookEndMonth = getMonth(newEndDate);    //Mes (en número) del final de la reserva
        let bookEndYear = getYear(newEndDate);      // Año del final de la reserva


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
     let code = [];

     for (let l=0; l<4; l++){
        let capital = Math.round(Math.random()*10);
        let random = Math.round(Math.random()*26);

        if(Number.isInteger(capital/2)){
            code[l]=(letters[random]).toUpperCase();
        } else {
            code[l]=letters[random];
        }
     }

     let d = new Date();
     let t = d.getTime().toString().slice(-8);  // el bookCode = milisegundos

     let code = code.join("").concat(t);

     // CHECK POINT
     // console.log('El code generado es: ', code

     return code
     
    }

    static bookingsDatesValidation(newStartDate, newEndDate){
        let newStartDate = new Date(this.state.newStartDate);
        let newEndDate = new Date(this.state.newEndDate);
       
        if(!isDate(newStartDate)){
             validationResult = {
                error : true,
                message : 'Start Date Error'
            }
            return validationResult
            
        };

        if(!isValid(newEndDate)){
            validationResult = {
                error : true,
                message : 'The end Date is not valid'
            }

            return validationResult
        };

        if(!isAfter(newEndDate, newStartDate) || isEqual(newEndDate, newStartDate)){
            validationResult = {
                error : true,
                message : 'End date must be greater than Start Date'
            }

            return validationResult

        };

        if(areRangesOverlapping(newStartDate, newEndDate, this.state.currentBookStartDate,  this.state.currentBookEndDate)){
            validationResult = {
                error : true,
                message : 'The range overlaps with a BOOKED range'
            }
            return validationResult 
        };
    }
}