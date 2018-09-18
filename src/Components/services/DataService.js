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

        console.log('el argumento recibido en dataservice: ', userId)

        return new Promise((resolve, reject) => {

            firebase.firestore().collection('users').doc(userId).get()

            .then((result) => {
                console.log('el Result es: ', result)
                console.log('el Result.data() es: ', result.data())
                resolve(result.data());   // OBTENGO TODO LO QUE TENGO ALMACENADO DE ÉSTE USUARIO
            })

            .catch((error) => {
               
                reject('Usuario no existe');

            })
            
        });
    };

    // APARTMENTS
    static addNewApartment(apartmentName, apartmentInfo) {  

        return new Promise((resolve, reject) => {

            firebase.firestore().collection('apartments').doc(apartmentName).set(apartmentInfo)

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

            firebase.firestore().collection('apartments').where(`userId`,`==`, userId).get() // Where me devuelve todos los rooms que tengan ese userId
            .then((result) => {
                let apts=[];
                result.docs.forEach((d) => {
                    let j = d.data();
                    j.id=d.id;
                    apts.push(j);
                })
                
                resolve(apts);  
                console.log('el resume get-Apartments), ', apts)

            })

            .catch((error) => {
               console.log('error: ', error)
                // reject('Usuario no existe', error)

            })
            
        });
    };
    static getApartmentInfo(apartmentCode){
        return new Promise((resolve, reject) => {

            firebase.firestore().collection('apartments').doc(apartmentCode).get()

            .then((result) => {
                console.log('el Result es: ', result)
                console.log('el Result.data() es: ', result.data())
                resolve(result.data());   // OBTENGO TODO LO QUE TENGO ALMACENADO DE ÉSTE USUARIO
            })

            .catch((error) => {
                
                reject('Usuario no existe');

            })
            
        });
    };
    static getApartmentBookings(apartmentCode){
        return new Promise((resolve, reject) => {

            firebase.firestore().collection('apt_bookings')
            .where('apartmentCode', '===', apartmentCode).get()
            .then((result) => {
                console.log('el Result es: ', result)
                console.log('el Result.data() es: ', result.data())
                resolve(result.data());   // OBTENGO TODO LO QUE TENGO ALMACENADO DE ÉSTE USUARIO
            })

            .catch((error) => {
                
                reject('Usuario no existe');

            })
            
        }); 
    };
    static addApartmentNewState(userId, apartmentCode, code, sDay, eDay, guest, agency, bDays){        

        return new Promise((resolve, reject) => {

            firebase.firestore().collection('apt_bookings').add({
                userId          : userId,
                apartmentCode   : apartmentCode,
                bookingCode     : code,
                startDay        : sDay,
                endDay          : eDay,
                guest           : guest,
                agency          : agency,
                monthDays       : bDays
                }
            )
            
            .then((result) => {
                
                console.log("ROOM information succesfully merged !")
                resolve(result);
            })

            .catch((error) => {
                var errorCode = error.code;
                console.log('User NOT added: ', errorCode);
                var errorMessage = error.message;
                
            })
            
        });
    };

    // ROOMS
    static addNewRoom(roomCode, roomInfo) { 

        return new Promise((resolve, reject) => {

            firebase.firestore().collection('rooms').doc(roomCode).set(roomInfo)

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
    static getApartmentRooms(apartmentId){

        return new Promise((resolve, reject) => {

            firebase.firestore().collection('rooms').where(`apartmentId`,`==`, apartmentId).get() // Where me devuelve todos los rooms que tengan ese userId
            .then((result) => {
                let rooms=[];
                result.docs.forEach((d) => {
                    let j = d.data();
                    j.id=d.id;
                    rooms.push(j);
                })
                
                resolve(rooms);  
                console.log('el resume del rooms list), ', rooms)

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
                if(result.docs.length > 0){
                    resolve(result.docs[0]);
                } else {
                    reject('this room does not exist');
                }
                console.log("Result: ", result)
            })

            .catch((error) => {
                var errorCode = error.code;
                console.log('La consulta no se pudo realizar: ', errorCode);
                var errorMessage = error.message;
            })
            
        });
    };
    static addRoomNewState(userId, roomNumber, code, sDay, eDay, guest, agency, bDays){        

        return new Promise((resolve, reject) => {

            firebase.firestore().collection('bookings').add({
                userId      : userId,
                roomNumber  : roomNumber,
                bookingCode : code,
                startDay    : sDay,
                endDay      : eDay,
                guest       : guest,
                agency      : agency,
                monthDays   : bDays
                }
            )
            
            .then((result) => {
                
                console.log("ROOM information succesfully merged !")
                resolve(result);
            })

            .catch((error) => {
                var errorCode = error.code;
                console.log('User NOT added: ', errorCode);
                var errorMessage = error.message;
                
            })
            
        });
    };
    static getRoomsOccupation(userId, roomNr){
        console.log('getRoomOccupation launched USER: ', userId);

        return new Promise((resolve, reject) => {

            firebase.firestore().collection('bookings')
            .where('userId', '==', userId)
            .where('roomNr', '==', roomNr).get()

            .then(function(querySnapshot) {
                let info = [];
                querySnapshot.forEach((d) => {
                   
                    let j = d.data();
                    j.id=d.id;
                    info.push(j);  
                });
                // CHECKPOINT
                console.log("info es: ", info);

                resolve(info);
            })

            .catch((error) => {
                var errorCode = error.code;
                console.log('La consulta no se pudo realizar: ', errorCode);
                var errorMessage = error.message;
                console.log('porque el error es: ',errorMessage )
                
            })
            
        });

    };
}