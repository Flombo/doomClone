"use strict";
var doomClone;
(function (doomClone) {
    var f = FudgeCore;
    class Door extends doomClone.Obstacle {
        constructor(player, enemies, x, z) {
            super(player, enemies, x, z, "Door", document.getElementById("door"));
            this.interactionPrompt = document.getElementById("interactionPrompt");
            this.isClosed = true;
            this.mtxLocal.scaleZ(2);
            this.initDoorSounds();
            this.addEventListener("playerInteraction", () => { this.checkPlayerInteraction(); }, true);
            this.addEventListener("playerCollision", () => { this.checkPlayerCollision(); }, true);
            this.addEventListener("checkWallCollisionForEnemy", () => { this.checkEnemyCollision(); }, true);
        }
        async initDoorSounds() {
            let doorClosingSound = await f.Audio.load("../../sounds/doorClosed.wav");
            this.componentAudioDoorClosingAndOpening = new f.ComponentAudio(doorClosingSound);
            this.addComponent(this.componentAudioDoorClosingAndOpening);
        }
        checkPlayerInteraction() {
            if (this.checkPlayerInteractionDistance()) {
                this.closeOrOpenDoor();
            }
        }
        checkPlayerInteractionDistance() {
            let isPlayerInInteractionRadius = this.getPlayer().mtxLocal.translation.isInsideSphere(this.mtxLocal.translation, 3.5);
            if (isPlayerInInteractionRadius) {
                this.interactionPrompt.innerText = `Press "${localStorage.getItem('INTERACT')}" to interact`;
                this.interactionPrompt.setAttribute("style", "opacity: 1");
            }
            else {
                this.interactionPrompt.setAttribute("style", "opacity: 0");
            }
            return isPlayerInInteractionRadius;
        }
        closeOrOpenDoor() {
            if (this.isClosed) {
                this.isClosed = false;
                new f.Timer(f.Time.game, 100, 6, () => {
                    this.mtxLocal.translateY(0.5);
                });
            }
            else {
                this.isClosed = true;
                new f.Timer(f.Time.game, 100, 6, () => {
                    this.mtxLocal.translateY(-0.5);
                });
            }
            this.componentAudioDoorClosingAndOpening.play(true);
        }
        checkPlayerCollision() {
            if (this.isClosed) {
                let player = this.getPlayer();
                if (player.mtxLocal.translation.isInsideSphere(this.mtxLocal.translation, 1)) {
                    player.mtxLocal.translateZ(-player.getMoveAmount());
                }
            }
        }
        checkEnemyCollision() {
            this.checkPlayerInteractionDistance();
            if (this.isClosed) {
                Array.from(this.getEnemies()).forEach(enemy => {
                    if (enemy.mtxLocal.translation.isInsideSphere(this.mtxLocal.translation, 1)) {
                        enemy.mtxLocal.translateZ(-enemy.getMoveAmount());
                        enemy.mtxLocal.rotateY(90);
                    }
                });
            }
        }
    }
    doomClone.Door = Door;
})(doomClone || (doomClone = {}));
//# sourceMappingURL=Door.js.map