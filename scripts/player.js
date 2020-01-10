var player=(function(){

    "use strict";

    var movementRate = 2,
        playerBox,
        playerBoxMaterial,
        finishLineZPos=-920;

    function init(){
    }

    function moveX(movement) {
        game.camera.position.x += movementRate * movement;
        game.camera.__dirtyPosition = true;
        playerBox.position.x  += movementRate * movement;
        playerBox.__dirtyPosition = true;
    }

    function moveZ(movement) {
        game.camera.position.z += movementRate * movement;
        game.camera.__dirtyPosition = true;
        playerBox.position.z += movementRate  * movement;
        playerBox.__dirtyPosition = true;

        checkIfPlayerAtFinish();
    }

    function checkIfPlayerAtFinish(){

        if(playerBox.position.z<=finishLineZPos){

            if(game.wintext){
                //dont display win text twice!
                return;
            }

            text.createText('You win!', 'winText');
        }
    }

    function createLigth(){
    playerBoxMaterial = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                visible: true
            }),
            0.1, //friction
            0.5 //restitution/bounciness
        );

        var personMaterial = 
            new THREE.MeshPhongMaterial({
                ambient: 0x0dd00,
                transparent: true,
                
            });

        var playerBody1 = new Physijs.BoxMesh(
            new THREE.SphereGeometry(3, 4, 5),
            personMaterial,
            0.1
        );

                playerBody1.position.y = -16;


       
        var playerBody = new Physijs.BoxMesh(
            new THREE.BoxGeometry(8, 5, 5),
            personMaterial,
            0.1
        );
        
        playerBody.position.y = -8;

        var playerLLeg = new Physijs.BoxMesh(
            new THREE.BoxGeometry(2, 5, 5),
            personMaterial,
            0.1
        );
        playerBody1.add(playerBody);
        playerBody.add(playerLLeg);
        playerLLeg.position.y = -5;
        playerLLeg.position.x = -2;

        var playerRLeg = new Physijs.BoxMesh(
            new THREE.BoxGeometry(2, 5, 5),
            personMaterial,
            0.1
        );
        playerBody.add(playerRLeg);
        playerRLeg.position.y = -5;
        playerRLeg.position.x = 2;

        playerBox =  new Physijs.BoxMesh(
            new THREE.CubeGeometry(10, 10, 10),
            playerBoxMaterial,
            0.1
        );
        playerBox.position.set(0, 15, 50);
        playerBox.name = "light";
        playerBox.add(playerBody);
        playerBox.add(playerBody1);
        playerBody.position.y = 2;
        playerBody1.position.y = 9;

        game.scene.add(playerBox);
    }

    function createPlayer(){

        playerBoxMaterial = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                visible: false
            }),
            0.1, //friction
            0.5 //restitution/bounciness
        );

        var personMaterial = 
            new THREE.MeshPhongMaterial({
                ambient: 0x0dd00,
                transparent: true,
                
            });

        var playerBody1 = new Physijs.BoxMesh(
            new THREE.SphereGeometry(3, 4, 5),
            personMaterial,
            0.1
        );

                playerBody1.position.y = -16;


       
        var playerBody = new Physijs.BoxMesh(
            new THREE.BoxGeometry(8, 5, 5),
            personMaterial,
            0.1
        );
        
        playerBody.position.y = -8;

        var playerLLeg = new Physijs.BoxMesh(
            new THREE.BoxGeometry(2, 5, 5),
            personMaterial,
            0.1
        );
        playerBody1.add(playerBody);
        playerBody.add(playerLLeg);
        playerLLeg.position.y = -5;
        playerLLeg.position.x = -2;

        var playerRLeg = new Physijs.BoxMesh(
            new THREE.BoxGeometry(2, 5, 5),
            personMaterial,
            0.1
        );
        playerBody.add(playerRLeg);
        playerRLeg.position.y = -5;
        playerRLeg.position.x = 2;

        playerBox =  new Physijs.BoxMesh(
            new THREE.CubeGeometry(10, 10, 10),
            playerBoxMaterial,
            0.1
        );
        playerBox.position.set(0, 15, 50);
        playerBox.name = "playerBox";
        playerBox.add(playerBody);
        playerBox.add(playerBody1);
        playerBody.position.y = 2;
        playerBody1.position.y = 9;

        game.scene.add(playerBox);
    }

    return{
        init: init,
        createPlayer: createPlayer,
        createLigth: createLigth,
        moveX: moveX,
        moveZ: moveZ
    }

})();