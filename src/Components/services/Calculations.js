import DataService from '../services/DataService'

//DATE-FNS
import isWithinRange from 'date-fns/is_within_range'
import isDate from 'date-fns/is_date';
import isAfter from 'date-fns/is_after';
import isEqual from 'date-fns/is_equal';
import format from 'date-fns/format';
import getDate from 'date-fns/get_date';
import getMonth from 'date-fns/get_month';
import getYear from 'date-fns/get_year';
import areRangesOverlapping from 'date-fns/are_ranges_overlapping';



export default class Calculations {

    static getCurrentAptContracts(contracts) {  
        const date = new Date();
        let currentContracts = [];

        for ( let x = 0; x<contracts.length; x++){

            if (isWithinRange(date, contracts[x].checkIn, contracts[x].checkOut)) {
                let contract = {};
                contract.apartmentCode          = contracts[x].apartmentCode;
                contract.tenantName             = contracts[x].tenantName;
                contract.tenantSurname          = contracts[x].tenantSurname;
                contract.checkIn                = contracts[x].checkIn;
                contract.checkOut               = contracts[x].checkOut;
                contract.rentPrice              = contracts[x].rentPrice;

                currentContracts.push(contract);
            }
        }
        return currentContracts  
    };
    static getCurrentRoomsContracts(contracts) {  
        
        const date = new Date();
        let currentRoomsContracts = [];
        console.log('input del get CurrentRoomsContracts', contracts)
        for ( let x = 0; x<contracts.length; x++){

            if (isWithinRange(date, contracts[x].checkIn, contracts[x].checkOut)) {
                let contract = {};
                contract.roomCode               = contracts[x].roomCode;
                contract.tenantName             = contracts[x].tenantName;
                contract.tenantSurname          = contracts[x].tenantSurname;
                contract.checkIn                = contracts[x].checkIn;
                contract.checkOut               = contracts[x].checkOut;
                contract.rentPrice              = contracts[x].rentPrice;

                currentRoomsContracts.push(contract);
            }
        }
        console.log('currentRoomsContract en calculations', currentRoomsContracts)

        return currentRoomsContracts  
    };
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

        if(bookStartYear === bookEndYear){

            for (let i = bookStartMonth; i<= bookEndMonth; i++){
                if (i === bookStartMonth){
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
                if (j === bookStartMonth){
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
    static getCurrentMonth(){
        let months  =  ['Januay', 'February', 'March', 'April','May', 'June', 'July', 'August','September', 'October', 'November', 'December'];
        const date = new Date();
        let monthNr = date.getMonth()
        let currentMonth = months[monthNr]
       
        return currentMonth
    }

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
     
    };
    static bookingsDatesValidation(newStartDate, newEndDate){
        
        let startDate = new Date(newStartDate);
        let endDate = new Date(newEndDate);  
       
        if(!isDate(startDate)){
             let validationResult = {
                error : true,
                message : 'Check-In date Error'
            }
            return validationResult
            
        };

        if(!isDate(endDate)){
            let validationResult = {
                error : true,
                message : 'Check-Out date Error'
            }

            return validationResult
        };

        if(isAfter(newStartDate, newEndDate) ){
            let validationResult = {
                error : true,
                message : 'Check-Out date must be greater than Check-in Date'
            }
            return validationResult
        };

        if(isEqual(newStartDate, newEndDate) ){
            let validationResult = {
                error : true,
                message : 'Check-Out date must be greater than Check-in Date'
            }
            return validationResult
        }

        let validationResult = {
            error : false,
            message : "Dates are OK"
        }

        return validationResult
        
    };
    static overlappingCheck(checkIn, checkOut, bookings){
        for (let k=0; k < bookings.length; k++){
            if(areRangesOverlapping(checkIn, checkOut, bookings[k].checkIn, bookings[k].checkOut )){
                let validationResult = {
                    error : true,
                    message : 'The range overlaps with other BOOKING'
                }
                return validationResult 
            };
        }
        
        let validationResult = {
            error : false,
            message : "Dates are OK"
        }

        return validationResult
       
    };
    static calculateIncomes(x){
        // console.log('calculate incomes TRIGGERED');
        let incomes = 0;
    
        for (let f = 0; f < x.length; f++){
          incomes = incomes + Number(x[f].rentPrice);
        }
    
        return incomes
    };
    static calculateMonthUtilities(x){
        console.log('utilities received = ', x)
        const date = new Date();
        let currentM = date.getMonth();
        let totalUtilities = 0;
        for (let i = 0; i < x.length; i++){
            console.log('utility Date = ', x[i].utilityDate)
            let utDate= new Date(x[i].utilityDate);
            let utMonth = utDate.getMonth();
            console.log('utMonth = ', utMonth, ' currentM = ', currentM)
            if (utMonth === currentM){
                 totalUtilities = totalUtilities + Number(x[i].amount);
            };
        }
        return totalUtilities
    }
    static mergeApartmentsRooms(apts, rms){
        console.log('merge apts & rooms TRIGGERED');
        for (let x = 0; x < apts.length; x++){
          apts[x].rooms = [];
    
          for (let z = 0; z < rms.length; z++){
            //   console.log('apts[x].id = ', apts[x].id);
            //   console.log('rms[z].apartmentCode = ', rms[z].apartmentCode);
            if (apts[x].id === rms[z].apartmentCode){
              apts[x].rooms.push(rms[z])
            }
          }
        }
        console.log('apartments with rooms: ', apts)   

        return apts
    };

}