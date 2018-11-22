import firebase from 'firebase';

export default class DataService {

    // USERS 
    static saveUserInfoInFirestore(userId, userToSave)
        {  //registro en Firebase
            console.log("el user recibido en el registro firestore es:", userId)
            console.log("el userToSave recibido en firestore es: ", userToSave)
        return new Promise((resolve, reject) => {

            firebase.firestore().collection('users').doc(userId).set(userToSave)
            .then((result) => {
                
                console.log("User information succesfully saved !")
                resolve(result);
            })

            .catch((error) => {
                var errorCode = error.code;
                console.log('User NOT added: ', errorCode);
                var errorMessage = error.message;
                
            })
            
        });
    };
    static getUserContactInfo(userId){

        return new Promise((resolve, reject) => {

            firebase.firestore().collection('users').doc(userId).get()

            .then((result) => {
                resolve(result.data());   // OBTENGO TODO LO QUE TENGO ALMACENADO DE ÉSTE USUARIO
            })
            .catch((error) => {
                reject('Usuario no existe');
            })
            
        });
    };

    // APARTMENTS
    static addNewApartment(apartmentInfo) {  

        return new Promise((resolve, reject) => {

            firebase.firestore().collection('apartments').add(apartmentInfo)

            .then((result) => {
                
                console.log("Apartment-info succesfully saved !")
                resolve(result);
            })

            .catch((error) => {
                var errorCode = error.code;
                console.log('Apartment NOT added: ', errorCode);
                var errorMessage = error.message;
                
            })
            
        });
    };
    static getUserApartments(userId){
        return new Promise((resolve, reject) => {

            firebase.firestore().collection('apartments').where(`userId`,`==`, userId).get()
            .then((result) => {
            
                let apts=[];
                result.docs.forEach((d) => {
                    let j = d.data();
                    j.id=d.id;
                    apts.push(j);
                })
                
                resolve(apts);  
            })

            .catch((error) => {
               console.log('error: ', error)
                // reject('Usuario no existe', error)

            })
            
        });
    };
    static getUserAptContracts(userId){
        
        return new Promise((resolve, reject) => {

            firebase.firestore().collection('apt_bookings').where(`userId`,`==`, userId).get() // Where me devuelve todos los rooms que tengan ese userId
            .then((result) => {
                //console.log('el Result del getUserContracts', result);
                let userContracts=[];
                result.docs.forEach((d) => {
                    let j = d.data();
                    j.id=d.id;
                    userContracts.push(j);
                })
                
                resolve(userContracts);  
                //console.log('el resume userContracts), ', userContracts)

            })

            .catch((error) => {
               console.log('error: ', error)
                // reject('Usuario no existe', error)

            })
            
        });
    }
    static getApartmentInfo(apartmentCode){
        return new Promise((resolve, reject) => {

            firebase.firestore().collection('apartments').doc(apartmentCode).get()

            .then((result) => {
                resolve(result.data());   // OBTENGO TODO LO QUE TENGO ALMACENADO DE ÉSTE USUARIO
            })

            .catch((error) => {
                
                reject('Usuario no existe');

            })
            
        });
    };

    // ROOMS
    static addNewRoom(roomInfo) { 

        return new Promise((resolve, reject) => {

            firebase.firestore().collection('rooms').add(roomInfo)
            .then((result) => {
                
                console.log("Room info succesfully saved !")
                resolve(result);
            })

            .catch((error) => {
                var errorCode = error.code;
                console.log('Room NOT added: ', errorCode);
                var errorMessage = error.message;
                
            })
            
        });
    };
    static getUserRooms(userId){
        //console.log('El userID recibido en DataService.get apts: ', userId)
        return new Promise((resolve, reject) => {

            firebase.firestore().collection('rooms').where(`userId`,`==`, userId).get() // Where me devuelve todos los rooms que tengan ese userId
            .then((result) => {
            
                let rooms=[];
                result.docs.forEach((d) => {
                    let j = d.data();
                    j.id=d.id;
                    rooms.push(j);
                })
                
                resolve(rooms);  
                //console.log('el resume get-Apartments), ', apts)

            })

            .catch((error) => {
               console.log('error: ', error)
                // reject('Usuario no existe', error)

            })
            
        });
    };
    static getUserRoomsContracts(userId){
        
        return new Promise((resolve, reject) => {

            firebase.firestore().collection('room_bookings').where(`userId`,`==`, userId).get() // Where me devuelve todos los rooms que tengan ese userId
            .then((result) => {
                //console.log('el Result del getUserContracts', result);
                let userRoomsContracts=[];
                result.docs.forEach((d) => {
                    let j = d.data();
                    j.id=d.id;
                    userRoomsContracts.push(j);
                })
                
                resolve(userRoomsContracts);  
                //console.log('el resume userContracts), ', userContracts)

            })

            .catch((error) => {
               console.log('error: ', error)
                // reject('Usuario no existe', error)

            })
            
        });
    }
    static getApartmentRooms(apartmentCode){

        return new Promise((resolve, reject) => {

            firebase.firestore().collection('rooms').where(`apartmentCode`,`==`, apartmentCode).get() // Where me devuelve todos los rooms que tengan ese userId
            .then((result) => {
                let rooms=[];
                result.docs.forEach((d) => {
                    let j = d.data();
                    j.id=d.id;
                    rooms.push(j);
                })
                
                resolve(rooms);  
            })

            .catch((error) => {
               console.log('error: ', error)
                // reject('Usuario no existe', error)

            })
            
        });
    };
    static getRoomInfo(roomCode){
        return new Promise((resolve, reject) => {

            firebase.firestore().collection('rooms').doc(roomCode).get()
            .then((result) => {
                resolve(result.data());   // OBTENGO TODO LO QUE TENGO ALMACENADO DE ÉSTE USUARIO
            })
            .catch((error) => {
                reject('Room no existe');
            })    
        });
    };
    static getRoomBookings(roomCode){
        return new Promise((resolve, reject) => {

            firebase.firestore().collection('room_bookings')
            .where(`roomCode`, `==`, roomCode).get()
            .then((result) => {
                let roomBookings = [];
                result.docs.forEach((d) => {
                    let j = d.data();
                    j.id=d.id;
                    roomBookings.push(j);
                })

                resolve(roomBookings);   
            })

            .catch((error) => {
                
                reject('The room does not exist');

            })
            
        }); 
    };

    // BOOKINGS

    static apartmentNewBooking(newBooking){        

        return new Promise((resolve, reject) => {

            firebase.firestore().collection('apt_bookings').add(newBooking)
            
            .then((result) => {
                
                console.log("AptBooking information succesfully added !")
                resolve(result);
            })

            .catch((error) => {
                var errorCode = error.code;
                console.log('User NOT added: ', errorCode);
                var errorMessage = error.message;
                
            })
            
        });
    };
    static roomNewBooking(newBooking){        

        return new Promise((resolve, reject) => {

            firebase.firestore().collection('room_bookings').add(newBooking)
            
            .then((result) => {
                
                console.log("ROOM NewBooking succesfully added !")
                resolve(result);
            })

            .catch((error) => {
                var errorCode = error.code;
                console.log('User NOT added: ', errorCode);
                var errorMessage = error.message;
                
            })
            
        });
    };
    static getApartmentBookings(apartmentCode){
        return new Promise((resolve, reject) => {

            firebase.firestore().collection('apt_bookings')
            .where(`apartmentCode`, `==`, apartmentCode).get()
            .then((result) => {
                let aptBookings = [];
                result.docs.forEach((d) => {
                    let j = d.data();
                    j.id=d.id;
                    aptBookings.push(j);
                })

                resolve(aptBookings);   
            })

            .catch((error) => {
                
                reject('El apartamento no existe');

            })
            
        }); 
    };
    static getRoomBookings(roomID){
      console.log('Rooms booked TRIGGERED with roomCode', roomID)
        return new Promise((resolve, reject) => {

            firebase.firestore().collection('room_bookings').where(`roomCode`, `==`, roomID).get()
            .then((result) => {
                
                let bookings = [];
                result.docs.forEach((d) => {
                    let j = d.data();
                    j.id=d.id;
                    bookings.push(j);
                })
                
                console.log('los roombookings en obtenidos en Data son: ', bookings)
                resolve(bookings);   
            })

            .catch((error) => {
                
                reject('The apartment does not exist');

            })
            
        }); 
    };

    static getAptBookingInfo(bookingID){
       
        return new Promise((resolve, reject) => {

            firebase.firestore().collection('apt_bookings').doc(bookingID).get()
         
            .then((result) => {
               console.log('el result.data en el dataservice = ', result.data())
                resolve(result.data());   
            })
            .catch((error) => { 
                reject('El booking no existe');
            })
        });  
    }

    static updateApartmentBooking(bookingID, bookingInfo){
        return new Promise((resolve, reject) => {

            firebase.firestore().collection('apt_bookings').doc(bookingID).update(bookingInfo)
            
            .then((result) => {
                
                console.log("Apt Booking succesfully modified !")
                resolve(result);
            })

            .catch((error) => {
                var errorCode = error.code;
                console.log('User NOT added: ', errorCode);
                var errorMessage = error.message;
                
            })
            
        });
    }
    static updateRoomBooking(bookingID, bookingInfo){
        return new Promise((resolve, reject) => {

            firebase.firestore().collection('room_bookings').doc(bookingID).update(bookingInfo)
            
            .then((result) => {
                
                console.log("Room Booking succesfully modified !")
                resolve(result);
            })

            .catch((error) => {
                var errorCode = error.code;
                console.log('User NOT added: ', errorCode);
                var errorMessage = error.message;
                
            })
            
        });
    }

    // EXPENSES 
    static addUtility(utilityInfo) { 

        return new Promise((resolve, reject) => {

            firebase.firestore().collection('utilities').add(utilityInfo)

            .then((result) => {
                
                console.log("Utility info succesfully saved !")
                resolve(result);
            })

            .catch((error) => {
                var errorCode = error.code;
                console.log('Utility NOT saved: ', errorCode);
                var errorMessage = error.message;
                
            })
            
        });
    };
    static getAptUtilities(aptID){
      
        return new Promise((resolve, reject) => {

            firebase.firestore().collection('utilities').where(`apartmentCode`, `==`, aptID).get()
            .then((result) => {
                
                let bookings = [];
                result.docs.forEach((d) => {
                    let j = d.data();
                    j.id=d.id;
                    bookings.push(j);
                })
                
                resolve(bookings);   
            })

            .catch((error) => {
                
                reject('The apartment does not exist');

            })
            
        }); 
    };

    static getUserMonthUtilities(userID){
      
        return new Promise((resolve, reject) => {

            firebase.firestore().collection('utilities').where(`userId`, `==`, userID).get()
            .then((result) => {
                
                let utilities = [];
                result.docs.forEach((d) => {
                    let j = d.data();
                    j.id=d.id;
                    utilities.push(j);
                })
                
                resolve(utilities);   
            })

            .catch((error) => {
                
                reject('The user does not exist');

            })
            
        }); 
    };
}