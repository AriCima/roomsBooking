import firebase from 'firebase';

export default class DataService {


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
    }

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
    }

    static getUserRoomsList(userId){

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
                console.log('el resume del rooms list), ', rooms)

            })

            .catch((error) => {
               console.log('error: ', error)
                // reject('Usuario no existe', error)

            })
            
        });
    }

    static addNewRoom(roomNr, roomInfo)
        {  //registro en Firebase

        return new Promise((resolve, reject) => {

            firebase.firestore().collection('rooms').doc(roomNr).set(roomInfo)

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
    }

    static saveRoomNewState(userId, roomNumber, code, sDay, eDay, guest, agency, bDays){        

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
    }

    static getSingleRoomInfo(roomNr){

        return new Promise((resolve, reject) => {

            firebase.firestore().collection('rooms').where('roomNumber', '==', roomNr).get()

            .then((result) => {
                if(result.docs.length > 0){
                    resolve(result.docs[0]);  //---> va al then de de register getjambycode
                } else {
                    reject('this room does not exist');
                }
                console.log("Result: ", result)
           
                //resolve('ok');
            })

            .catch((error) => {
                var errorCode = error.code;
                console.log('La consulta no se pudo realizar: ', errorCode);
                var errorMessage = error.message;
                
            })
            
        });
    }

    static getRoomsOccupation(userId){
        console.log('getRoomOccupation launched USER: ', userId);

        return new Promise((resolve, reject) => {

            firebase.firestore().collection('bookings').where('userId', '==', userId).get()

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

    }
}